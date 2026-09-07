# jest-watch-repeat

## 4.0.1

### Patch Changes

- 8da9c89: Run the test suite on vitest instead of jest, dropping the retired
  `jest-watch-toggle-config-2` fork along with `@repobuddy/jest`, `ts-jest`,
  `jest-esm-transformer-2`, `jest-watch-suspend` and `jest-watch-typeahead`.
  
  The old jest setup had to downlevel the ESM sources to CommonJS and map away the
  `.js` extensions that `moduleResolution: nodenext` requires; both hacks are gone,
  so the tests now exercise the same ESM the package ships.
  
  `jest` stays a devDependency and gains a purpose: `pnpm smoke` asserts that the
  built artifact still default-exports a usable watch plugin and that a real jest
  boots with it installed under `watchPlugins`.
  
  No runtime change — dependencies, exports and published files are untouched.

## 4.0.0

### Major Changes

- 83d7fa4: Ship ESM only.
  
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

### Patch Changes

- fad381e: Declare a supported Node range: `^20.19.0 || ^22.13.0 || >=24`.
  
  Every version in that range has unflagged `require(esm)`, so a CommonJS consumer's
  `require()` of this now-ESM-only package resolves rather than throwing `ERR_REQUIRE_ESM`.
  Node 18 (EOL April 2025) and Node 20.0–20.18 are excluded because `require()` hard-fails there.

## 3.0.4

### Patch Changes

- 08c394a: Rebuild with tsdown (rolldown) instead of `tsc`.
  
  No API change. The published entry keeps its exact contract —
  `require('jest-watch-repeat')` still returns the `RepeatPlugin` class itself, and
  `dist/index.d.ts` still declares `export =` — but the emitted JavaScript is
  produced by a different compiler, so the bytes in `dist/` differ. `dist/` also
  gains declaration maps and one rolldown interop helper. No published path is
  removed.

## 3.0.3

### Patch Changes

- 15d8ceb: Stop shipping test files in the published tarball, and restore `LICENSE`.
  
  `files` listed the whole `ts` source directory, so `ts/RepeatPlugin.spec.ts` and
  `ts/RepeatPrompt.spec.ts` went out in 3.0.2. `LICENSE` only existed at the monorepo
  root, where npm cannot pick it up, so the package had quietly lost it.

## 3.0.2

### Patch Changes

- c98383e: Move the release pipeline to cyberuni's reusable workflows and npm trusted publishing (OIDC), and point package metadata at the new repository home.

## 3.0.1

### Patch Changes

- f21395f: Downgrade `ansi-escapes` and `chalk` back to pre-ESM world.

## 3.0.0

### Major Changes

- 7b7ceaa: Update dependencies and `jest` to 29.

## [2.0.0](https://github.com/unional/jest-watch-repeat/compare/v1.1.4...v2.0.0) (2019-11-27)

### Features

- repeatedly run failed tests ([#21](https://github.com/unional/jest-watch-repeat/issues/21)) ([65d9214](https://github.com/unional/jest-watch-repeat/commit/65d9214))

### BREAKING CHANGES

- prompt changes

Running failed tests allow you to retry and pass them if the tests are failed due to concurrency or network connection problems.

## [1.1.4](https://github.com/unional/jest-watch-repeat/compare/v1.1.3...v1.1.4) (2019-11-27)

### Bug Fixes

- update dependencies ([e33b98e](https://github.com/unional/jest-watch-repeat/commit/e33b98e))

## [1.1.3](https://github.com/unional/jest-watch-repeat/compare/v1.1.2...v1.1.3) (2019-07-20)

### Bug Fixes

- add changelog to git ([bb62a37](https://github.com/unional/jest-watch-repeat/commit/bb62a37))
- add sem-rel/git ([6f61843](https://github.com/unional/jest-watch-repeat/commit/6f61843))
- release to npm ([f4aa564](https://github.com/unional/jest-watch-repeat/commit/f4aa564))
