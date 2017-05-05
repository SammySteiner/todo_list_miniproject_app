var expect = require('expect.js');
var myCode = require('../indexTwo.js')

describe ('test', function() {
  it('returns "Hello, world!" as a string', function() {
    expect(myCode.test()).to.be("Hello, world!")
  })
})
