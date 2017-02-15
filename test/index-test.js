/* global beforeEach, afterEach, describe, it */

var sinon = require('sinon')
var unit = require('../')

describe('tiny-script-loader', function () {
  var doc, script, link, insertBefore

  beforeEach(function () {
    global.document = doc = {
      createElement: sinon.stub(),
      getElementsByTagName: sinon.stub()
    }

    script = { nodeName: 'SCRIPT' }
    link = { nodeName: 'LINK' }

    doc.createElement.withArgs('script').returns(script)
    doc.createElement.withArgs('link').returns(link)

    insertBefore = sinon.spy()
    doc.getElementsByTagName.returns([{
      parentNode: {insertBefore: insertBefore}
    }])
  })

  afterEach(function () {
    delete global.document
  })

  describe('loadScript', function () {
    it('should call back if load successful', function (done) {
      unit.loadScript('unit.js', done)
      script.onload()
    })

    it('should errback if load errored', function (done) {
      unit.loadScript('unit.js', function (err) {
        err.message.should.match(/unit\.js/)
        done()
      })
      script.onerror()
    })

    it('should create the correct element for js files', function (done) {
      unit.loadScript('unit.js', function () {
        script.nodeName.should.equal('SCRIPT')
        script.src.should.equal('unit.js')
        script.async.should.equal(1)
        done()
      })
      script.onload()
    })

    it('should create the correct element for css files', function (done) {
      unit.loadScript('unit.css', function () {
        link.nodeName.should.equal('LINK')
        link.href.should.equal('unit.css')
        link.rel.should.equal('stylesheet')
        done()
      })
      link.onload()
    })
  })

  describe('loadScriptPromised', function () {
    it('should call back if load successful', function () {
      var promise = unit.loadScriptPromised('unit.js')
      script.onload()
      return promise
    })

    it('should errback if load errored', function () {
      var promise = unit.loadScriptPromised('unit.js')
        .then(function () {
          throw new Error('should have thrown')
        })
        .catch(function (err) {
          err.message.should.match(/unit\.js/)
        })
      script.onerror()
      return promise
    })
  })
})
