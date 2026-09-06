---
'jest-watch-repeat': major
---

Ship ESM only.

The package is now `"type": "module"` and publishes a single ESM build to `dist/`.
The plugin class moved from `export =` to a default export, which is what jest's
`requireOrImportModule` reads off an imported namespace.

**Migration**

- Requires **jest >= 28**. Jest has loaded ESM watch plugins since 27, but it
  resolves the plugin path with the default `require`/`node`/`default` conditions
  and only honours `exports` from 28 — so the exports map deliberately points its
  `default` condition at the ESM entry, and jest 27 and older are no longer supported.
- `require('jest-watch-repeat')` no longer works. Configure the plugin by name in
  `watchPlugins` as before; jest imports it for you.
