import { defineConfig } from 'vitest/config'

/**
 * The specs use the bare `test`/`describe`/`expect` globals, so `globals: true`.
 *
 * Unlike the jest setup this replaces, nothing here downlevels the sources to
 * CommonJS or rewrites the `.js` extensions that `moduleResolution: nodenext`
 * requires — vite resolves `./RepeatPlugin.js` to `RepeatPlugin.ts` natively, so
 * the tests run against the same ESM the package ships.
 */
export default defineConfig({
	test: {
		globals: true,
		include: ['src/**/*.spec.ts'],
		coverage: {
			provider: 'v8',
			include: ['src/**/*.ts'],
			// `index.ts` is a re-export barrel with no executable statements. istanbul
			// counted that as 100%; v8 renders the same emptiness as 0% and drags the
			// table down, so it is excluded rather than having its threshold lowered.
			exclude: ['src/**/*.spec.ts', 'src/index.ts'],
			reporter: ['text', 'lcov'],
			// The suite covers the sources completely. Pinned so a regression fails
			// the build instead of quietly reporting a lower number.
			thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 }
		}
	}
})
