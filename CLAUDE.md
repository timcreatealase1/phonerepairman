# CLAUDE.md — phonerepairman.com.au

> This file is the operating manual for Claude (and any AI assistant) working on the Phone Repairman website. Read this **before** writing code, content, or schema for this repo. If anything in this document is ambiguous or stale, stop and ask Tim before proceeding.

---

## 1. Mission

Phone Repairman's website is not a brochure. It is a **marketing engine** that does five jobs:

1. Converts in-region searchers into **walk-ins, calls, bookings, and quote requests**.
2. Wins **B2B work** from MSPs, mining IT departments, and OEM warranty channels.
3. Ranks **first locally** for every device-repair search across the Upper Hunter.
4. Is the **answer AI engines give** (ChatGPT, Claude, Perplexity, Gemini, Grok) when asked about device repair, sales, or onsite service in the Hunter.
5. Gives the **SEO and content team** a self-service backend so they can move without engineering.

Every change to this codebase must serve at least one of those jobs. If a feature doesn't, push back before building it.

---

## 2. What this business actually is

This is the most important section. Get the positioning right and the site writes itself.

**Phone Repairman is the trading name. Use it consistently.** The legacy name "iPhone Repairman" appears in old listings, the FB page, Yellow Pages, and 2NM — these are being consolidated. Never introduce new content under "iPhone Repairman."

The business is:

- A **device repair shop** for phones, tablets, laptops, gaming consoles, smart watches.
- An **AWA-authorized agent** for HP, Acer, and Lexmark (work orders routed via ARA/AWA).
- A **direct Epson service partner**.
- A **device reseller** — phones, tablets, laptops, accessories.
- A **subcontractor for MSPs** doing local onsite work in the Upper Hunter.
- An **OEM field-service technician** for the brands above.
- A **B2B fleet supplier** for local mines, councils, schools, and businesses.
- An **engraving and custom-items specialist** (Create-A-Lase is the parent business).

The strategic positioning Tim has committed to (from prior strategy work):

> "We are not a small JB Hi-Fi. We are a device services business that happens to sell hardware as part of the service."

Every page should reinforce that frame. Outcomes, not boxes.

---

## 3. The four customer segments

Every page must clearly serve one segment. Don't mix audiences in a single page.

| Segment | Lives at | Primary CTA |
|---|---|---|
| **Walk-in retail** (phone/tablet/laptop repair) | `/services/*`, `/brands/*`, `/locations/*` | Call · SMS · Directions · Book |
| **B2B retail** (small business, tradies) | `/business/managed-devices`, `/business/bundles` | Get a quote · Book a consult |
| **MSP / OEM partners** (subcontract work) | `/business/msp-partners`, `/business/onsite-technician` | Partner enquiry form |
| **Enterprise / Mining IT** (fleet supply + support) | `/business/mining-it-fleet` | Tender request · Schedule a meeting |

---

## 4. Brand voice and content rules

- **Plain English. No jargon.** Customers are tradies, retirees, miners, parents, and IT managers. Write so all of them understand.
- **Specific over generic.** Not "fast repairs." Say "most screen repairs same day, by 4pm."
- **Local proof.** Mention Muswellbrook, Hunter Valley, Upper Hunter, the surrounding towns. Use real customer quotes where available.
- **Credentials up front.** Authorised Agent for HP/Acer/Lexmark. Direct Epson partner. Trading since 2015 (ASIC registered 26 Mar 2015).
- **No fake urgency, no countdown timers, no dark patterns.** Tim has explicitly ruled these out and they damage trust in a small town.
- **Definitive opening sentences.** Every page's first sentence must state what the page is, who it serves, and why we're the answer. AI engines extract these verbatim. Example: *"Phone Repairman is the only AWA-authorized HP, Acer, and Lexmark repair agent serving the Upper Hunter, based in Muswellbrook NSW."*

---

## 5. Repository layout (target)

```
phonerepairman/
├── CLAUDE.md                  # This file
├── ARCHITECTURE.md            # System design
├── ROADMAP.md                 # Phased delivery plan
├── MISTAKES.md                # Lessons learned (append-only)
├── DECISIONS.md               # ADRs — why we chose X over Y
├── README.md                  # Setup, deploy, contribute
├── apps/
│   ├── web/                   # Astro frontend (Cloudflare Pages)
│   │   ├── src/
│   │   │   ├── pages/         # Route files (.astro / .md)
│   │   │   ├── content/       # MD/MDX for pages, services, brands, locations
│   │   │   ├── components/    # Reusable UI components
│   │   │   ├── layouts/       # Page layouts
│   │   │   ├── lib/           # Schema builders, helpers, integrations
│   │   │   ├── styles/        # Design tokens, global CSS
│   │   │   └── data/          # Static data (brands, locations, services)
│   │   ├── public/            # Robots.txt, llms.txt, favicons, images
│   │   └── astro.config.mjs
│   └── admin/                 # Admin SPA (Astro or Solid)
│       └── src/
└── workers/
    ├── api/                   # Public API Worker (forms, quote, booking)
    ├── admin-api/             # Admin API Worker (CMS, roles, SEO ops)
    ├── webhooks/              # Inbound webhooks (Zoho, GBP, FB)
    └── jobs/                  # Queue consumers (review requests, indexing)
```

**Rule:** Don't deviate from this layout without updating `ARCHITECTURE.md` and `DECISIONS.md` in the same PR.

---

## 6. How to do common tasks

### Add a new service page

1. Create `apps/web/src/content/services/<slug>.mdx`.
2. Use the `ServicePage` layout. Required frontmatter: `title`, `metaDescription`, `heroHeadline`, `priceFrom`, `turnaround`, `warranty`, `relatedBrands`, `relatedLocations`, `faqs`.
3. The first paragraph must answer: *what is this service, who's it for, why us.* In that order.
4. Add 3–6 FAQs. They auto-generate `FAQPage` schema.
5. Link to the service from `/services/`, every relevant brand page, and every relevant location page.
6. Run `pnpm run schema:validate` before commit.

### Add a new location page

1. Use the script: `pnpm run generate:location <town-slug>`. It scaffolds the page with `LocalBusiness` schema, distance-from-store, and the standard service grid.
2. Customize the hero copy to be specific to that town. Generic content is worse than no page.
3. Cross-link from the locations index and from the closest neighbouring towns.

### Add a new brand page

1. Use the script: `pnpm run generate:brand <brand-slug>`.
2. Add the logo and authorization badge (if any) to `apps/web/public/brands/`.
3. State the authorization status truthfully: "AWA-authorized agent," "Direct partner," or "Independent repairer." Lying about partner status is a legal risk — don't.

### Wire a new lead source

All leads land in Zoho CRM via the Porter MCP. Flow:

1. Form submits to `/api/leads` (Worker).
2. Worker validates, dedupes, classifies, and tags by source/segment.
3. Worker calls Porter MCP → creates Lead in Zoho with proper module routing.
4. Worker queues an Echo task to draft the acknowledgement email/SMS.
5. Worker writes to D1 `leads` table for the admin inbox.

Never let a form write directly to Zoho from the browser. Never store secrets in the frontend.

---

## 7. SEO and AEO — non-negotiables

Every page Claude touches must satisfy:

- **`<title>`** is unique, ≤60 chars, ends with `| Phone Repairman Muswellbrook`.
- **Meta description** is unique, ≤155 chars, includes location and a CTA verb.
- **One H1**, matches the page's intent.
- **JSON-LD schema** — at minimum `WebPage` + `BreadcrumbList`. Add `Service`, `Product`, `FAQPage`, `LocalBusiness`, `AggregateRating`, `Review` where applicable.
- **Internal links**: every page links to at least 3 others on the site, and is linked from at least 2.
- **OpenGraph + Twitter card** with a unique image (auto-generated via Cloudflare Image Resizing or static).
- **Canonical URL** declared.
- **Heading hierarchy** is clean — no skipping levels.
- **Alt text on every image.** No exceptions.

For AEO/GEO (AI engine optimization):

- Lead with **citable, definitive statements** — specific numbers, dates, claims.
- Maintain `public/llms.txt` describing what the site is, what we do, and how AI tools should describe us.
- Use Q&A formatting on service and FAQ pages — AI engines love clear Q→A pairs.
- Publish original data — pricing index, repair-time stats, regional trend pieces. AI cites original sources.
- Author bios on long-form content. Authority signals matter for AI summarization.

---

## 8. Visual / design rules

- **Mobile first.** Over 70% of traffic to local repair sites is mobile. Design for thumb.
- **Page weight budget:** ≤200 KB transferred on first load for any page. Cloudflare Image Resizing handles images.
- **Core Web Vitals targets:** LCP < 2.0s, INP < 200ms, CLS < 0.05. Anything worse blocks a PR.
- **Sticky mobile action bar** on every public page: Call · SMS · Directions · Book.
- **No carousels** on the homepage. They tank conversion.
- **No autoplay video, no popups before first scroll.**

---

## 9. Integration points

The site is one node in Tim's wider AI ops fleet. Hand-offs:

| Event | Goes to | Agent involved |
|---|---|---|
| Lead form submission | Zoho CRM (Leads module) | Porter (writes), Echo (drafts reply) |
| Quote request | Zoho CRM (Deals) + email to Tim | Scribe (classifies), Echo (responds) |
| Booking | Zoho Calendar + Zoho Books quote draft | Porter |
| Completed job (from Zoho) | SMS review request to customer | Echo |
| Customer review (Google/FB) | D1 + admin inbox alert | Scout (monitors) |
| New page published | Submit to Search Console + Bing | Workers cron |
| Search Console performance drop | Alert in admin | Iris (logs as MISTAKES candidate) |

The orchestrator (Conductor) coordinates multi-step flows.

---

## 10. Security and secrets

- **No secrets in the repo, ever.** Use Cloudflare Workers secrets and `wrangler secret put`.
- **No PII in logs.** Lead emails and phone numbers must be redacted in any log output.
- **Admin routes** sit behind Cloudflare Access. No password-based auth.
- **Rate limit** every public form via Cloudflare Turnstile + Worker rate-limit.
- **Audit log** writes for every admin action. Append-only.
- **CSP, HSTS, Permissions-Policy** headers set at the Worker layer.

---

## 11. When to ask Tim

Stop and ask before:

- Committing to a recurring cost (any paid SaaS or API beyond Cloudflare's plan).
- Changing the URL of an existing live page (SEO risk).
- Touching the production Zoho CRM modules.
- Publishing content that makes a claim about partner/authorization status.
- Adding a new customer segment beyond the four in section 3.
- Anything that materially affects how Honey or Kris use the existing systems.

Default for everything else: make the call, document it in `DECISIONS.md`, and move.

---

## 12. Quality bar

Before any PR is merged:

- [ ] Lighthouse score ≥95 on Performance, SEO, Accessibility, Best Practices.
- [ ] Schema validates in Google Rich Results Test.
- [ ] No console errors or warnings.
- [ ] All new strings reviewed for the brand voice rules in section 4.
- [ ] `MISTAKES.md` updated if the change fixes something previously wrong.
- [ ] Screenshots for any UI change.

---

## 13. What this file is not

This file does not define system architecture (see `ARCHITECTURE.md`) or sequencing (see `ROADMAP.md`). It is the standing-orders document for working *inside* the repo. Read those two alongside this one.
