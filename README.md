# Phone Repairman

Marketing engine for [phonerepairman.com.au](https://phonerepairman.com.au).

Read these in order:

1. [CLAUDE.md](./CLAUDE.md) — operating manual for AI assistants and humans working in this repo
2. [ARCHITECTURE.md](./ARCHITECTURE.md) — system design (frontend, Workers, D1, auth, integrations)
3. [ROADMAP.md](./ROADMAP.md) — phased delivery plan
4. [DECISIONS.md](./DECISIONS.md) — append-only architectural decisions
5. [MISTAKES.md](./MISTAKES.md) — append-only lessons learned

## Stack

- **Frontend:** Astro 5 on Cloudflare Pages (`apps/web`)
- **Backend:** Cloudflare Workers — `api`, `admin-api`, `webhooks`, `jobs` (added in Roadmap Phase 3+)
- **Data:** D1 (SQLite), R2 (storage), KV (cache)
- **Admin auth:** Cloudflare Access (Google OIDC, accepts personal Gmail)
- **Workspace:** pnpm

## Local dev

```sh
pnpm install
pnpm --filter web dev
```

## Deploy

- `apps/web` auto-deploys to Cloudflare Pages on push to `main`
- Workers deploy via GitHub Actions + Wrangler (added Phase 3+)
