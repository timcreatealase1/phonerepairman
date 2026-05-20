# ARCHITECTURE.md — phonerepairman.com.au

> System design for the Phone Repairman marketing engine. Read `CLAUDE.md` first for the operating context, then this file for *how* the system is built. Update `DECISIONS.md` (ADR-style) when changing anything here.

---

## 1. Goals and constraints

**Goals**

- Sub-1-second page loads from the Hunter region.
- Conversion mechanics on every page (call, SMS, directions, book, quote, Messenger).
- A self-service admin backend for the SEO and content team — including external Gmail users.
- Tight integration with the existing Zoho-based agent fleet (Scribe, Porter, Scout, Echo, Iris, Conductor).
- Programmatic SEO at scale: location × service × brand matrices.
- AEO/GEO-friendly content surfaces.
- Zero recurring costs beyond Cloudflare's existing plan and the Zoho subscription Tim already runs.

**Hard constraints**

- Must run entirely on infrastructure Tim already pays for (Cloudflare, GitHub, Zoho, Catalyst).
- Must accept external Gmail accounts as admin users (Tim's SEO team is not all on Workspace).
- No PII in logs. No browser-side secrets.
- The Zoho CRM is production — never write directly from the browser, never bypass Porter for writes.

---

## 2. High-level system diagram

```
                       ┌─────────────────────────────────────┐
                       │           Public visitors            │
                       │   (mobile dominant, Hunter region)    │
                       └────────────────────┬────────────────┘
                                            │
                                            ▼
                    ┌───────────────────────────────────────────┐
                    │           Cloudflare global edge           │
                    │  · Pages (Astro static + islands)          │
                    │  · Workers (api, admin-api, webhooks, jobs)│
                    │  · Image Resizing · Turnstile · WAF        │
                    └───────────┬───────────────────┬───────────┘
                                │                   │
                  reads/writes  │                   │ async
                                ▼                   ▼
                    ┌──────────────────┐   ┌──────────────────────┐
                    │   D1 (SQLite)    │   │   Queues + Cron      │
                    │ pages, users,    │   │ review requests,     │
                    │ roles, leads,    │   │ indexing pings,      │
                    │ redirects,       │   │ schema validation,   │
                    │ audit log,       │   │ SC/Bing submissions  │
                    │ analytics rollups│   │                      │
                    └────────┬─────────┘   └──────────┬───────────┘
                             │                        │
                             │                        ▼
                             │            ┌────────────────────────┐
                             │            │  Existing AI agent fleet│
                             │            │  via Zoho MCP servers   │
                             │            │  Scribe · Porter · Scout│
                             │            │  Echo · Iris · Conductor│
                             │            └────────┬───────────────┘
                             │                     │
                             ▼                     ▼
                    ┌───────────────────┐  ┌──────────────────────┐
                    │   R2 (storage)    │  │  Zoho · GBP · FB     │
                    │ images, OG cards, │  │  CRM, Books, Calendar │
                    │ exports           │  │  Google Business, FB  │
                    └───────────────────┘  └──────────────────────┘

   Admin team ──► Cloudflare Access (Google OIDC, Gmail OK) ──► /admin SPA ──► admin-api Worker
```

---

## 3. Frontend — Astro on Cloudflare Pages

**Why Astro:** Static-first output with selective interactivity ("islands"), which gives the smallest possible HTML/JS payload. That's a direct ranking factor (Core Web Vitals) and a direct conversion factor on mobile. Beats Next.js for content-led sites and beats WordPress comprehensively on speed, security, and editorial flexibility.

**Rendering modes:**
- Public marketing pages: **static at build**, deployed to Cloudflare Pages CDN.
- Dynamic elements (open/closed status, queue length, live reviews): **client-side fetched** from a public Worker endpoint, with a sensible fallback if the API is slow.
- Forms: progressively enhanced — work without JS, faster with JS.

**Content sources:**
- **Markdown/MDX files in repo** for stable content (services, brands, locations, about). Edited by engineers or by SEO team via the admin which commits to GitHub via Octokit. Source of truth = git.
- **D1 database** for fast-moving content (blog posts, reviews, FAQs added post-launch, redirects). Edited entirely in admin.
- **Live data** (open status, queue, reviews) pulled at request time from Workers.

This hybrid keeps the SEO-critical content under version control while letting the team move fast on operational content.

**Design system:**
- Tailwind CSS with a tight token set (4 brand colours, 6 type sizes, 4 spacing scales). Avoid generic AI-looking design — follow the `frontend-design` skill conventions.
- Component library: hand-rolled, accessible, ARIA-correct. No heavy UI kits.
- Icons: Lucide.
- Images: AVIF/WebP, served via Cloudflare Image Resizing.

---

## 4. Backend — Cloudflare Workers

Four Workers, each with a clear job.

### 4.1 `workers/api` — public API

Endpoints:

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/leads` | Generic lead capture. Validated, deduped, tagged, routed to Zoho via Porter. |
| `POST` | `/api/quote` | Quote request. Triggers Scribe classification + Echo response. |
| `POST` | `/api/booking` | Repair booking. Creates Zoho Calendar event + draft Zoho Books quote. |
| `POST` | `/api/reviews/request` | Customer-side review-link landing (logs intent before redirect to GBP/FB). |
| `GET`  | `/api/status` | Live "open/closed/queue" payload. Cached in KV for 60 s. |
| `GET`  | `/api/reviews` | Latest curated reviews from D1. |

All write endpoints: Turnstile + per-IP + per-fingerprint rate limit + body size cap.

### 4.2 `workers/admin-api` — admin backend

Sits behind Cloudflare Access. The Worker validates the Access JWT on every request, loads the user's role from D1, and enforces permissions per module.

Modules (each is a permission flag in D1):

- `pages.read` / `pages.write`
- `meta.read` / `meta.write`
- `schema.read` / `schema.write`
- `pages.programmatic` (generate location × service combinations)
- `blog.read` / `blog.write` / `blog.publish`
- `redirects.read` / `redirects.write`
- `seo_files` (sitemap, robots, llms.txt)
- `reviews.read` / `reviews.feature` / `reviews.request`
- `leads.read` / `leads.write` / `leads.assign`
- `analytics.read`
- `brands.write`
- `links.suggest`
- `users.read` / `users.write`
- `audit.read`

Endpoints are namespaced: `/admin/api/pages`, `/admin/api/leads`, etc. Each checks the corresponding flags. **Permissions are deny-by-default.**

### 4.3 `workers/webhooks` — inbound

| Source | Path | Action |
|---|---|---|
| Zoho CRM | `/webhooks/zoho/leads` | Sync lead status back to admin inbox. |
| Zoho Books | `/webhooks/zoho/invoices` | Mark job complete → enqueue review request. |
| Google Business Profile | `/webhooks/gbp/reviews` | New review → admin alert + D1 cache. |
| Facebook Graph | `/webhooks/fb/messenger` | New message → route to Honey via SMS/email. |
| Search Console | (polled) | Pull performance daily into D1. |

Every webhook validates signatures. No exceptions.

### 4.4 `workers/jobs` — queues + cron

Queue consumers:

- `review-requests` — fires SMS to customer when Zoho invoice is paid.
- `index-submit` — submits new/changed pages to Search Console + IndexNow (Bing).
- `schema-revalidate` — nightly schema validation of all pages.
- `analytics-rollup` — nightly aggregation of GA4 + Search Console + Cloudflare Analytics into D1 dashboards.
- `mistake-detector` — watches for ranking drops, broken links, 404s, slow pages; appends to `MISTAKES.md` candidates.

---

## 5. Data model (D1)

Minimum tables:

```sql
-- Identity
users(id, email, name, created_at, last_login_at, status)
roles(id, name, description)
user_roles(user_id, role_id)
permissions(id, key, label, module)
role_permissions(role_id, permission_id)
user_permission_overrides(user_id, permission_id, granted)  -- per-user overrides

-- Content
pages(id, slug, type, title, meta_description, og_image, schema_json,
      hero_json, body_md, status, canonical, published_at, updated_at)
locations(slug, name, postcode, lat, lng, blurb_md, distance_km)
services(slug, name, category, price_from, turnaround, warranty, blurb_md)
brands(slug, name, authorization, logo_url, blurb_md)
faqs(id, scope_type, scope_id, question, answer_md, sort)

-- Operations
leads(id, source, segment, name, email, phone, message, device, fault,
      status, zoho_id, assigned_to, created_at, updated_at)
bookings(id, lead_id, slot_start, slot_end, status, zoho_event_id, notes)
reviews(id, source, author, rating, body, url, featured, received_at)
redirects(from_path, to_path, status_code, created_at, created_by)

-- SEO ops
indexing_log(url, action, submitted_at, response_code)
schema_log(page_id, validated_at, status, errors_json)
internal_links(from_page_id, to_page_id, anchor, sort)

-- Audit + analytics
audit_log(id, user_id, action, target_type, target_id, diff_json, at)
analytics_daily(date, page_path, impressions, clicks, ctr, position, source)
events(id, ts, type, path, payload_json)  -- raw event firehose, TTL'd
```

D1 is fine for write volumes a local site sees. For very high read paths (status, reviews) cache in KV with short TTL.

---

## 6. Authentication and authorization

**Cloudflare Access** in front of `/admin/*` and `/admin/api/*`.

- Identity provider: **Google OIDC**. Configured to accept *any* Google account, not just a Workspace domain. This is the key requirement — the SEO team's personal Gmails work.
- Access policy: email must be in the `users` table with `status = 'active'`. Otherwise reject at the edge.
- On successful auth, Access sets a JWT (`Cf-Access-Jwt-Assertion`) on every request. The Worker validates it via Cloudflare's JWKS.

**Authorization** is enforced at the Worker after JWT validation:

1. Look up `user_id` by email.
2. Compute effective permissions: union of all role permissions, with per-user overrides applied last.
3. Each endpoint declares the permission key(s) it requires; missing any → 403.
4. UI hides modules the user lacks `*.read` on. Worker still re-checks server-side. Always.

**Default roles** (seedable, editable):

| Role | Modules |
|---|---|
| Owner | All |
| Admin | All except `users.write` |
| SEO Lead | All `pages.*`, `meta.*`, `schema.*`, `pages.programmatic`, `seo_files`, `redirects.*`, `links.suggest`, `analytics.read`, `audit.read` |
| Content Editor | `pages.read/write` (not publish), `blog.read/write` (not publish), `meta.write`, `links.suggest` |
| Publisher | All `Content Editor` plus `*.publish` |
| Sales / Bookings | `leads.read/write/assign`, `analytics.read` |
| Reviewer | `pages.read`, `blog.read`, `audit.read` |

Per-user overrides exist for fine-grained cases (e.g., a contractor who only edits brand pages).

---

## 7. URL and routing model

```
/                                  Homepage
/services/                         Services hub
/services/phone-repair             Service detail
/services/laptop-repair
/services/tablet-repair
/services/console-repair
/services/data-recovery
/services/engraving
/services/onsite-business

/brands/                           Brands hub
/brands/hp                         AWA-authorized
/brands/acer                       AWA-authorized
/brands/lexmark                    AWA-authorized
/brands/epson                      Direct partner
/brands/apple
/brands/samsung
/brands/dell
/brands/lenovo

/business/                         B2B hub
/business/msp-partners             Subcontractor pitch
/business/onsite-technician        OEM field service
/business/mining-it-fleet          Mining IT departments
/business/managed-devices          Device-as-a-Service
/business/bundles                  Productised SMB bundles

/locations/                        Locations hub
/locations/muswellbrook
/locations/singleton
/locations/scone
/locations/aberdeen
/locations/denman
/locations/merriwa
/locations/murrurundi
/locations/hunter-valley

/locations/<town>/<service>        Programmatic SEO leaves
                                   e.g. /locations/singleton/laptop-repair

/book                              Booking flow
/quote                             Instant quote
/track                             Job status lookup
/reviews                           Reviews wall

/blog/                             Blog hub
/blog/<slug>                       Articles, original data, guides

/about                             About + author bios
/contact                           Contact + map + directions
/faqs                              FAQ hub

/admin/*                           Behind Cloudflare Access
```

**Redirect strategy:** All legacy URLs from the existing site map to their new homes via `redirects` table → Worker 301s at the edge. Audit before launch — losing an existing ranking page is the single largest preventable risk.

---

## 8. SEO and AEO architecture

**On-page:**
- Every page renders `<title>`, `meta description`, canonical, OG/Twitter, JSON-LD from frontmatter + content.
- Schema is built by a shared `schemaBuilder` in `lib/seo/` so it's identical across page types.
- Critical schema types: `WebPage`, `BreadcrumbList`, `LocalBusiness`, `Service`, `Product`, `Offer`, `FAQPage`, `Review`, `AggregateRating`, `Article`, `Person` (author bios).

**Site-level:**
- `sitemap.xml` generated on build, also live-updateable from admin (for D1-stored content).
- `robots.txt` controllable from admin.
- `llms.txt` at root, listing the canonical description of the business, key pages, and how AI tools should describe us. Living document — versioned in repo.
- IndexNow ping on publish for Bing/Yandex; Search Console submission via cron.

**Programmatic SEO:**
- A "matrix builder" page in admin lets the SEO team generate `location × service` (or `brand × service`) combos.
- Each generated page starts from a template but **must** be uniquely customised before publish — the admin blocks publish if the page is more than 70% similar to its siblings (cosine similarity on rendered text).
- This is the discipline that separates programmatic SEO that works from doorway pages that get penalised.

**AEO/GEO (AI search) layer:**
- Definitive opening sentences are tracked as a structured field per page. Admin shows a "AEO clarity score" based on length, specificity, and the presence of named entities (location, brand, authorization).
- Original data publication is a first-class workflow — `/blog/data/*` pages get extra schema (`Dataset`, `Article`).
- `llms.txt` and consistent NAP across all directories (the existing `iphonerepairman` vs `phonerepairman` inconsistency is logged for Phase 0 cleanup).

---

## 9. Integration layer

Every external system has a single owner in code (no scattered calls):

| System | Owner module | Notes |
|---|---|---|
| Zoho CRM | `lib/integrations/zoho/porter.ts` | Always via Porter MCP. Never raw REST. |
| Zoho Books | `lib/integrations/zoho/books.ts` | Quotes, invoices, payment-paid trigger. |
| Zoho Calendar | `lib/integrations/zoho/calendar.ts` | Booking slots. |
| Google Business Profile | `lib/integrations/gbp.ts` | Reviews pull, posts push. |
| Facebook Graph | `lib/integrations/facebook.ts` | Messenger webhook, page mentions. |
| Google Search Console | `lib/integrations/gsc.ts` | Daily pull, indexing API. |
| IndexNow (Bing/Yandex) | `lib/integrations/indexnow.ts` | On-publish ping. |
| Cloudflare Turnstile | `lib/security/turnstile.ts` | All public forms. |
| SMS (TBD provider) | `lib/integrations/sms.ts` | Review requests, lead acknowledgements. |

The agent fleet is invoked through the existing MCP servers — the Workers don't reimplement that logic.

---

## 10. Observability

- **Cloudflare Web Analytics** for client-side metrics (free, privacy-first, no cookies).
- **Cloudflare Workers logs** + Logpush to R2 for retention. PII redacted before logging.
- **Search Console** + **Bing Webmaster** + **GA4** pulled nightly into D1 for the admin dashboard.
- **Synthetic monitoring** via a Worker cron that hits 20 key URLs every 5 minutes and pages Tim if anything goes wrong.
- **Schema validation** nightly across all pages.
- **Lighthouse CI** in the GitHub Actions deploy pipeline. Fails the deploy if Performance/SEO/Accessibility drops below 95.

---

## 11. Security model

- Cloudflare WAF at the front. Bot Fight Mode on.
- Turnstile on every public form.
- Worker-level rate limiting (per IP + per fingerprint).
- Strict CSP, HSTS preload, COOP/COEP, Permissions-Policy at the Worker.
- Admin behind Cloudflare Access. No public admin login.
- Secrets in Workers Secrets only. Never in code, never in env files committed to git.
- Audit log is append-only and surfaced in admin.
- Data retention: raw events 30 days, leads indefinite, audit log indefinite, analytics rollups indefinite, webhooks 90 days.

---

## 12. Deployment pipeline

- GitHub `main` → Cloudflare Pages preview build on every PR.
- Cloudflare Pages production deploy on merge to `main`.
- Workers deployed via Wrangler in a GitHub Actions workflow.
- Migrations to D1 via Wrangler, idempotent, versioned in `migrations/`.
- Rollback: revert the merge commit; Cloudflare Pages restores the previous build automatically.

---

## 13. What this architecture deliberately does *not* do

- **No headless CMS** (Contentful, Sanity, Strapi). Adds recurring cost and another system to learn. D1 + git is sufficient.
- **No Vercel / Netlify / Render.** All Cloudflare. Single vendor reduces moving parts.
- **No Node server.** Workers only. No long-running processes to babysit.
- **No microservices.** Four Workers is enough.
- **No GraphQL.** REST + typed clients. Simpler to debug at 11pm.
- **No customer login on the public site initially.** Track jobs via a tokenised link sent in SMS/email. Add accounts only if there's a real signal we need them.

Each "no" can be revisited — but only via a `DECISIONS.md` entry that makes the case.
