import { testType, toArray } from "./utils";
import { flattenChildren, Com } from "./createElement";
import { mapProps } from "./mapProps";

let mountIndex = 0;
function mountIndexAdd() {
  return mountIndex++;
}

function createKeyToOldIdIndex(oldChild) {
  let map = {};
  oldChild.forEach((item, index) => {
    if (item.key) {
      map[item.key] = index;
    }
  });
  return map;
}

function isSameVnode(oldVnode, newVnode) {
  return oldVnode.type == newVnode.type && oldVnode.key == newVnode.key;
}

function updateChildren(oldChild, newChild, parentDOMNode) {
  newChild = flattenChildren(newChild);
  oldChild = toArray(oldChild);
  newChild = toArray(newChild);
  let oldLength = oldChild.length,
    newLength = newChild.length,
    oldStartIndex = 0,
    newStartIndex = 0,
    oldEndIndex = oldLength - 1,
    newEndIndex = newLength - 1,
    oldStartVnode = oldChild[0],
    newStartVnode = newChild[0],
    oldEndVnode = oldChild[oldEndIndex],
    newEndVnode = newChild[newEndIndex],
    hasCode;
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // console.log("start");
    if (oldStartVnode == undefined) {
      oldStartVnode = oldChild[++oldStartIndex];
    } else if (oldEndVnode == undefined) {
      oldEndVnode = oldChild[--oldEndIndex];
    } else if (isSameVnode(oldStartVnode, newStartVnode)) {
      update(oldStartVnode, newStartVnode, parentDOMNode);
      oldStartVnode = oldChild[++oldStartIndex];
      newStartVnode = newChild[++newStartIndex];
    } else if (isSameVnode(OldEndVnode, newEndVnode)) {
      update(OldEndVnode, newEndVnode, parentDOMNode);
      oldEndVnode = oldChild[--oldEndIndex];
      newEndVnode = newChild[--newEndIndex];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      let domNode = oldStartVnode._hostNode;
      parentDOMNode.insertBefore(domNode, oldEndVnode.nextSibling);
      update(oldStartVnode, newEndVnode, parentDOMNode);
      oldStartVnode = oldChild[++oldStartIndex];
      newEndVnode = newChild[--newEndIndex];
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      let domNode = oldEndVnode._hostNode;
      parentDOMNode.insertBefore(domNode, oldStartVnode);
      update(oldEndVnode, newStartVnode, parentDOMNode);
      oldEndVnode = oldChild[--oldEndIndex];
      newStartVnode = newChild[++newStartIndex];
    } else {
      if (hasCode == undefined) {
        hasCode = createKeyToOldIdIndex(oldChild);
      }
      let key = newStartVnode.key;
      let oldVnodeIndex = hasCode[key];
      if (oldVnodeIndex !== undefined) {
        let moveVnode = oldChild[oldVnodeIndex];
        update(moveVnode, newStartVnode, parentDOMNode);
        parentDOMNode.insertBefore(
          moveVnode._hostNode,
          newStartVnode._hostNode
        );
        oldChild[oldVnodeIndex] = undefined;
        newStartVnode = newChild[++newStartIndex];
      } else {
        let newDOM = render(newStartVnode, parentDOMNode, true);
        parentDOMNode.insertBefore(newDOM, oldStartVnode._hostNode);
        newStartVnode = newChild[++newStartIndex];
      }
    }
    if (oldStartIndex > oldEndIndex) {
      for (; newStartIndex <= newEndIndex; newStartIndex++) {
        if (newChild[newStartIndex]) {
          render(newChild[newStartIndex], parentDOMNode);
        }
      }
    } else if (newStartIndex > newEndIndex) {
      for (; oldStartIndex <= oldEndIndex; oldStartIndex++) {
        if (oldChild[oldStartIndex]) {
          parentDOMNode.removeChild(oldChild[oldStartIndex]);
        }
      }
    }
  }

  return newChild;
}

function updateTextComponent(oldVnode, newVnode, parentDOMNode) {
  if (oldVnode.props !== newVnode.props) {
    parentDOMNode.firstChild.nodeValue = newVnode.props;
  }
}

function updateNativeComponent(oldVnode, newVnode, parentDOMNode) {
  let oldStyle = oldVnode.props.style || {};
  let newStyle = newVnode.props.style || {};
  Object.keys(newStyle).forEach(key => {
    oldVnode._hostNode.style[key] = newStyle[key];
  });
  Object.keys(oldStyle).forEach(key => {
    if (!key in newStyle) {
      oldVnode._hostNode.style[key] = "";
    }
  });
}

function updateComponent(oldComponentVnode, newComponentVnode) {
  let oldInstance = oldComponentVnode._instance;
  let oldState = oldInstance.state;
  let oldProps = oldInstance.props;
  let oldVnode = oldInstance.Vnode;

  let newProps = newComponentVnode.props;
  let newInstance = new newComponentVnode.type(newProps);
  let newState = (newInstance.state = oldInstance.state);

  let newVnode = newInstance.render();

  if (oldInstance.componentWillReceiveProps) {
    newInstance.componentWillReceiveProps(newProps);
  }

  oldInstance.props = newProps;
  newComponentVnode._instance = oldInstance;
  if (oldInstance.shouldComponentUpdate) {
    let result = oldInstance.shouldComponentUpdate(newProps, newState);
    if (!result) {
      return;
    }
  }
  if (oldInstance.componentWillUpdate) {
    oldInstance.componentWillUpdate(newProps, newState);
  }

  update(oldVnode, newVnode, oldVnode._hostNode);
  if (oldInstance.componentDidUpdate) {
    oldInstance.componentDidUpdate(oldProps, oldState);
  }
}

export function update(oldVnode, newVnode, parentDOMNode) {
  // console.log(oldVnode,"!@!$$!@",newVnode)
  if (!oldVnode || !newVnode) return;
  newVnode._hostNode = oldVnode._hostNode;
  let oldProps = oldVnode.props;
  let newProps = newVnode.props;
  if (newVnode.type == oldVnode.type) {
    //更新组件
    if (typeof newVnode.type == "function") {
      //更新组件
      updateComponent(oldVnode, newVnode);
    } else if (newVnode.type == "#text") {
      updateTextComponent(oldVnode, newVnode, parentDOMNode);
      // console.log("updateText!!!")
    } else if (typeof newVnode.type == "string") {
      newVnode.props.children = updateChildren(
        oldProps.children,
        newProps.children,
        newVnode._hostNode
      );
      updateNativeComponent(oldVnode, newVnode);
      //   mapProps(oldVnode._hostNode, newVnode.props);
    }
  } else {
    let newDOMNode = render(newVnode, parentDOMNode, true);
    //如果只是更新
    if (newVnode._hostNode) {
      parentDOMNode.insertBefore(newDOMNode, oldVnode._hostNode);
      parentDOMNode.removeChild(oldVnode._hostNode);
    } else {
      //若新有旧无，则直接添加
      parentDOMNode.appendChild(newDOMNode);
    }
  }
  return newVnode;
}

function mountComponent(vnode, container) {
  if (!vnode) return;
  let { type, props } = vnode;
  let component = new type(props);
  if (component.componentWillMount) {
    component.lefeCycle = Com.MOUNTING;
    component.componentWillMount();
  }
  let result = component.render();
  if (!result) {
    console.warn("你可能忘记返回JSX了");
  }
  component.Vnode = result;
  vnode._instance = component;
  let dom = render(result, container);
  // component.Vnode._hostNode = dom;
  // component.Vnode._mountIndex = mountIndexAdd();
  component.lefeCycle = Com.MOUNT;
  if (component.componentDidMount) {
    component.componentDidMount();
  }
  return dom;
}

function mountTextComponent(vnode, container) {
  let domNode = document.createTextNode(vnode.props);
  vnode._hostNode = domNode;
  container.appendChild(domNode);
  return domNode;
}

function mountChild(children, domNode, update) {
  children = flattenChildren(children);

  if (Array.isArray(children)) {
    children.forEach(child => {
      render(child, domNode, update);
    });
  } else {
    if (children.type == "#text") {
      mountTextComponent(children, domNode, update);
    } else {
      render(children, domNode, update);
    }
  }
  return children;
}

export function render(vnode, container, update) {
  if (!vnode) return;
  let { props, type } = vnode;
  let { children, className, style } = props;
  let domNode;
  if (type == "#text") {
    domNode = mountTextComponent(vnode, container);
  } else if (typeof type == "string") {
    domNode = document.createElement(type);
  } else if (typeof type == "function") {
    domNode = mountComponent(vnode, container);
  }
  if (children) {
    vnode.props.children = mountChild(children, domNode);
  }
  mapProps(domNode, props);
  vnode._hostNode = domNode;
  vnode._mountIndex = mountIndexAdd();
  if (!update) {
    container.appendChild(domNode);
  }
  return domNode;
}
