function render(vnode, container) {
  if (!vnode) return;
  let { props, type } = vnode;
  let domNode;
  if (typeof type == "string") {
    domNode = document.createElement(type);
  } else if(typeof type == "function"){
   //   console.log("compon",vnode)
    domNode = renderComponent(vnode,container);
  }
  mapPropsToDom(domNode,props);
  let { children } = props;
  mountChild(children, domNode);
  vnode._hostNode = domNode
  container.appendChild(domNode);
  return domNode
}

function mapPropsToDom(dom, props) {
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

export const ReactDOM = {
  render,
  mapPropsToDom
};
