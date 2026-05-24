# Visual assets — manifest

Every image, logo and graphic the site needs. Update the **Status** column as files land.

Drop files into `apps/web/public/` at the paths below — they'll be live on the next `git push`.

---

## 1. Logo system

**Production wordmark (PR Logo 2026):** PNG horizontal lockup — "PHONE" in brand blue `#0b70ff`, "REPAIRMAN" in dark with an integrated wrench glyph. The Tim composite is the founder + wordmark hero asset, used on `/about`.

| File path | Format | Dimensions | Status | Notes |
|---|---|---|---|---|
| `public/wordmark.png`         | PNG | 765×73    | ✅ shipped | Primary lockup on light bg (Header). |
| `public/wordmark-inverse.png` | PNG | 765×73    | ✅ shipped | Dark-bg variant (Footer). |
| `public/tim-hero.png`         | PNG | 687×335   | ✅ shipped | Founder + wordmark hero, `/about`. |

**Geometric mark (Brand Sheet v1, Option B):** SVG service-cross — kept for favicon, social avatar, mask-icon. Re-tinted to `#0b70ff` to match the new wordmark.

| File path | Format | Dimensions | Status | Notes |
|---|---|---|---|---|
| `public/logo-mark.svg`        | SVG | viewBox 64×64  | ✅ shipped | Square mark for favicon source, social avatar. |
| `public/logo-mark-white.svg`  | SVG | viewBox 64×64  | ✅ shipped | Inverse mark for dark bg. |
| `public/logo-mark-mono.svg`   | SVG | viewBox 64×64  | ✅ shipped | Outline mark for single-colour print, Safari mask-icon. |
| `public/logo-full.svg`        | SVG | viewBox 240×60 | orphan   | Earlier Inter wordmark — superseded by `wordmark.png`. |
| `public/logo-full-white.svg`  | SVG | viewBox 240×60 | orphan   | Earlier Inter wordmark inverse — superseded by `wordmark-inverse.png`. |

## 2. Favicon set (derived from `logo-mark.svg`)

| File path | Format | Dimensions | Status | Notes |
|---|---|---|---|---|
| `public/favicon.svg`              | SVG | viewBox 32×32 | ✅ shipped | Stockier strokes — readable at 16px. Linked in BaseLayout. |
| `public/favicon-16.png`           | PNG | 16×16         | ✅ shipped | Raster fallback. |
| `public/favicon-32.png`           | PNG | 32×32         | ✅ shipped | Raster fallback. |
| `public/apple-touch-icon.png`     | PNG | 180×180       | ✅ shipped | iOS home-screen icon. |
| `public/android-chrome-192.png`   | PNG | 192×192       | ✅ shipped | Android shortcut icon. |
| `public/android-chrome-512.png`   | PNG | 512×512       | ✅ shipped | High-DPI Android. |
| `public/site.webmanifest`         | JSON | —            | ✅ shipped | References PNGs + theme + bg colour. |
| `public/favicon.ico`              | ICO | 16 + 32 + 48  | optional | Modern browsers prefer the SVG; add only if old-browser support matters. |

## 3. Social / OG share images

| File path | Format | Dimensions | Status | Notes |
|---|---|---|---|---|
| `public/og-default.svg` | SVG | viewBox 1200×630 | ✅ shipped | Default share tile. Linked in `BaseLayout.astro`. |
| `public/og-default.png` | PNG | 1200×630 | TODO | Rasterise from the SVG if any social platform refuses SVG previews. |
| (optional) per-page OG | PNG | 1200×630 | future | Override for /services, /about, /contact if we want unique previews. |

## 4. Hero photography (shot, not designed)

Each `<PhotoSlot>` on the live site is a placeholder until these land. Brief in the Claude Design bundle `Brand Sheet.html` section 05 — natural-light editorial, real bench, real hands, dust intentional.

| File path | Aspect | Used on | Status |
|---|---|---|---|
| (current) Google Business listing photo | 4:5 | `/` (homepage hero — interior service counter) | ✅ live · refresh within 3 months |
| `public/service-phone.jpg`      | 4:5 | `/services/phone-repair`      | TODO (slot 02 · Phone bench) |
| `public/service-laptop.jpg`     | 4:5 | `/services/laptop-repair`     | TODO (slot 03 · Laptop bench) |
| `public/service-tablet.jpg`     | 4:5 | `/services/tablet-repair`     | TODO (slot 04 · Tablet repair) |
| `public/service-console.jpg`    | 4:5 | `/services/console-repair`    | TODO (slot 05 · Console teardown) |
| `public/service-onsite.jpg`     | 4:5 | `/services/onsite-business`   | TODO (slot 06 · Onsite) |
| `public/hero-shopfront.jpg`     | 4:5 | `/about` hero                 | TODO (slot 07 · Shopfront exterior — golden hour) |

**Wiring:** change `<PhotoSlot alt="..." aspect="4/5" tag="..." />` → `<PhotoSlot src="/service-phone.jpg" alt="..." aspect="4/5" tag="..." />` and the placeholder swaps for the real image. PhotoSlot also accepts `source="real"` / `source="live"` / `source="placeholder"` and an optional `sourceLabel` for the top-right pill.

## 5. Partner brand logos (sourced from OEM partner portals)

Don't redraw these — trademark risk, and authorised-agent usage rights come from the official partner kit.

| File path | Source | Status | Used on |
|---|---|---|---|
| `public/brands/hp.svg`       | HP partner portal     | TODO | `/brands/hp` (Phase 2) |
| `public/brands/acer.svg`     | Acer partner portal   | TODO | `/brands/acer` (Phase 2) |
| `public/brands/lexmark.svg`  | Lexmark partner kit   | TODO | `/brands/lexmark` (Phase 2) |
| `public/brands/epson.svg`    | Epson partner kit     | TODO | `/brands/epson` (Phase 2) |
| `public/brands/apple.svg`    | Apple brand resources | TODO | `/brands/apple` (Phase 2) |
| `public/brands/samsung.svg`  | Samsung brand kit     | TODO | `/brands/samsung` (Phase 2) |
| `public/brands/dell.svg`     | Dell brand kit        | TODO | `/brands/dell` (Phase 2) |
| `public/brands/lenovo.svg`   | Lenovo brand kit      | TODO | `/brands/lenovo` (Phase 2) |
| `public/brands/awa-badge.svg` | AWA partner program  | TODO | Authorisations strip — if AWA provides an official badge. |

## 6. UI icons

Already shipped inline as SVG in `src/components/Icon.astro` (Lucide subset). No image files required.

---

## Asset pipeline notes

- **SVG-first.** Wherever a logo or icon can be vector, ship SVG. Smaller, infinitely scalable, no LCP penalty.
- **Raster sizing.** 4:5 hero images at 1000×1250 source → Cloudflare serves AVIF/WebP automatically with appropriate fallbacks (no build step needed in Phase 1).
- **Alt text.** Required on every `<img>` — never empty unless decorative.
- **Loading.** Hero images use `loading="eager"`. Everything below the fold uses `loading="lazy"` (default in PhotoSlot).
- **OG image text.** Keep type minimum 48pt — many social platforms compress to ~300px wide previews.
