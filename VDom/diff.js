import render from "./render.js";
const diffAttributes = (oldAttrs = {}, newAttrs = {}) => {
    let patches=[]
    for(let [k,v] of Object.entries(newAttrs)){
        patches.push((node$)=>{
            if(k=='className'){
                node$.setAttribute('class',v)
                return node$
            }
            node$.setAttribute(k,v)
            return node$;
        })
    }
    for (let k of Object.keys(oldAttrs)){
        if(!k in newAttrs){
            patches.push((node$)=>{
                node$.removeAttribute(k)
                return node$;
            })
        }
    }
    return (node$)=>{
        for(let patch of patches){
            patch(node$)
        }
        return node$
    }
};
const zip=(xs,ys)=>{
    let zipped=[]
    for(let i=0;i<Math.min(xs.length,ys.length);i++){
        zipped.push([xs[i],ys[i]])
    }   
    return zipped
}
const diffChildren = (oldChildren = [], newChildren = []) => {
  let patches = [];
//   //console.log(oldChildren,newChildren)
    for(let [oldchild,newchild] of zip(oldChildren,newChildren)){
        //console.log(oldchild,newchild)
        patches.push(diff(oldchild,newchild))
    }
  
  for(let remainChild of newChildren.slice(zip(oldChildren,newChildren).length)){
      patches.push((node$)=>{
          node$.appendChild(remainChild)
          return node$
      })
  }
  return (node$)=>{
        for(const [patch,child] of zip(patches,node$.childNodes)){
            //console.log(child)
            patch(child)
        }
        return node$
      
  }
}

const diff = (oldNode = {}, newNode = {}) => {
  //diff the nodeName
  if ( oldNode.tagName !==  newNode.tagName) {
    return node$ => {
      let newNode$ = render(newNode);
      node$.replaceWith(newNode$);
      return newNode$;
    };
  } else if (typeof oldNode == "string" || typeof newNode == "string") {
    if (oldNode !== newNode) {
      return node => {
        let newNode$ = render(newNode);
        node.replaceWith(newNode$);
        return newNode$;
      };
    }
  }

  //diff the attributes
  let patchAttrs = diffAttributes(oldNode.attrs, newNode.attrs);
  let patchChilren = diffChildren(oldNode.children, newNode.children);
  return node$ => {
    node$ = patchAttrs(node$);
    node$ = patchChilren(node$);
    // //console.log(node$);
    return node$;
  };
};
export default diff;
