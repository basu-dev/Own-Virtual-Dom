export const createElem=(tagName,{attrs={},children=[]}={})=>{

    return{
        tagName,
        attrs,
        children
    }
}