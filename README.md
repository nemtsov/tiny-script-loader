# Tiny Script Loader [![Build Status](https://img.shields.io/travis/behance/tiny-script-loader.svg)](http://travis-ci.org/behance/tiny-script-loader) [![NPM version](https://img.shields.io/npm/v/tiny-script-loader.svg)](https://www.npmjs.com/package/tiny-script-loader) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

The purpose of this library is to be the smallest callback & Promise -based script loader.

## Usage

**Callback**

```js
var loadScript = require('tiny-script-loader/loadScript')

loadScript('https://example.com/script.js', function () {
  console.log('loaded')
})
```

**Promise**

```js
var loadScript = require('tiny-script-loader/loadScriptPromised')

loadScript('https://example.com/script.js')
.then(function () {
  console.log('loaded')
})
```

**Additional attributes**

```js
var loadScript = require('tiny-script-loader/loadScript')
var loadScriptPromised = require('tiny-script-loader/loadScriptPromised')

loadScript('https://example.com/script.js', callbackFn, { crossOrigin: true })
loadScriptPromised('https://example.com/script.js', { type: 'javascript' })
  .then(fn)
```
## License

[Apache-2.0](/LICENSE)
