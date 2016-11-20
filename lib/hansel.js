const formatMultipleSelectors = node => {
  if (node.includes(',')) {
    const selectors = node.split(',').map(s => s.trim())

    const test = selectors.reduce((result, selector) => {

      const formattedNode = formatSingleSelector(selector)

      if (formattedNode) {
        if (formattedNode.constructor.name === 'Array') {
          return [...result, ...formattedNode]
        }
        return [...result, formattedNode]
      }
      return result
    }, [])

    if (test.length > 1) return test
      return test[0]
  }

  if (node.includes(' ')) {

    const parentElement = node.split(' ')[0]
    const nestedChildren = node.split(' ').slice(1)

    return nestedChildren.reduce((result, selector) => {

      const formattedNode = formatSingleSelector(selector)
      const formattedParent = formatSingleSelector(parentElement)

      if (formattedParent && formattedNode) {
        if (formattedNode.constructor.name === 'Array') {
          return [...result, ...formattedNode]
        }
        return formattedNode
      }

      return result
    }, [])
  }
}

const formatSingleSelector = node => {
  let domNode;

  switch (node[0]) {
    case '.':
      domNode = document.getElementsByClassName(node.slice(1))
      if (domNode.length > 1) return Array.prototype.slice.call(domNode)
        return domNode[0]

    case '#':
      domNode = document.getElementById(node.slice(1))
      return domNode

    default:
      domNode = document.getElementsByTagName(node)
      if (domNode.length > 1) return Array.prototype.slice.call(domNode)
        return domNode[0]
  }
}

module.exports = (node) => {
  if (node.split(' ').length > 1) {
    return formatMultipleSelectors(node)
  }
    return formatSingleSelector(node)
}
