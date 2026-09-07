/**
 * The in-situ check that the product still works.
 *
 * The unit specs run under vitest and exercise the classes directly; they cannot
 * tell you whether a *real* jest can still load the published artifact. jest
 * loads a watch plugin through `requireOrImportModule`, which falls back to
 * `await import()` on `ERR_REQUIRE_ESM` and reads the namespace's `.default` —
 * an ESM-only plugin only survives that path if `dist/index.js` default-exports
 * the class. This config points a real jest at `dist/`, so `pnpm smoke` fails if
 * that ever stops being true.
 *
 * Run it after `pnpm build`. Not published: `files` ships only `dist` and `src`.
 *
 * @type {import('jest').Config}
 */
export default {
	rootDir: '.',
	roots: ['<rootDir>/smoke'],
	testEnvironment: 'node',
	watchPlugins: ['<rootDir>/dist/index.js']
}
