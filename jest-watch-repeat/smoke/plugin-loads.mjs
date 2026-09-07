// jest loads a watch plugin through `requireOrImportModule` (jest-core), which
// falls back to `await import()` on `ERR_REQUIRE_ESM` and reads the namespace's
// `.default`. An ESM-only plugin only survives that path if `dist/index.js`
// default-exports the class, so this asserts exactly that against the built
// artifact. The unit specs cannot: they import the TypeScript sources.
//
// Run after `pnpm build`; `pnpm smoke` runs this and the jest boot check together.
import assert from 'node:assert/strict'

const mod = await import('../dist/index.js')
const RepeatPlugin = mod.default

assert.equal(typeof RepeatPlugin, 'function', 'dist/index.js must default-export the plugin class')

const plugin = new RepeatPlugin({ config: {}, stdout: process.stdout })
assert.deepEqual(plugin.getUsageInfo(), { key: 'r', prompt: 'repeat test runs' })
