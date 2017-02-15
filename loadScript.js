module.exports = function loadScript (src, cb) {
  var doc = document
  var isCss = src.match(/\.css$/)
  var tag = isCss ? 'link' : 'script'
  var el = doc.createElement(tag)
  var firstTag = doc.getElementsByTagName(tag)[0]

  if (isCss) {
    el.rel = 'stylesheet'
    el.href = src
  } else {
    el.async = 1
    el.src = src
  }

  el.onload = function () { cb() }
  el.onerror = function () { cb(new Error('failed to load: ' + src)) }
  firstTag.parentNode.insertBefore(el, firstTag)
}
