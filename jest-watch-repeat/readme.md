# jest-watch-repeat

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Mentioned in Awesome Jest](https://awesome.re/mentioned-badge.svg)](https://github.com/jest-community/awesome-jest)

Loop tests n times.

Requires `jest@23+`.

## Usage

To use `jest-watch-repeat`,
add it to the `watchPlugins` section of the Jest configuration:

```js
{
  "jest": {
    "watchPlugins": [
      "jest-watch-repeat", // or
      ["jest-watch-repeat", { "key": "r", "prompt": "repeat test runs." }],
      // options:
      ["jest-watch-repeat", {
        // always repeat, even if some tests failed.
        'always-repeat': true
      }]
    ]
  }
}
```

In watch mode, press `r` to invoke a prompt and enter number of times you want the tests to be repeated:

```sh
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press r to repeat test runs.
 › Press Enter to trigger a test run.
```

```sh
Repeat Mode Usage
 › Press Esc to exit repeat mode.
 › Press Enter to repeat test run n times.
 repeat › 3
Run only failed tests?
 (Y/N) > N
```

[downloads-image]: https://img.shields.io/npm/dm/jest-watch-repeat.svg?style=flat
[downloads-url]: https://npmjs.org/package/jest-watch-repeat
[npm-image]: https://img.shields.io/npm/v/jest-watch-repeat.svg?style=flat
[npm-url]: https://npmjs.org/package/jest-watch-repeat
