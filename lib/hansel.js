const toArray = collection => {
  return Array.prototype.slice.call(collection)
}

const isAnArray = structure => {
  return structure.constructor.name === 'Array'
}

const findAndRetrieveNodes = selectors => {
  const matchingSelectors = selectors.reduce((result, selector) => {

    const formattedNode = formatSingleSelector(selector)

    if (formattedNode) {
      if (isAnArray(formattedNode)) {
        return [...result, ...formattedNode]
      }
      return [...result, formattedNode]
    }

    return result
  }, [])

  if (matchingSelectors.length > 1) return matchingSelectors
    return matchingSelectors[0] || matchingSelectors
}

const formatDeeplyNested = (selectors, selector) => {
  let children
  const node = formatSingleSelector(selector)
  if (isAnArray(node)) {
    children = node.reduce((result, elt) => {
      const childNodes = toArray(elt.children)
      return [...result, ...childNodes]
    }, [])
  }
  else {
    children = toArray(node.children)
  }
  const currentIndex = selectors.indexOf(selector)
  const isLast = currentIndex === (selectors.length - 1)

  if (isLast) {
    const parent = formatSingleSelector(selectors[currentIndex - 1])
    const potentialSiblings = toArray(parent.children)
    const matchingChildren = potentialSiblings.filter(node => node.className === selector.slice(1))
    return matchingChildren
  }

  const nextNode = formatSingleSelector(selectors[currentIndex + 1])

  if (!nextNode) return;

  if (children.includes(nextNode) || children.includes(nextNode[0])) {
    return formatDeeplyNested(selectors, selectors[currentIndex + 1])
  }
  else {
    return []
  }
}

const formatMultipleSelectors = selectors => {
  let formattedSelectors;

  if (selectors.includes(',')) {
    formattedSelectors = selectors.split(',').map(s => s.trim())
  }

  else if (selectors.includes(' ')) {
    const splitSelectors = selectors.split(' ')
    const parentElement = splitSelectors[0]
    const formattedParent = formatSingleSelector(parentElement)

    if (!formattedParent) return []

    if (splitSelectors.length === 2) {
      formattedSelectors = splitSelectors.slice(1)
    }
    else {
      const matchingSelectors = formatDeeplyNested(splitSelectors, splitSelectors[0])
      if (!matchingSelectors) return []

      if (matchingSelectors.length > 1) {
        return matchingSelectors
      }
      else {
        return matchingSelectors[0]
      }
    }
  }

  return findAndRetrieveNodes(formattedSelectors)
}

const formatSingleSelector = node => {
  let domNode;

  switch (node[0]) {
    case '.':
      domNode = document.getElementsByClassName(node.slice(1))
      if (domNode.length > 1) return toArray(domNode)
        return domNode[0]

    case '#':
      domNode = document.getElementById(node.slice(1))
      return domNode

    default:
      domNode = document.getElementsByTagName(node)
      if (domNode.length > 1) return toArray(domNode)
        return domNode[0]
  }
}

module.exports = (node) => {
  if (node.split(' ').length > 1) {
    return formatMultipleSelectors(node)
  }
    return formatSingleSelector(node)
}
