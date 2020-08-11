 const render= (vNode)=>{
    if(typeof vNode==='string'){
        return renderString(vNode)
    }
    else{
        return renderNode(vNode);
    }
}
const renderString=(vText)=>{
    return (document.createTextNode(vText))
} 
const renderNode=({tagName,attrs,children})=>{
    var div=  document.createElement(tagName);
    //render attributes
    Object.keys(attrs).forEach((attr)=>{
        if(attr==='classname' || attr=='className'){
            div.setAttribute('class',attrs[attr])
        }
        else{
            div.setAttribute(attr,attrs[attr]);
        }

    })
    //render children
    children.forEach(c=>{
        let a=render(c);
        div.appendChild(a)
    })
    return div
  }
export default render;

