const common = require('@unional/devpkg-node/simple/config/jest.common')
module.exports = {
  ...common,
  "watchPlugins": [
    [
      "<rootDir>/dist/index.js"
    ],
    "jest-watch-suspend",
    [
      "jest-watch-toggle-config",
      {
        "setting": "verbose"
      }
    ],
    [
      "jest-watch-toggle-config",
      {
        "setting": "collectCoverage"
      }
    ]
  ]
}
