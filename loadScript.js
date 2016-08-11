module.exports = function loadScript (src, cb) {
  var doc = document
  var tag = 'script'
  var firstScript
  var el
  el = doc.createElement(tag)
  firstScript = doc.getElementsByTagName(tag)[0]
  el.async = 1
  el.src = src
  el.onload = function () { cb(null) }
  el.onerror = function () { cb(new Error('failed to load: ' + src)) }
  firstScript.parentNode.insertBefore(el, firstScript)
}
