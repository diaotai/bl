import { testType,toArray } from "./utils";
import { flattenChildren } from "./createElement";

export function mapPropsToDom(dom, props) {
  for (let i in props) {
    if (i == "children") {
      continue;
    }

    if (i == "style") {
      let style = props.style;
      Object.keys(style).forEach(key => {
        dom.style[key] = style[key];
      });
      continue;
    }
    dom[i] = props[i];
  }
}


function updateChildren(oldChild, newChild, parentDOMNode) {
  oldChild = toArray(oldChild);
  newChild = toArray(newChild);
  let length = Math.min(oldChild.length,newChild.length);
  for(let i=0;i<length;i++){
    let oldVnode = oldChild[i];
    let newVnode = newChild[i];
    // console.log(oldChild,newChild,i)
    // console.log(testType(oldChild),testType(newChild))
    if((testType(oldVnode)==3||testType(oldVnode)==4)&&testType(newVnode)==testType(oldVnode)){
      updateTextComponent(oldVnode,newVnode,parentDOMNode)
    } else {
      update(oldVnode, newVnode, parentDOMNode);
    }
  }
 
}

function updateTextComponent(oldChild,newChild,parentDOMNode){
  //console.log(oldChild,"@@#$@#$",newChild)
  if(oldChild!==newChild){
    parentDOMNode.firstChild.nodeValue = newChild;
  }
}

export function update(oldVnode, newVnode, parentDOMNode) {
  if (!oldVnode || !newVnode) return;
  newVnode._hostNode = oldVnode._hostNode;
  let oldProps = oldVnode.props;
  let newProps = newVnode.props;
  if (newVnode.type == oldVnode.type) {
    //更新组件
    if (typeof newVnode.type == "function") {
      //todo 更新组件
    } else if (typeof newVnode.type == "string") {
      mapPropsToDom(oldVnode._hostNode, newVnode.props);
      if (oldProps && newProps) {
        updateChildren(
          oldProps.children,
          newProps.children,
          newVnode._hostNode
        );
      }
    } else if (newVnode.type == "#text") {
      //todo 更新文字节点
    }
  } else {
    parentDOMNode.removeChild(oldVnode._hostNode);
    render(newVnode, parentDOMNode);
  }
}


function renderComponent(vnode, container) {
  if (!vnode) return;
  let { type, props } = vnode;
  let component = new type(props);
  let result = component.render();
  component.Vnode = result;
  let dom = render(result, container);

  return dom;
}

function rednerTextComponent(vnode,container){
  let domNode = document.createTextNode(vnode.props);
  vnode._hostNode = domNode;
  container.appendChild(domNode);
  return domNode;
}

function mountChild(children, domNode) {
  if (!children) return;
  children = flattenChildren(children)
  let type = testType(children);
  if (Array.isArray(children)) {
    children.forEach(child => {
      render(child, domNode);
    });
  } else {
    if(type==3||type==4){
      rednerTextComponent(children,domNode)
    } else {
      render(children, domNode);
    }
    
  }
}

export function render(vnode, container) {
  if (!vnode) return;
  let { props, type } = vnode;
  let domNode;
  if (type == "#text") {
    domNode = document.createTextNode(props);
  } else if (typeof type == "string") {
    domNode = document.createElement(type);
  } else if (typeof type == "function") {
    domNode = renderComponent(vnode, container);
  }
  if (props && testType(props) != 4) {
    mapPropsToDom(domNode, props);
    let { children } = props;
    mountChild(children, domNode);
  }

  //console.log(vnode)
  vnode._hostNode = domNode;
  container.appendChild(domNode);
  return domNode;
}
