const formatMultipleSelectors = node => {
  if (node.includes(',')) {
    return node.split(', ').map(selector => {
      return formatSingleSelector(selector)
    })
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
