import diff from "./diff.js";

export default (vNode,div)=>{
  if(div.children.length==0)
    div.replaceWith(vNode)
  else{
    diff(vNode,div)
  }
  return vNode;
  
}