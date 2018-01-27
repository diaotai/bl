function render(vnode, container) {
  if (!vnode) return;
  let { props, type } = vnode;
  let domNode;
  if (typeof type == "string") {
    domNode = document.createElement(type);
  } else if(typeof type == "function"){
    domNode = renderComponent(vnode,container);
  }
  mapPropsToDom(props, domNode);
  let { children } = props;
  mountChild(children, domNode);
  container.appendChild(domNode);
  return domNode
}

function mapPropsToDom(props, dom) {
  for (let i in props) {
    if (!props.hasOwnProperty(i) || i == "children") {
      continue;
    }
    if (i == "style") {
      let style = props.style;
      Object.keys(style).forEach(key => {
        dom.style[key] = style[key];
      });
      continue;
    }
    dom.setAttribute(i, props[i]);
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
    let component = new type(props).render();
    let dom = render(component,container);
    return dom;
}

export const ReactDOM = {
  render
};
