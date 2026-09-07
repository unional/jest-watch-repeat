import { nodeTestPreset } from '@repobuddy/vitest/config/node'
import { defineConfig } from 'vitest/config'

/**
 * `nodeTestPreset` supplies the include globs, the node environment, and the
 * timeouts. Its default `include` only picks up `*.spec.node.ts`-style names, so
 * `includeGeneralTests` is on for the plain `*.spec.ts` this package uses.
 *
 * The specs use the bare `test`/`describe`/`expect` globals, so `globals: true`.
 *
 * Nothing here downlevels the sources to CommonJS or rewrites the `.js`
 * extensions that `moduleResolution: nodenext` requires — vite resolves
 * `./RepeatPlugin.js` to `RepeatPlugin.ts` natively, so the tests run against the
 * same ESM the package ships.
 */
export default defineConfig({
	plugins: [nodeTestPreset({ includeGeneralTests: true })],
	test: {
		globals: true,
		coverage: {
			provider: 'v8',
			// `index.ts` is a re-export barrel with no executable statements. v8 renders
			// that emptiness as 0% and drags the table down, so it is excluded rather
			// than having the thresholds lowered. The preset excludes the specs.
			exclude: ['src/index.ts'],
			reporter: ['text', 'lcov'],
			// The suite covers the sources completely. Pinned so a regression fails
			// the build instead of quietly reporting a lower number.
			thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 }
		}
	}
})
