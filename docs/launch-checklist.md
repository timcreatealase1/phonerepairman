# Launch checklist — phonerepairman.com.au cutover

> Step-by-step playbook for swapping the production `phonerepairman.com.au` domain from the old static page in `cloudflarepages/phonerepairman/` to the new Astro site in this repo. Estimated total: **15–20 minutes** plus DNS propagation.

---

## 0 · Pre-cutover sanity check

Before touching the domain — confirm the new site is in shape.

- [ ] Open https://phonerepairman-v2.pages.dev/ and click through the homepage.
- [ ] Hit `/services/`, `/brands/`, `/locations/`, `/about`, `/contact`, `/faqs`.
- [ ] Open the homepage on a mobile phone (real device, not browser DevTools).
- [ ] Click the **Call** button on mobile — does it dial `02 6543 1289`?
- [ ] Click the **SMS** button on mobile — does it open Messages with `0483 927 499`?
- [ ] Click **Directions** — does Google Maps open with the right address?
- [ ] Confirm the Open / Closed banner above the services grid shows the right state.
- [ ] Check `/contact` map embed renders.

If any of these don't work, fix before cutover. Don't ship a broken hero CTA on launch day.

---

## 1 · Bind the production domain

### Cloudflare dashboard

1. Open **dash.cloudflare.com** → **Workers & Pages** → **`phonerepairman-v2`** project.
2. Top tab: **Custom domains**.
3. Click **Set up a custom domain**.
4. Enter `phonerepairman.com.au` → **Continue**.
5. Cloudflare detects the existing domain (already on your Cloudflare account, currently bound to the old `phonerepairman` project) and asks whether to take over.
6. Click **Activate domain** — Cloudflare updates the internal DNS routing to point to `phonerepairman-v2.pages.dev`. The old project's custom-domain binding is automatically removed.
7. Wait for the status badge to go green ("Active"). Usually < 60 seconds.
8. While you're there, add `www.phonerepairman.com.au` the same way (if you don't already have it set up to redirect to the apex).

### Verify

In a private/incognito browser window:

- [ ] `https://phonerepairman.com.au/` → renders the new site (the editorial design with the Tim wordmark)
- [ ] `https://www.phonerepairman.com.au/` → either renders or 301s to the apex (Cloudflare's default behavior)
- [ ] HTTPS lock icon shows — certificate is issued automatically by Cloudflare
- [ ] Open Network DevTools → confirm response is from `cf-ray: ...-SYD` (Sydney edge POP)

---

## 2 · The old project — leave or rename?

The `cloudflarepages/phonerepairman/` folder in the **other** GitHub repo (`timcreatealase1/cloudflarepages`) still has the old static `index.html`. After cutover, the old Cloudflare Pages project (also called `phonerepairman`) is no longer bound to a custom domain — it still builds, but only at its `*.pages.dev` URL.

**Option A — Leave it for 30 days.** Safe fallback. If something blows up with the new site, you can re-bind `phonerepairman.com.au` to the old project in 60 seconds and you're back. Recommended.

**Option B — Delete the old project immediately.** Cleaner. dash.cloudflare.com → Workers & Pages → old `phonerepairman` project → Settings → Delete. Recommended only if you're confident in the new build.

Either way, leave the folder in the `cloudflarepages` git repo for now — it's history if you ever need it.

---

## 3 · `iphonerepairman.com.au` legacy domain

If you still own this domain (the NAP audit shows it's referenced by Yellow Pages, Tuugo, openinghours24au, LocalBusinessGuide):

1. dash.cloudflare.com → add the domain to your account if it isn't already.
2. Workers & Pages → `phonerepairman-v2` → **Custom domains** → **Set up a custom domain** → `iphonerepairman.com.au`.
3. Cloudflare Pages will serve every URL on `iphonerepairman.com.au` from the same new site. Combined with the `_redirects` in `apps/web/public/_redirects`, common legacy paths land on the right new page.
4. If you want **every path on iphonerepairman.com.au to 301 to phonerepairman.com.au** (instead of serving the same content twice — better for SEO), set up a Page Rule or Transform Rule:
   - Cloudflare dashboard → `iphonerepairman.com.au` zone → **Rules** → **Page Rules**
   - URL pattern: `*iphonerepairman.com.au/*`
   - Setting: **Forwarding URL** — 301 — `https://phonerepairman.com.au/$2`

If you don't own the domain anymore, skip this section — just push the directories to update their links.

---

## 4 · Submit to search engines

Once `phonerepairman.com.au` is live on the new site:

### Google Search Console

1. **search.google.com/search-console** → property `phonerepairman.com.au` (you may need to add the new URL prefix if you've been using the old one — same domain, no re-verification needed if it's the same DNS).
2. **Sitemaps** → submit `https://phonerepairman.com.au/sitemap-index.xml`
3. **URL Inspection** on `https://phonerepairman.com.au/` → **Request indexing**. Do the same for `/services/`, `/brands/`, `/locations/`, `/about`, `/contact`, `/faqs` — top 8 pages.
4. Set a reminder to check **Performance** for the next 14 days. Watch impressions / clicks / position on your main keywords.

### Bing Webmaster Tools

1. **bing.com/webmasters** → same domain.
2. Submit `https://phonerepairman.com.au/sitemap-index.xml`.
3. **URL Submission** → top pages.

Both submissions usually take 24–48 hours to start re-crawling. The new site uses identical URLs to the old (`/` was the only URL on the old static site) so there's no link equity to lose.

---

## 5 · Update the priority external listings

Don't try to fix all 25 listings in one sitting. Order from `docs/audit/listings.md`:

1. **Google Business Profile** — Settings → Business name → confirm "Phone Repairman". Phone, address, hours, categories, photos. (Highest impact — drives Maps.)
2. **Facebook Page** — rename "iPhone Repairman" → "Phone Repairman". Change vanity URL from `phonescreenrepairman` if available. Update website link to `https://phonerepairman.com.au`.
3. **Yellow Pages** — fix name + phone (02 6543 1289) + address (22 Bridge St) + domain. The legacy entry has all four wrong.
4. **dlook** — three duplicate records to merge. Submit a takedown for the two extras, update the survivor.
5. **Localsearch** — slug already shows "PHONE REPAIRMAN" but URL slug is `iphone-repairman`. Open a ticket to rename slug.
6. **The rest** can be done over a week.

---

## 6 · 14-day post-launch monitoring

Set a daily reminder for 14 days. Each day:

- [ ] **Search Console** → Performance → impressions trending (allow 3–4 days for the bot to re-crawl).
- [ ] **Search Console** → Coverage → any 404s? Anything excluded?
- [ ] **Cloudflare Web Analytics** (dash.cloudflare.com → Analytics → phonerepairman-v2 project) → pageviews / unique visitors.
- [ ] Manually visit `phonerepairman.com.au` from a few different devices (work PC, phone, partner's phone) → confirm nothing broke.

After 14 days:

- [ ] Decide on Option A vs B for the old project (section 2).
- [ ] Run a fresh Lighthouse / PageSpeed Insights audit. Compare to baseline. Target: ≥ 95 Performance / Accessibility / Best Practices / SEO on mobile.

---

## 7 · Outstanding TODOs that can ship after launch

- Real photos for /services/tablet-repair, /services/console-repair, /services/onsite-business hero slots — slot in via `serviceDetails.ts` `image` field. Photographer brief at `docs/photography-brief.md`, AI prompt pack at `docs/claude-designer-photo-prompts.md`.
- Three real Google / FB reviews to replace the homepage placeholders.
- Programmatic location × service matrix (`/locations/<town>/<service>`) — Phase 2's biggest local-SEO lever. 28 pages of unique content.
- Brand-partner OEM logos (HP / Acer / Lexmark / Epson / Apple / Samsung / Dell / Lenovo) — source from each partner portal, drop into `apps/web/public/brands/`.
- Phase 3: workers/api + lead capture forms, booking flow.
- Phase 5: admin backend for the SEO team.

None of these block launch.
