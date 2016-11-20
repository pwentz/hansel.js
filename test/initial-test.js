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
          const targetThree = document.createElement('div')

          testNode.appendChild(targetOne)
          testNode.appendChild(targetTwo)
          testNode.appendChild(targetThree)

          targetOne.id = 'ok'
          targetTwo.classList.add('neat')
          targetThree.classList.add('neat')

          const result = H('#ok, .neat')

          assert.deepEqual(result, [targetOne, targetTwo, targetThree])
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

      context('first element does not exist', () => {
        it('returns only the second element', () => {
          const testNode = document.getElementById('test-node')
          const targetOne = document.createElement('div')
          const targetTwo = document.createElement('div')

          testNode.appendChild(targetOne)
          testNode.appendChild(targetTwo)

          targetTwo.id = 'ok'

          const result = H('.wow, #ok')

          assert.deepEqual(result, targetTwo)
        })
      })

      context('second element does not exist', () => {
        it('only returns the first element', () => {
          const testNode = document.getElementById('test-node')
          const targetOne = document.createElement('div')
          const targetTwo = document.createElement('div')

          testNode.appendChild(targetOne)
          testNode.appendChild(targetTwo)

          targetOne.id = 'ok'

          const result = H('#ok, .wow')

          assert.deepEqual(result, targetOne)
        })
      })

      context('neither element exist', () => {
        it('returns an empty array', () => {
          const testNode = document.getElementById('test-node')
          const targetOne = document.createElement('div')
          const targetTwo = document.createElement('div')

          testNode.appendChild(targetOne)
          testNode.appendChild(targetTwo)

          const result = H('#ok, .wow')

          assert.deepEqual(result, [])
        })
      })
    })

    context('separated by space', () => {
      context('class nested inside tag', () => {
        it('returns the classes nested inside the selected tag', () => {
          const testNode = document.getElementById('test-node')
          const parentDiv = document.createElement('section')
          const nestedChildOne = document.createElement('div')
          const nestedChildTwo = document.createElement('div')

          testNode.appendChild(parentDiv)
          parentDiv.appendChild(nestedChildOne)
          parentDiv.appendChild(nestedChildTwo)

          nestedChildOne.classList.add('wow')
          nestedChildTwo.classList.add('wow')

          const result = H('section .wow')

          assert.deepEqual(result, [nestedChildOne, nestedChildTwo])
        })
      })

      context('id nested inside tag', () => {
        it('returns the id nested inside the selected tag', () => {
          const testNode = document.getElementById('test-node')
          const parentDiv = document.createElement('section')
          const nestedChildOne = document.createElement('div')

          testNode.appendChild(parentDiv)
          parentDiv.appendChild(nestedChildOne)

          nestedChildOne.id = 'wow'

          const result = H('section #wow')

          assert.deepEqual(result, nestedChildOne)
        })
      })

      context('tag nested inside tag', () => {
        it('returns the tags nested inside the selected tag', () => {
          const testNode = document.getElementById('test-node')
          const parentDiv = document.createElement('section')
          const nestedChildOne = document.createElement('article')
          const nestedChildTwo = document.createElement('article')
          const nestedChildThree = document.createElement('article')

          testNode.appendChild(parentDiv)
          parentDiv.appendChild(nestedChildOne)
          parentDiv.appendChild(nestedChildTwo)
          parentDiv.appendChild(nestedChildThree)

          const result = H('section article')

          assert.deepEqual(result, [nestedChildOne, nestedChildTwo, nestedChildThree])
        })
      })

      context('class nested inside class', () => {
        it('returns the class nested inside the selected class', () => {
          const testNode = document.getElementById('test-node')
          const parentDiv = document.createElement('div')
          const nestedChildOne = document.createElement('div')
          const nestedChildTwo = document.createElement('div')

          testNode.appendChild(parentDiv)
          parentDiv.appendChild(nestedChildOne)
          parentDiv.appendChild(nestedChildTwo)

          parentDiv.classList.add('neat')
          nestedChildOne.classList.add('ok')
          nestedChildTwo.classList.add('ok')

          const result = H('.neat .ok')

          assert.deepEqual(result, [nestedChildOne, nestedChildTwo])
        })
      })

      context('id nested inside class', () => {
        it('returns the id nested inside the selected class', () => {
          const testNode = document.getElementById('test-node')
          const parentDiv = document.createElement('div')
          const nestedChildOne = document.createElement('div')

          testNode.appendChild(parentDiv)
          parentDiv.appendChild(nestedChildOne)

          parentDiv.classList.add('neat')
          nestedChildOne.id = 'ok'

          const result = H('.neat #ok')

          assert.equal(result, nestedChildOne)
        })
      })

      context('tag nested inside class', () => {
        it('returns the tag(s) nested inside the selected class', () => {
          const testNode = document.getElementById('test-node')
          const parentDiv = document.createElement('div')
          const nestedChildOne = document.createElement('section')
          const nestedChildTwo = document.createElement('section')

          testNode.appendChild(parentDiv)
          parentDiv.appendChild(nestedChildOne)
          parentDiv.appendChild(nestedChildTwo)

          parentDiv.classList.add('neat')

          const result = H('.neat section')

          assert.deepEqual(result, [nestedChildOne, nestedChildTwo])
        })
      })

      context('class nested inside id', () => {
        it('returns the class(es) nested inside the selected id', () => {
          const testNode = document.getElementById('test-node')
          const parentDiv = document.createElement('div')
          const nestedChildOne = document.createElement('div')
          const nestedChildTwo = document.createElement('div')

          testNode.appendChild(parentDiv)
          parentDiv.appendChild(nestedChildOne)
          parentDiv.appendChild(nestedChildTwo)

          parentDiv.id = 'cool'
          nestedChildOne.classList.add('neat')
          nestedChildTwo.classList.add('neat')

          const result = H('#cool .neat')

          assert.deepEqual(result, [nestedChildOne, nestedChildTwo])
        })
      })

      context('id nested inside id', () => {
        it('returns the id nested inside the selected id', () => {
          const testNode = document.getElementById('test-node')
          const parentDiv = document.createElement('div')
          const nestedChildOne = document.createElement('div')

          testNode.appendChild(parentDiv)
          parentDiv.appendChild(nestedChildOne)

          parentDiv.id = 'cool'
          nestedChildOne.id = 'neat'

          const result = H('#cool #neat')

          assert.equal(result, nestedChildOne)
        })
      })

      context('tag nested inside id', () => {
        it('returns the tag(s) nested inside the selected id', () => {
          const testNode = document.getElementById('test-node')
          const parentDiv = document.createElement('div')
          const nestedChildOne = document.createElement('article')
          const nestedChildTwo = document.createElement('article')

          testNode.appendChild(parentDiv)
          parentDiv.appendChild(nestedChildOne)
          parentDiv.appendChild(nestedChildTwo)

          parentDiv.id = 'cool'

          const result = H('#cool article')

          assert.deepEqual(result, [nestedChildOne, nestedChildTwo])
        })
      })

      context('first element does not exist', () => {
        it('returns an empty array', () => {
          const testNode = document.getElementById('test-node')
          const parentDiv = document.createElement('div')
          const nestedChildOne = document.createElement('div')

          testNode.appendChild(nestedChildOne)

          nestedChildOne.id = 'wow'

          const result = H('.cool #wow')

          assert.deepEqual(result, [])
        })
      })

      context('second element does not exist', () => {
        it('returns an empty array', () => {
          const testNode = document.getElementById('test-node')
          const parentDiv = document.createElement('div')

          testNode.appendChild(parentDiv)

          parentDiv.id = 'wow'

          const result = H('#wow .cool')

          assert.deepEqual(result, [])
        })
      })

      context('neither elements exist', () => {
        it('returns an empty array', () => {
          const testNode = document.getElementById('test-node')
          const parentDiv = document.createElement('div')

          testNode.appendChild(parentDiv)

          const result = H('#wow .cool')

          assert.deepEqual(result, [])
        })
      })
    })
  })

  describe('more than two selectors', () => {
    context('comma separated selectors', () => {
      it('returns all matching selectors', () => {
        const testNode = document.getElementById('test-node')
        const targetOne = document.createElement('div')
        const targetTwo = document.createElement('section')
        const targetThree = document.createElement('div')
        const targetFour = document.createElement('div')

        testNode.appendChild(targetOne)
        testNode.appendChild(targetTwo)
        testNode.appendChild(targetThree)
        testNode.appendChild(targetFour)

        targetOne.id = 'ok'
        targetThree.classList.add('neat')
        targetFour.classList.add('neat')

        const result = H('#ok, section, .neat')

        assert.deepEqual(result, [targetOne, targetTwo, targetThree, targetFour])
      })
    })

    context.skip('space separated values', () => {
      it('returns the last element nested inside the second nested inside first', () => {
        const testNode = document.getElementById('test-node')
        const parentDiv = document.createElement('div')
        const targetOne = document.createElement('section')
        const targetTwo = document.createElement('div')
        const targetThree = document.createElement('div')
        const targetFour = document.createElement('div')

        testNode.appendChild(parentDiv)
        parentDiv.appendChild(targetOne)
        targetOne.appendChild(targetTwo)
        targetOne.appendChild(targetThree)
        // targetFour not appended to parents
        testNode.appendChild(targetFour)

        parentDiv.id = 'ok'
        targetTwo.classList.add('neat')
        targetThree.classList.add('neat')
        targetFour.classList.add('neat')

        const result = H('#ok section .neat')

        assert.deepEqual(result, [targetTwo, targetThree])
      })
    })
  })
})
