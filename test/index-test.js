/* global beforeEach, afterEach, describe, it */

var sinon = require('sinon')
var unit = require('../')

describe('tiny-script-loader', function () {
  var doc, el, insertBefore

  beforeEach(function () {
    global.document = doc = {
      createElement: sinon.stub(),
      getElementsByTagName: sinon.stub()
    }

    el = {}
    doc.createElement.returns(el)

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
      unit.loadScript('u', done)
      el.onload()
    })

    it('should errback if load errored', function (done) {
      unit.loadScript('_u_', function (err) {
        err.message.should.match(/_u_/)
        done()
      })
      el.onerror()
    })

    it('should apply any given attributes', function (done) {
      var attrsObj = {
        crossOrigin: true,
        type: 'javascript',
        nonStandardProperty: 'thing',
        invalidType: 'invalid'
      }
      unit.loadScript('__u__', function (data) {
        el.crossOrigin.should.equal(true)
        el.type.should.equal('javascript')
        el.nonStandardProperty.should.equal('thing')
        el.invalidType.should.equal('invalid')
        done()
      }, attrsObj)

      el.onload()
    })

    it('should not override reserved attributes', function (done) {
      var attrsObj = {
        src: 'wrong.js',
        onload: 'wronger',
        onerror: 'wrongest'
      }
      unit.loadScript('__u__', function (data) {
        el.src.should.not.equal('wrong.js')
        el.onload.should.not.equal('wronger')
        el.onerror.should.not.equal('wrongest')
        done()
      }, attrsObj)

      el.onload()
    })
  })

  describe('loadScriptPromised', function () {
    it('should call back if load successful', function () {
      var promise = unit.loadScriptPromised('u')
      el.onload()
      return promise
    })

    it('should errback if load errored', function () {
      var promise = unit.loadScriptPromised('_u_')
        .then(function () {
          throw new Error('should have thrown')
        })
        .catch(function (err) {
          err.message.should.match(/_u_/)
        })
      el.onerror()
      return promise
    })

    it('should apply any given attributes', function (done) {
      var attrsObj = {
        crossOrigin: true,
        type: 'javascript',
        nonStandardProperty: 'thing',
        invalidType: 'invalid'
      }
      unit.loadScriptPromised('__u__', attrsObj)
        .then(function () {
          el.crossOrigin.should.equal(true)
          el.type.should.equal('javascript')
          el.nonStandardProperty.should.equal('thing')
          el.invalidType.should.equal('invalid')
          done()
        })

      el.onload()
    })

    it('should not override reserved attributes', function (done) {
      var attrsObj = {
        src: 'wrong.js',
        onload: 'wronger',
        onerror: 'wrongest'
      }
      unit.loadScriptPromised('__u__', attrsObj)
        .then(function () {
          el.src.should.not.equal('wrong.js')
          el.onload.should.not.equal('wronger')
          el.onerror.should.not.equal('wrongest')
          done()
        })

      el.onload()
    })
  })
})
