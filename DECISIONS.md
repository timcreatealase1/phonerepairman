# DECISIONS

Append-only log of architectural decisions (ADR-style). Newest at the top.

Format per entry:

```
## YYYY-MM-DD — Title

**Context:** what problem prompted this decision.
**Decision:** what we chose.
**Alternatives considered:** what we rejected and why.
**Consequences:** what this enables, what it costs.
```

---

## 2026-05-20 — Repo lives in its own GitHub repo, not in `cloudflarepages`

**Context:** Existing static sites live in `github.com/timcreatealase1/cloudflarepages` (one folder per site, no build step). The rebuild is a full Astro monorepo with multiple Workers, D1, R2 — a different deploy model.

**Decision:** Stand up `github.com/timcreatealase1/phonerepairman` as a dedicated repo. Cutover at launch via Cloudflare Pages custom-domain swap.

**Alternatives considered:**
- Subfolder in `cloudflarepages` — rejected. Mixes build-pipeline monorepo with no-build static sites; Workers + D1 don't fit a static-sites umbrella.
- `phonerepairman-rebuild` with rename later — rejected. Adds CI/secrets churn at rename time.

**Consequences:** Clean CI scope (Lighthouse/schema/lychee only on the rebuild). Zero risk to live site until cutover. Existing static `cloudflarepages/phonerepairman/` stays serving prod until launch day, then domain flips and old folder is archived.
