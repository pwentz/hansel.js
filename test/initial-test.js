const assert = require('chai').assert
const Hansel = require('./../lib/hansel')

describe('initial test', () => {
  it('exists', () => {
    const hansel = new Hansel()

    assert.instanceOf(hansel, Hansel)
  })
})
