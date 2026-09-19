# worldwidemultivision.com

Cloudflare Worker serving a single page. Content lives in `worker.js`.

- `dev` — development
- `main` — production (worldwidemultivision.com)

`index.html` is a copy of worker output (`node scripts/render_index.mjs`).

Push deploys via Cloudflare Workers Builds.
