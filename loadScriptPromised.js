var loadScript = require('./loadScript')

module.exports = function loadScriptPromised (src) {
  return new Promise(function (resolve, reject) {
    loadScript(src, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
