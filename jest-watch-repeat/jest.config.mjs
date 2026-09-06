/** @type {import('jest').Config} */
export default {
	preset: '@repobuddy/jest/presets/ts-cjs-watch',
	// The sources are ESM (`type: module`, `module: nodenext`), but the tests still
	// run in jest's CommonJS mode: watch plugins are the product, and jest's own ESM
	// runtime is still behind `--experimental-vm-modules`. So ts-jest is told to emit
	// CommonJS regardless of what `tsconfig.json` says, and the `.js` extensions that
	// `nodenext` requires on relative imports are mapped back to the bare specifier.
	transform: {
		'^.+\\.(ts|tsx|cts|mts)$': [
			'ts-jest',
			{
				tsconfig: { module: 'commonjs', moduleResolution: 'node10', verbatimModuleSyntax: false }
			}
		],
		'\\.m?jsx?$': 'jest-esm-transformer-2'
	},
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1'
	}
}
