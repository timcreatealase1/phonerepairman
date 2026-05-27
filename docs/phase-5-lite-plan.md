# Phase 5 Lite — Slim admin for the SEO team

> Implementation plan for a **read decisions doc, not a commitment**. Five architecture choices need a yes/no from Tim before any code lands. After those, ship is ~3–4 working days.

## What it unlocks

The SEO team (and Tim) can edit content on the live site **without touching git or running a dev server**. Specifically:
- Service descriptions, devices supported, turnaround, warranty notes, FAQ entries
- Brand descriptions + FAQs
- Location descriptions + FAQs
- `llms.txt`
- *(later)* per-page title + meta description + OG tags
- *(later)* full page bodies / new pages

Every edit commits back to the GitHub repo via Octokit. Cloudflare Pages auto-rebuilds. Live in ~90 seconds.

Out of scope for Lite (deferred to full Phase 5):
- Multiple roles + per-user permission overrides
- Page-creation workflow
- Programmatic SEO matrix builder
- Reviews / leads modules
- Analytics dashboard

## Five decisions

### Decision 1 · Authentication
| Option | Setup | Cost | Recommendation |
|---|---|---|---|
| **A · Cloudflare Access** (Google OIDC, accepts personal Gmail) | 1-hour dashboard setup. Add user emails to the allow-list. | Free up to 50 users. | **Recommended** — already in the original Phase 5 spec, proper enterprise approach, no auth code needed in the Worker. |
| B · Self-hosted Google sign-in via Worker + JWT | More code. ~1 day extra. | Free. | Only if Cloudflare Access feels heavy. |
| C · Magic-link / email-OTP via a service like Resend or Postmark | Simplest UX for non-technical users. | Cheap (~$5/mo). | If Cloudflare Access feels like overkill. |

### Decision 2 · Storage
| Option | Pro | Con |
|---|---|---|
| **A · Pure git** — edit JSON/TS data files in the repo, commit via Octokit | No database. Git is the source of truth. Editable history. Reverts are one commit. | Edits cause a full site rebuild (~90s). |
| B · Hybrid — Cloudflare D1 for users / audit log; content stays in git | Faster audit queries. | Two systems to keep in sync. |
| C · Pure D1 — content stored in D1, served via SSR | Edits go live instantly. No rebuild. | Loses git as source of truth. SSR cost. |

**Recommended: A.** Phase 5 Lite is content-editing for a low-volume team. Rebuild lag is fine. Audit log = `git log`.

### Decision 3 · Edit-surface scope
| Tier | What's editable | Effort |
|---|---|---|
| **1 · Data-driven content** (recommended start) | Service / brand / location ledes, FAQs, turnaround, warranty, devices. `llms.txt`. Everything currently in `src/data/*.ts` files. | ~3 days |
| 2 · + Per-page meta | Title + meta description + OG image per page. Requires refactor: move hardcoded per-page strings into a `pages-meta.json` data file. | + 1 day |
| 3 · + Full page bodies | Replace whole page markdown bodies. Requires moving page content from `.astro` files to `.mdx` content collections. | + 2–3 days |
| 4 · + Create new pages | Author new service / brand / location entries from the admin. | + 1 day |

**Recommended start: Tier 1.** Ship the smallest useful version, iterate based on what the SEO team actually wants.

### Decision 4 · Workflow
| Option | Behaviour |
|---|---|
| **A · Direct to main** | Save → commit directly to `main` → Cloudflare auto-rebuilds → live. Simplest. Revert if needed. |
| B · PR flow | Save → opens GitHub PR → Tim reviews + merges → live. Adds review step, slower turnaround. |
| C · Mixed | Trusted publishers commit direct; others open PRs. Needs role logic. |

**Recommended: A.** Cloudflare Access gating already controls who can edit. Git history is the safety net.

### Decision 5 · Hosting the admin
| Option | Pro | Con |
|---|---|---|
| **A · Astro SSR routes** at `/admin/*` in this same project | Single deploy. Shares the codebase. Auth via Cloudflare Access in front of `/admin/*` only. | Astro project changes from `output: 'static'` to `output: 'hybrid'` (server pages only for /admin). Minor build complexity. |
| B · Separate Cloudflare Worker | Cleaner isolation. | Two deploys to keep in sync. |
| C · Cloudflare Pages Functions | In-between. Pages Functions run in the same project. | Limited routing primitives vs. full Worker. |

**Recommended: A.** Hybrid Astro. The public site stays static; only `/admin/*` runs server-side.

## Reference implementation (Tier 1, assuming all "Recommended" options)

### Routes
- `GET  /admin/`                       — gated index. Lists editable buckets: Services · Brands · Locations · llms.txt.
- `GET  /admin/services/`              — list 5 services.
- `GET  /admin/services/[slug]/edit`   — form populated from `serviceDetails.ts`.
- `POST /admin/services/[slug]`        — save → Octokit commit → 302 to /admin/services/.
- `GET  /admin/brands/`                — list 8 brands.
- `GET  /admin/brands/[slug]/edit`     — form populated from `brands.ts`.
- `POST /admin/brands/[slug]`          — save → Octokit commit.
- `GET  /admin/locations/`             — list 8 locations.
- `GET  /admin/locations/[slug]/edit`  — form populated from `locations.ts`.
- `POST /admin/locations/[slug]`       — save → Octokit commit.
- `GET  /admin/llms-txt/edit`          — textarea editor.
- `POST /admin/llms-txt`               — save → Octokit commit.

### Auth check (every server route)
```ts
// In every /admin/* server route:
const accessJwt = Astro.request.headers.get('cf-access-jwt-assertion');
const user = await verifyAccessJwt(accessJwt, ACCESS_AUD, ACCESS_TEAM_DOMAIN);
if (!user) return new Response('Unauthorised', { status: 401 });
// user.email is now usable for audit / commit author
```

### Save action
```ts
// Read current file from GitHub
const current = await octokit.rest.repos.getContent({ owner, repo, path: 'apps/web/src/data/brands.ts' });
// Parse, mutate the targeted record
const patched = patchBrandTsFile(current, slug, formData);
// Commit
await octokit.rest.repos.createOrUpdateFileContents({
  owner, repo, path: 'apps/web/src/data/brands.ts',
  message: `admin: ${user.email} edited /brands/${slug}`,
  content: Buffer.from(patched).toString('base64'),
  sha: current.sha,
  branch: 'main',
});
```

Parsing TS data files is the only nuance — needs a small parser or we use a JSON-based format. Easiest path: **migrate `serviceDetails.ts` / `brands.ts` / `locations.ts` to `.json` files first**. They're already plain data with no runtime logic. The `.astro` pages import the JSON instead of TS. Mutating JSON via the admin is then trivial.

### UI (admin pages)
- Single column, brand-styled (reuse Inter + JetBrains Mono).
- Form fields:
  - Text inputs for short strings (slug, name, turnaround, warranty).
  - `<textarea>` for `lede`.
  - Repeating field group for `whatWeFix` (title + description) and `faqs` (question + answer).
  - "Save" button → POST.
- Save success: green banner + "View live page" link.
- Conflict (someone else edited since you loaded): show diff, ask Tim to choose.

### Env vars needed (Cloudflare Pages → Settings → Environment Variables)
- `GITHUB_APP_ID` (or `GITHUB_PAT` for the simpler PAT-based flow)
- `GITHUB_APP_PRIVATE_KEY` (if using GitHub App)
- `GITHUB_REPO_OWNER` = `timcreatealase1`
- `GITHUB_REPO_NAME` = `phonerepairman`
- `CF_ACCESS_TEAM_DOMAIN` = (your `<team-name>.cloudflareaccess.com`)
- `CF_ACCESS_AUD` = (the Application Audience tag from Cloudflare Access)

## Effort + sequencing (Tier 1, Recommended options)

| Phase | Work | Days |
|---|---|---|
| 0 · Decisions confirmed | Tim says yes to A·A·1·A·A above | 0 |
| 1 · Astro hybrid + Cloudflare Access | Switch project to hybrid output; configure `/admin/*` server pages; Cloudflare Access policy in dashboard | 0.5 |
| 2 · Data migration | Move `serviceDetails.ts` / `brands.ts` / `locations.ts` → JSON files. Pages import JSON. Verify build clean. | 0.5 |
| 3 · Auth + Octokit plumbing | Access JWT verification helper; Octokit client; commit helper | 0.5 |
| 4 · Services admin UI | List, edit form, save, success state, error handling | 1 |
| 5 · Brands + Locations + llms.txt admin | Repeat the pattern; share components | 0.5 |
| 6 · Polish + edge cases | Stale-sha conflict, network errors, save-in-progress UI, audit trail link to GitHub commits | 0.5 |
| **Total** | | **3.5 days** |

## Open questions for Tim

1. **Who's on the team?** Email addresses for Cloudflare Access allow-list. Just you + Honey + Kris initially, or are external SEO contractors lined up?
2. **GitHub App vs PAT?** GitHub App is more secure (scoped, rotatable, audited) but takes 30 min to set up. PAT is simpler but bound to your personal GitHub account.
3. **What's the urgency?** If launch (`phonerepairman.com.au` cutover) is happening within a week or two, Phase 5 Lite slots in after launch. If you want the SEO team editing pre-launch, we ship admin first, then cut over with admin already live.

## What to do *before* Phase 5 Lite starts

The data files (`brands.ts`, `serviceDetails.ts`, `locations.ts`) are TS-with-`as const`. They'll need migration to JSON before the admin can edit them safely. This is a small refactor — ~2 hours — and I can do it as a one-shot prep PR independent of the admin build. **If you want to start that prep, say so and I'll do it now**; it won't break the site and unblocks the admin work.
