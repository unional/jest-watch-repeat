---
'jest-watch-repeat': patch
---

Run the test suite on vitest instead of jest, dropping the retired
`jest-watch-toggle-config-2` fork along with `@repobuddy/jest`, `ts-jest`,
`jest-esm-transformer-2`, `jest-watch-suspend` and `jest-watch-typeahead`.

The old jest setup had to downlevel the ESM sources to CommonJS and map away the
`.js` extensions that `moduleResolution: nodenext` requires; both hacks are gone,
so the tests now exercise the same ESM the package ships.

`jest` stays a devDependency and gains a purpose: `pnpm smoke` asserts that the
built artifact still default-exports a usable watch plugin and that a real jest
boots with it installed under `watchPlugins`.

No runtime change — dependencies, exports and published files are untouched.
