# ROADMAP.md — phonerepairman.com.au

> Phased delivery plan. Read `CLAUDE.md` and `ARCHITECTURE.md` first. Each phase has explicit scope, deliverables, acceptance criteria, dependencies, and risks. Phases are sequential — finish each before starting the next — but Phase 0 runs in parallel with Phase 1.

---

## Phase 0 — Foundation cleanup (Week 1, in parallel)

**Why it matters:** Most of the SEO value Phone Repairman is losing right now isn't from the site — it's from inconsistent NAP (Name, Address, Phone) and brand fragmentation across the open web. Fixing this before launch compounds every later phase.

**Scope**

- Audit every external listing: Google Business Profile, Facebook, Yellow Pages, dlook, 2NM, Hunter Circular, Hunter JO, reingar, Apple Maps, Bing Places, True Local.
- Unify branding to **"Phone Repairman"** everywhere. The legacy "iPhone Repairman" hurts AI engine confidence — they treat them as different entities.
- Unify phone number. Currently three appear in the wild: `02 6543 1289`, `02 4058 1904`, `0400 17# ###`. Pick one as primary; redirect others.
- Unify address. `22 Bridge St` (retail) vs `1B Finnegan Cres` (Yellow Pages) — confirm which is current and update everywhere.
- Confirm and document trading hours. The current site says "weekdays 9:30am–5pm, closed weekends and public holidays."
- Set up the canonical Google Business Profile with: full service list, photos, products, posts, Q&A, attributes (authorized HP/Acer/Lexmark agent).
- Inventory every URL on the existing live site → goes into a `legacy-urls.csv` for redirect planning in Phase 1.
- Connect Search Console + Bing Webmaster + GA4 to the current site so we have a 30-day baseline before launch.

**Deliverables**

- `docs/audit/listings.md` — table of every external listing with current vs. canonical values, status, owner.
- `docs/audit/legacy-urls.csv` — every existing URL, current status, planned destination.
- Updated GBP with full service catalogue and AWA badges.
- Baseline performance snapshot (impressions, clicks, top queries) saved to `docs/baseline/`.

**Acceptance**

- 100% of external listings either updated to canonical NAP or queued for update with the platform.
- Search Console + Bing + GA4 all reporting at least 7 days of data before Phase 1 cutover.
- Tim has reviewed and signed off on the canonical name, phone, address.

**Dependencies**

- Tim's access to (or admin reset of) each listing.

**Risks**

- Some directories don't honour update requests quickly. Mitigation: log them and revisit monthly.

---

## Phase 1 — Core site live (Weeks 1–3)

**Why it matters:** Get the new stack live with the eight pages that drive 90% of conversion. Everything after this is leverage on top of a working foundation.

**Scope**

- Set up the monorepo per `ARCHITECTURE.md` section 5.
- Astro project under `apps/web`, deployed to Cloudflare Pages, custom domain pointed.
- Eight production pages:
  1. `/` — homepage
  2. `/services/` + `/services/phone-repair` + `/services/laptop-repair` + `/services/tablet-repair`
  3. `/about`
  4. `/contact`
  5. `/faqs`
- Sticky mobile CTA bar (Call · SMS · Directions · Book) on every public page.
- Live "Open / Closed" status banner (static schedule for now; live Zoho data in Phase 3).
- `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `WebPage` schema everywhere applicable.
- Curated real reviews block on homepage and `/contact` (manually populated for launch; automated in Phase 4).
- Image pipeline through Cloudflare Image Resizing.
- 301 redirects from every legacy URL inventoried in Phase 0.
- `sitemap.xml`, `robots.txt`, `llms.txt`, all in place.
- Lighthouse CI in the deploy pipeline.

**Deliverables**

- Live site on `phonerepairman.com.au` running Astro on Cloudflare Pages.
- Redirect map deployed, all legacy URLs returning 301.
- IndexNow + Search Console pinged with new sitemap.
- Page templates documented in `apps/web/README.md`.

**Acceptance**

- Lighthouse ≥95 on Performance/SEO/Accessibility/Best Practices for every page.
- LCP <2.0s, INP <200ms, CLS <0.05 on mobile 4G simulation.
- Zero broken links across the new site (verified by `lychee` in CI).
- Zero schema validation errors in Google Rich Results Test.
- Every legacy URL either 200s on its new home or 301s to a sensible destination.
- Tim has clicked the Call, SMS, Directions, and Book buttons from a real phone and confirmed each works.

**Dependencies**

- Phase 0 NAP cleanup must be at least 80% done before launch.
- Confirmed brand assets: logo SVG, brand colours, hero photography.

**Risks**

- Losing existing keyword rankings during the cutover. Mitigation: thorough 301 mapping, submit new sitemap immediately, monitor Search Console daily for 14 days post-launch.

---

## Phase 2 — Brand pages, B2B pages, programmatic locations (Weeks 3–4)

**Why it matters:** This is where the site stops being a brochure and starts pulling traffic at scale. It's also where the B2B positioning Tim has been building toward gets real.

**Scope**

- Brand pages: `/brands/` hub + `/brands/hp`, `/acer`, `/lexmark`, `/epson`, `/apple`, `/samsung`, `/dell`, `/lenovo`.
  - HP/Acer/Lexmark pages clearly state AWA authorization with the badge.
  - Epson page clearly states direct partner status.
  - Other brands clearly state independent repairer status.
- B2B pages: `/business/` hub + `/business/msp-partners`, `/business/onsite-technician`, `/business/mining-it-fleet`, `/business/managed-devices`, `/business/bundles`.
- Locations: `/locations/` hub + town pages for Muswellbrook, Singleton, Scone, Aberdeen, Denman, Merriwa, Murrurundi, plus `/locations/hunter-valley` umbrella.
- First wave of programmatic combos: 4 services × 7 towns = 28 `/locations/<town>/<service>` pages.
  - Each one customised — distance from store, town-specific examples, town-specific call to action.
  - Similarity check enforced before publish.
- Additional FAQ entries per brand and per town.
- Strong internal linking — each new page links to siblings, parents, and at least 2 related services/brands.

**Deliverables**

- ~45 new pages live.
- A `pnpm run generate:location` + `pnpm run generate:brand` + `pnpm run generate:location-service` workflow documented.
- Similarity guardrail in place.

**Acceptance**

- All new pages pass Phase 1 quality bar.
- No two pages exceed 70% text similarity.
- Internal link graph: every new page has ≥3 outbound and ≥2 inbound internal links.
- Each B2B page has a segment-specific CTA (not the generic walk-in CTA).

**Dependencies**

- Phase 1 complete.

**Risks**

- Programmatic pages getting flagged as thin/doorway. Mitigation: similarity check + manual review + only publishing what's genuinely differentiated.

---

## Phase 3 — Conversion engine: bookings, quotes, lead routing (Weeks 4–6)

**Why it matters:** Until this phase the site can only generate calls and walk-ins. After this it captures structured leads, books work, and feeds the existing AI agent fleet.

**Scope**

- `workers/api` deployed with `/api/leads`, `/api/quote`, `/api/booking`, `/api/status`, `/api/reviews`.
- Booking flow: customer picks device + service + slot → creates Zoho Calendar event (via Porter MCP) → draft Zoho Books quote → confirmation email via Echo → SMS reminder via queue.
- Quote flow: customer describes device + fault → instant indicative price band → email/SMS with full quote drafted by Echo → routed to Tim for review.
- Lead router: tags incoming submissions by segment (walk-in, B2B, MSP, mining) and assigns in Zoho accordingly.
- Live status endpoint: pulls open/closed + current queue count from Zoho.
- Turnstile on every public form, rate limits, body-size caps.
- D1 `leads`, `bookings`, `reviews` tables in production.
- Echo and Scribe wired through the existing MCP servers.

**Deliverables**

- All four public forms functional end-to-end.
- Lead, booking, and quote round-trip tests passing in CI.
- Tim can see new leads in Zoho CRM tagged with source/segment.

**Acceptance**

- A real test lead from the homepage form lands in Zoho CRM correctly tagged within 5 seconds.
- A real test booking creates a Zoho Calendar event and a Zoho Books draft within 10 seconds.
- A real test quote triggers an Echo-drafted email within 30 seconds.
- Spam-rate (post-launch, after 7 days): <2% of submissions reach Zoho.

**Dependencies**

- Existing Porter, Echo, Scribe MCP servers operational.
- Zoho Calendar and Zoho Books configured for the flows.

**Risks**

- Echo drafts off-brand replies. Mitigation: Honey reviews every draft for the first 30 days per the existing pattern.
- Zoho rate limits. Mitigation: queue every write, exponential backoff, monitoring.

---

## Phase 4 — Review automation + reviews wall (Week 6)

**Why it matters:** Review velocity is the highest-ROI local SEO lever and AI engines weight reviews heavily.

**Scope**

- Webhook from Zoho Books: invoice paid → enqueue review request.
- Review request: SMS + email 24 hours after job completion, with branched link (Google for new customers, Facebook for repeat customers).
- GBP API integration: pull latest reviews, store in D1, surface in `/reviews` and homepage widget.
- Admin module: see new reviews, feature them, draft responses with Echo, flag any negatives for Tim's immediate attention.
- Schema: `Review` + `AggregateRating` on the homepage, `/reviews`, and the relevant service pages.

**Deliverables**

- Automated review request running.
- `/reviews` page live with real, refreshing data.

**Acceptance**

- 70%+ of paid jobs trigger a review request within 24 hours.
- Negative reviews (<4 stars) page Tim within 5 minutes.
- All reviews displayed are real (no fake/imported reviews — ever).

**Dependencies**

- Phase 3 complete (Zoho Books webhook).
- GBP API access for the listing.

**Risks**

- Customers feeling spammed. Mitigation: one request per job, opt-out link, no follow-ups.

---

## Phase 5 — Admin backend with role-based access (Weeks 6–8)

**Why it matters:** This is what unlocks the SEO and content team. Until now, every change requires a developer.

**Scope**

- `apps/admin` SPA, served at `/admin/*` behind Cloudflare Access.
- Cloudflare Access configured with Google OIDC accepting any Google account (Workspace + personal Gmail).
- `workers/admin-api` enforcing the full permission matrix from `ARCHITECTURE.md` section 6.
- D1 tables: `users`, `roles`, `permissions`, `role_permissions`, `user_permission_overrides`, `audit_log`.
- Modules implemented:
  - Users & roles (Tim/Admin only)
  - Pages (read/write/publish)
  - Meta + Schema editor
  - Programmatic page builder (location × service, brand × service)
  - Blog
  - Redirects
  - SEO files (sitemap, robots, llms.txt)
  - Reviews (read/feature/respond)
  - Leads (read/write/assign)
  - Analytics dashboard
  - Audit log
- Content edits to repo-managed pages commit back to GitHub via Octokit, opening a PR for non-publishers and merging directly for publishers — preserving git as source of truth.

**Deliverables**

- Admin live, Tim can invite users by Gmail address.
- Permission matrix UI with per-module checkboxes per role + per-user overrides.
- Every admin action writes an audit log entry.

**Acceptance**

- An external Gmail user can log in, edit a page, save a draft, and have it appear as a GitHub PR — without ever touching git.
- A user without `pages.write` cannot save changes (verified at the API, not just the UI).
- Audit log shows every action by user, timestamp, target, and diff.
- Tim can revoke any user's access in <30 seconds.

**Dependencies**

- Phases 1–3 complete (so there's content and data to manage).

**Risks**

- Permission bugs leaking access. Mitigation: server-side re-check on every endpoint, deny-by-default, integration tests for each permission flag.

---

## Phase 6 — SEO + AEO module suite (Weeks 8–10)

**Why it matters:** This is what makes the site self-improving and gives the SEO team superpowers.

**Scope**

- Meta & Schema editor with live preview of Google's rich result rendering.
- Schema templates per page type, fully editable.
- llms.txt editor with versioning.
- Internal linking module: suggests missing links based on entity matches, bulk-apply.
- AEO clarity score per page (opening sentence specificity, named-entity density, citable claim count).
- Original data publishing workflow — `/blog/data/*` template with `Dataset` schema, citation guidance.
- Search Console + Bing + GA4 + Cloudflare Analytics rolled into a unified admin dashboard.
- "Ranking drop alerts" — Iris flags pages whose impressions drop >30% week-over-week.
- IndexNow auto-ping on publish.
- Backlink monitor (basic — Search Console links report ingested daily).

**Deliverables**

- Full SEO toolkit live.
- AEO clarity score visible on every page in admin.
- Unified analytics dashboard.

**Acceptance**

- SEO team can ship a new optimised page from scratch without engineering involvement.
- A ranking drop on any key page triggers an admin alert within 24 hours.
- llms.txt updates ship via the admin and propagate within 5 minutes.

**Dependencies**

- Phase 5 complete.

**Risks**

- Over-tooling. Mitigation: ship the smallest useful version of each module, iterate based on what the SEO team actually uses.

---

## Phase 7 — Continuous improvement (ongoing)

**This is the new steady state.**

- Weekly: SEO team reviews Search Console movements, ships 2–4 page improvements.
- Monthly: publish one original data piece or guide.
- Quarterly: full Lighthouse + schema + link audit, refresh GBP photos and posts, expand programmatic coverage if new towns/services warrant.
- `MISTAKES.md` is reviewed monthly — Iris's flagged candidates are triaged and either codified into rules or archived.

---

## Risk register (top items)

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Cutover loses existing rankings | Medium | High | Thorough 301 map, baseline 30 days before, daily SC checks for 14 days post-launch |
| Programmatic pages flagged as thin | Medium | High | Similarity guardrail, manual review, only publish genuinely differentiated content |
| Echo sends off-brand replies | Medium | Medium | Honey reviews drafts for first 30 days, MISTAKES.md feedback loop |
| Permission bug exposes admin module | Low | High | Deny-by-default, server-side re-check, per-flag integration tests, audit log |
| Zoho rate limits during a burst | Low | Medium | Queue all writes, exponential backoff |
| Brand consolidation breaks an external listing | Low | Low | Phase 0 audit, redirects from old phone numbers if needed |

---

## Open questions (to resolve before Phase 1 starts)

1. Canonical phone number — `02 6543 1289` or `02 4058 1904`? Both currently in the wild.
2. Canonical trading address — `22 Bridge St` (retail) vs `1B Finnegan Cres` (Yellow Pages). Is the Finnegan Cres entry workshop-only or stale?
3. SMS provider for review requests and lead acknowledgements — TextMagic? Twilio? MessageMedia? (Australian sender ID preferred.)
4. Brand assets — does Phone Repairman have an updated logo and brand colour set, or do we need to commission these?
5. Hero photography — current/recent shop photos, technician photos, repair-in-action shots?
6. Is the existing repo on a build pipeline already, and if so, what does the current deploy look like?
7. Who in addition to Tim, Honey, Kris will need admin access at launch?
8. Are HP, Acer, Lexmark, Epson logos/badges available under the partner programs to display on the site?

---

## Cost envelope

Designed to add **$0 in recurring cost** beyond what Tim already pays:

- Cloudflare Pages: free for this size.
- Workers: Bundled plan likely sufficient (10M reqs/mo). $5/mo paid plan provides headroom and removes cold start concerns.
- D1: free tier is generous; expected usage fits comfortably.
- R2: pennies per month at this scale.
- Cloudflare Access: 50 users free.
- Turnstile: free.
- Zoho: already paid.
- SMS: pay-per-use, expected <$30/mo at current volume.
- Domain: already paid.

Realistic monthly run-rate: **$0–$50** depending on volume and SMS usage.
