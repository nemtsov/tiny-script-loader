module.exports = function loadScript (src, cb, attrs) {
  var doc = document
  var tag = 'script'
  var firstScript
  var el
  el = doc.createElement(tag)
  firstScript = doc.getElementsByTagName(tag)[0]
  if (attrs) {
    Object.keys(attrs).forEach(function (key) {
      el[key] = attrs[key]
    })
  }
  el.async = 1
  el.src = src
  el.onload = function () { cb() }
  el.onerror = function () { cb(new Error('failed to load: ' + src)) }
  firstScript.parentNode.insertBefore(el, firstScript)
}
