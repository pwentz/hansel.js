const findAndRetrieveNodes = selectors => {
  const matchingSelectors = selectors.reduce((result, selector) => {

    const formattedNode = formatSingleSelector(selector)

    if (formattedNode) {
      if (formattedNode.constructor.name === 'Array') {
        return [...result, ...formattedNode]
      }
      return [...result, formattedNode]
    }

    return result
  }, [])

  if (matchingSelectors.length > 1) return matchingSelectors
    return matchingSelectors[0] || matchingSelectors
}

const formatMultipleSelectors = selectors => {
  let formattedSelectors;

  if (selectors.includes(',')) {
    formattedSelectors = selectors.split(',').map(s => s.trim())
  }

  else if (selectors.includes(' ')) {
    const parentElement = selectors.split(' ')[0]
    const formattedParent = formatSingleSelector(parentElement)

    if (!formattedParent) return []

    formattedSelectors = selectors.split(' ').slice(1)
  }

  return findAndRetrieveNodes(formattedSelectors)
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
