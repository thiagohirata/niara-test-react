const isDomParent = (parent, children) => {
    if(!parent || !children) return false
    if(parent === children) return true
    return isDomParent(parent, children.parentElement)
}


export default isDomParent