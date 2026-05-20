# Visual assets — manifest

Every image, logo and graphic the site needs. Update the **Status** column as files land.

Drop files into `apps/web/public/` at the paths below — they'll be live on the next `git push`.

---

## 1. Logo system (designed)

| File path | Format | Dimensions | Status | Notes |
|---|---|---|---|---|
| `public/logo-full.svg`        | SVG | viewBox ~240×60 | TODO | Primary wordmark on light bg. |
| `public/logo-full-white.svg`  | SVG | viewBox ~240×60 | TODO | Inverse for dark bg (footer, B2B). |
| `public/logo-mark.svg`        | SVG | viewBox 64×64   | TODO | Square brand mark — derived from wordmark. |
| `public/logo-mark-white.svg`  | SVG | viewBox 64×64   | TODO | Inverse mark. |

Used in: Header (full), Footer (white), invoices, social, AWA partner portal listings.

## 2. Favicon set (derived from `logo-mark.svg`)

| File path | Format | Dimensions | Status | Notes |
|---|---|---|---|---|
| `public/favicon.svg`              | SVG | viewBox 32×32 | TODO | Already linked in `BaseLayout.astro` head. |
| `public/favicon.ico`              | ICO | 16 + 32 + 48  | TODO | Legacy fallback — browsers fetch by convention. |
| `public/apple-touch-icon.png`     | PNG | 180×180       | TODO | iOS home-screen icon. |
| `public/android-chrome-192.png`   | PNG | 192×192       | TODO | Android shortcut icon. |
| `public/android-chrome-512.png`   | PNG | 512×512       | TODO | High-DPI Android. |
| `public/site.webmanifest`         | JSON | —            | TODO | References the PNGs + theme colour. |

## 3. Social / OG share images

| File path | Format | Dimensions | Status | Notes |
|---|---|---|---|---|
| `public/og-default.png` | PNG | 1200×630 | TODO | Default Facebook / Twitter / LinkedIn share tile. Linked in `BaseLayout.astro`. |
| (optional) per-page OG | PNG | 1200×630 | future | Override for /services, /about, /contact if we want unique previews. |

## 4. Hero photography (shot, not designed)

Each `<PhotoSlot>` on the live site is a placeholder until these land. Recommended 4:5 aspect, exported at 1000×1250 minimum, AVIF + WebP + JPEG fallback.

| File path | Aspect | Used on | Status |
|---|---|---|---|
| `public/hero-shopfront.jpg`     | 4:5 | `/` (homepage hero), `/about` | TODO |
| `public/service-phone.jpg`      | 4:5 | `/services/phone-repair`      | TODO |
| `public/service-laptop.jpg`     | 4:5 | `/services/laptop-repair`     | TODO |
| `public/service-tablet.jpg`     | 4:5 | `/services/tablet-repair`     | TODO |
| `public/service-console.jpg`    | 4:5 | `/services/console-repair`    | TODO |
| `public/service-onsite.jpg`     | 4:5 | `/services/onsite-business`   | TODO |

**Wiring:** change `<PhotoSlot alt="..." aspect="4/5" caption="..." />` → `<PhotoSlot src="/hero-shopfront.jpg" alt="..." aspect="4/5" caption="..." />` and the placeholder swaps for the real image.

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
