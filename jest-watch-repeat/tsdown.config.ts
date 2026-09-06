import { defineConfig } from 'tsdown'

/**
 * One ESM output: `dist/*.js`, one file per source module (`unbundle`), alongside
 * `.d.ts` and source maps that resolve against the `ts/` sources the package also
 * ships.
 *
 * The package is ESM-only. jest loads a watch plugin through `requireOrImportModule`
 * (jest-core), which falls back to `await import()` on `ERR_REQUIRE_ESM` and reads
 * the namespace's `.default` — so `ts/index.ts` must `export default` the class.
 */
export default defineConfig({
	entry: ['ts/**/*.ts', '!ts/**/*.spec.ts'],
	format: 'esm',
	outDir: 'dist',
	platform: 'node',
	unbundle: true,
	sourcemap: true,
	dts: { sourcemap: true },
	outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
	clean: ['dist']
})
