export function render(vnode, container) {
  if (!vnode) return;
  let { props, type } = vnode;
  let domNode;
  if (typeof type == "string") {
    domNode = document.createElement(type);
  } else if(typeof type == "function"){
    domNode = renderComponent(vnode,container);
  } else {
    console.log("hello@##@text",type)
    return
  }
  console.log("render",vnode)
  mapPropsToDom(domNode,props);
  let { children } = props;
  mountChild(children, domNode);
  vnode._hostNode = domNode
  container.appendChild(domNode);
  return domNode
}

export function mapPropsToDom(dom, props) {
  for (let i in props) {
    if ( i == "children") {
      continue;
    }
 
    if (i == "style") {
      let style = props.style;
      Object.keys(style).forEach(key => {
        dom.style[key] = style[key];
      });
      continue;
    }
    dom[i] = props[i]
    // if(i=="className"){
    //   console.log(dom,"className!!!!",dom[i])
    // }
  }
}

function mountChild(children, domNode) {
  if(!children) return
  if(Array.isArray(children)){
    children.forEach((child)=>{
        render(child,domNode);
    })
  } else {
    render(children, domNode);
  }
}

function renderComponent(vnode,container){
    if(!vnode) return;
    let {type,props} = vnode;
    let component = new type(props);
    let result =  component.render();
    component.Vnode = result;
    let dom = render(result,container);
    
    return dom;
}

export function update(oldVnode,newVnode,parentDOMNode){
  newVnode._hostNode = oldVnode._hostNode;
  if(newVnode.type==oldVnode.type){
    //更新组件
    if(typeof newVnode.type=="function"){
      //todo 更新组件
    } else if(typeof newVnode.type=="string"){

    } else if(newVnode.type=="#text"){
      //todo 更新文字节点
    }
  } else {
    parentDOMNode.removeChild(oldVnode._hostNode);
    render(newVnode,parentDOMNode);
  }


}

