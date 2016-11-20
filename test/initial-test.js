const assert = require('chai').assert
const H = require('./../lib/hansel')

describe('selectors', () => {

  afterEach(() => document.getElementById('test-node').innerHTML = '')

  context('can target DOM nodes by class', () => {
    context('there is only one node with class', () => {
      it('returns the single instance', () => {
        const testNode = document.getElementById('test-node')
        const nonTargetDiv = document.createElement('div')
        const targetDiv = document.createElement('div')


        testNode.appendChild(nonTargetDiv)
        testNode.appendChild(targetDiv)

        targetDiv.classList.add('wow')

        const result = H('.wow')

        assert.equal(result, targetDiv)
      })
    })

    context('there are multiple instances of nodes w/ class', () => {
      it('returns a collection of nodes', () => {
        const testNode = document.getElementById('test-node')
        const targetDivOne = document.createElement('div')
        const targetDivTwo = document.createElement('p')
        const targetDivThree = document.createElement('span')


        testNode.appendChild(targetDivOne)
        testNode.appendChild(targetDivTwo)
        testNode.appendChild(targetDivThree)

        const children = Array.prototype.slice.call(testNode.children)
        children.forEach(n => n.classList.add('wow'))

        const result = H('.wow')

        assert.deepEqual(result, children)
      })
    })
  })

  it('can target DOM nodes by ID', () => {
    const testNode = document.getElementById('test-node')
    const nonTargetDiv = document.createElement('div')
    const targetDiv = document.createElement('div')

    testNode.appendChild(nonTargetDiv)
    testNode.appendChild(targetDiv)

    targetDiv.id = 'wow'

    const result = H('#wow')

    assert.equal(result, targetDiv)
  })

  context('there are multiple instances of nodes w/ tag', () => {
    it('returns a collection of matching nodes', () => {
      const testNode = document.getElementById('test-node')
      const targetOne = document.createElement('article')
      const targetTwo = document.createElement('article')

      testNode.appendChild(targetOne)
      testNode.appendChild(targetTwo)

      const result = H('article')
      const formattedResult = Array.prototype.slice.call(result)

      assert.deepEqual(formattedResult, [targetOne, targetTwo])
    })
  })

  context('there is one instance of node w/ tag name', () => {
    it('returns the matching node', () => {
      const testNode = document.getElementById('test-node')
      const targetNode = document.createElement('article')

      testNode.appendChild(targetNode)

      const result = H('article')

      assert.equal(result, targetNode)
    })
  })

  describe('multiple selectors', () => {
    context('separated by comma', () => {
      context('first element is tag, second is class', () => {
        it('grabs elements that match either selector', () => {
          const testNode = document.getElementById('test-node')
          const targetOne = document.createElement('section')
          const targetTwo = document.createElement('div')

          testNode.appendChild(targetOne)
          testNode.appendChild(targetTwo)

          targetTwo.classList.add('neat')

          const result = H('section, .neat')

          assert.deepEqual(result, [targetOne, targetTwo])
        })
      })

      context('first element is tag, second is id', () => {
        it('returns all elements that match either selector', () => {
          const testNode = document.getElementById('test-node')
          const targetOne = document.createElement('section')
          const targetTwo = document.createElement('div')

          testNode.appendChild(targetOne)
          testNode.appendChild(targetTwo)

          targetTwo.id = 'neat'

          const result = H('section, #neat')

          assert.deepEqual(result, [targetOne, targetTwo])
        })
      })

      context('first element is tag, second is tag', () => {
        it('returns all elements that match either selector', () => {
          const testNode = document.getElementById('test-node')
          const targetOne = document.createElement('section')
          const targetTwo = document.createElement('article')

          testNode.appendChild(targetOne)
          testNode.appendChild(targetTwo)

          const result = H('section, article')

          assert.deepEqual(result, [targetOne, targetTwo])
        })
      })

      context('first element is class, second is class', () => {
        it('returns all elements that match either selector', () => {
          const testNode = document.getElementById('test-node')
          const targetOne = document.createElement('div')
          const targetTwo = document.createElement('div')

          testNode.appendChild(targetOne)
          testNode.appendChild(targetTwo)

          targetOne.classList.add('neat')
          targetTwo.classList.add('wow')

          const result = H('.neat, .wow')

          assert.deepEqual(result, [targetOne, targetTwo])
        })
      })

      context('first element is class, second is id', () => {
        it('returns all elements that match either selector', () => {
          const testNode = document.getElementById('test-node')
          const targetOne = document.createElement('div')
          const targetTwo = document.createElement('div')

          testNode.appendChild(targetOne)
          testNode.appendChild(targetTwo)

          targetOne.classList.add('neat')
          targetTwo.id = 'wow'

          const result = H('.neat, #wow')

          assert.deepEqual(result, [targetOne, targetTwo])
        })
      })

      context('first element is class, second is tag', () => {
        it('returns all elements that match either selector', () => {
          const testNode = document.getElementById('test-node')
          const targetOne = document.createElement('div')
          const targetTwo = document.createElement('section')

          testNode.appendChild(targetOne)
          testNode.appendChild(targetTwo)

          targetOne.classList.add('neat')

          const result = H('.neat, section')

          assert.deepEqual(result, [targetOne, targetTwo])
        })
      })

      context('first element is id, second is class', () => {
        it('returns all elements that match either selector', () => {
          const testNode = document.getElementById('test-node')
          const targetOne = document.createElement('div')
          const targetTwo = document.createElement('div')

          testNode.appendChild(targetOne)
          testNode.appendChild(targetTwo)

          targetOne.id = 'ok'
          targetTwo.classList.add('neat')

          const result = H('#ok, .neat')

          assert.deepEqual(result, [targetOne, targetTwo])
        })
      })

      context('first element is id, second is id', () => {
        it('returns all elements that match either selector', () => {
          const testNode = document.getElementById('test-node')
          const targetOne = document.createElement('div')
          const targetTwo = document.createElement('div')

          testNode.appendChild(targetOne)
          testNode.appendChild(targetTwo)

          targetOne.id = 'ok'
          targetTwo.id = 'neat'

          const result = H('#ok, #neat')

          assert.deepEqual(result, [targetOne, targetTwo])
        })
      })

      context('first element is id, second is tag', () => {
        it('returns all elements that match either selector', () => {
          const testNode = document.getElementById('test-node')
          const targetOne = document.createElement('div')
          const targetTwo = document.createElement('section')

          testNode.appendChild(targetOne)
          testNode.appendChild(targetTwo)

          targetOne.id = 'ok'

          const result = H('#ok, section')

          assert.deepEqual(result, [targetOne, targetTwo])
        })
      })
    })

    context('separated by space', () => {
      // context('class nested inside tag')
      // context('id nested inside tag')
      // context('tag nested inside tag')
      // context('class nested inside class')
      // context('id nested inside class')
      // context('tag nested inside class')
      // context('class nested inside id')
      // context('id nested inside id')
      // context('tag nested inside id')
    })
  })
})
