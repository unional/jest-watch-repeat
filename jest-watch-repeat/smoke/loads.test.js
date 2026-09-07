// A trivial test so jest has something to watch. The assertion is not the point:
// what this proves is that a real jest boots with `dist/index.js` installed as a
// `watchPlugins` entry (see jest.smoke.config.mjs), which is how a consumer loads
// this package. `smoke/plugin-loads.mjs` covers the ESM default-export contract.
test('jest boots with the built plugin installed as a watch plugin', () => {
	expect(true).toBe(true)
})
