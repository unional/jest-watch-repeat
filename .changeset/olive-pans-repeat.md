---
'jest-watch-repeat': patch
---

Move the TypeScript sources from `ts/` to `src/`.

The published tarball now carries the sources under `src/`, which is where the
declaration source maps point. Nothing about the package's entry points changes —
`dist/index.js` and `dist/index.d.ts` are unchanged — but anything that reached
into `node_modules/jest-watch-repeat/ts/` needs the new path.
