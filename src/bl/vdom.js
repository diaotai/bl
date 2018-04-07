import { testType, toArray } from "./utils";
import { flattenChildren, Com } from "./createElement";
import { mapProps } from "./mapProps";

let mountIndex = 0;
function mountIndexAdd() {
  return mountIndex++;
}
/**
 * 将数组下标index和key对应起来
 * @param {*} oldChild
 */
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

function updateChildren(oldChild, newChild, parentDOMNode, parentContext) {
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
    //  // console.log("start");
    if (oldStartVnode == undefined) {
      oldStartVnode = oldChild[++oldStartIndex];
    } else if (oldEndVnode == undefined) {
      oldEndVnode = oldChild[--oldEndIndex];
    } else if (isSameVnode(oldStartVnode, newStartVnode)) {
      update(oldStartVnode, newStartVnode, parentDOMNode, parentContext);
      oldStartVnode = oldChild[++oldStartIndex];
      newStartVnode = newChild[++newStartIndex];
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      update(OldEndVnode, newEndVnode, parentDOMNode, parentContext);
      oldEndVnode = oldChild[--oldEndIndex];
      newEndVnode = newChild[--newEndIndex];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      let domNode = oldStartVnode._hostNode;
      parentDOMNode.insertBefore(domNode, oldEndVnode.nextSibling);
      update(oldStartVnode, newEndVnode, parentDOMNode, parentContext);
      oldStartVnode = oldChild[++oldStartIndex];
      newEndVnode = newChild[--newEndIndex];
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      let domNode = oldEndVnode._hostNode;
      parentDOMNode.insertBefore(domNode, oldStartVnode);
      update(oldEndVnode, newStartVnode, parentDOMNode, parentContext);
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
        update(moveVnode, newStartVnode, parentDOMNode, parentContext);
        parentDOMNode.insertBefore(
          moveVnode._hostNode,
          newStartVnode._hostNode
        );
        oldChild[oldVnodeIndex] = undefined;
        newStartVnode = newChild[++newStartIndex];
      } else {
        let newDOM = render(newStartVnode, parentDOMNode, true, parentContext);
        parentDOMNode.insertBefore(newDOM, oldStartVnode._hostNode);
        newStartVnode = newChild[++newStartIndex];
      }
    }
    if (oldStartIndex > oldEndIndex) {
      for (; newStartIndex <= newEndIndex; newStartIndex++) {
        if (newChild[newStartIndex]) {
          render(newChild[newStartIndex], parentDOMNode, false, parentContext);
        }
      }
    } else if (newStartIndex > newEndIndex) {
      for (; oldStartIndex <= oldEndIndex; oldStartIndex++) {
        let removeVnode = oldChild[oldStartIndex];
        if (roremoveVnode) {
          if (typeof removeVnode.type === "fuction") {
            if (removeVnode.componentWillUnmount) {
              removeVnode.componentWillUnmount();
            }
          }
          parentDOMNode.removeChild(removeVnode._hostNode);
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

function updateNativeComponent(oldVnode, newVnode, parentDOMNode, newContext) {
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
  // updateChildren(oldVnode.children, newVnode.child, parentDOMNode,newContext);
}

function updateComponent(oldComponentVnode, newComponentVnode, parentContext) {
  // console.log(newComponentVnode,"updateComponent",parentContext)
  let oldInstance = oldComponentVnode._instance;
  let oldState = oldInstance.state;
  let oldProps = oldInstance.props;
  let oldContext = oldInstance.context;
  let oldVnode = oldInstance.Vnode;

  let newProps = newComponentVnode.props;
  let newInstance = new newComponentVnode.type(newProps);
  let newState = (newInstance.state = oldInstance.state);
  let newContext = newInstance.getChildContext
    ? newInstance.getChildContext()
    : parentContext;
  //console.log("updateComponent newContext", newContext);

  if (oldInstance.componentWillReceiveProps) {
    newInstance.componentWillReceiveProps(newProps, newContext);
  }
  oldInstance.props = newProps;
  oldInstance.context = newContext;
  newInstance.context = newContext;
  newComponentVnode._instance = oldInstance;

  if (oldInstance.shouldComponentUpdate) {
    let result = oldInstance.shouldComponentUpdate(
      newProps,
      newState,
      newContext
    );
    if (!result) {
      return;
    }
  }
  if (oldInstance.componentWillUpdate) {
    oldInstance.componentWillUpdate(newProps, newState, newContext);
  }
  let newVnode = newInstance.render();
  update(oldVnode, newVnode, oldVnode._hostNode, newContext);
  if (oldInstance.componentDidUpdate) {
    oldInstance.componentDidUpdate(oldProps, oldState, oldContext);
  }
}

/**
 * 更新函数
 * @param {*} oldVnode
 * @param {*} newVnode
 * @param {*} parentDOMNode
 * @param {*} newContext
 */
export function update(oldVnode, newVnode, parentDOMNode, newContext) {
  //console.log(oldVnode,"我来自update",newVnode)
  if (!oldVnode || !newVnode) return;
  newVnode._hostNode = oldVnode._hostNode;
  let oldProps = oldVnode.props;
  let oldContext = oldVnode.context;
  let newProps = newVnode.props;
  // console.log("update!!!!!!!!!!!!!!!!!!!")
  //相同类型
  if (newVnode.type == oldVnode.type) {
    //更新组件
    if (typeof newVnode.type == "function") {
      updateComponent(oldVnode, newVnode, newContext);
    } else if (newVnode.type == "#text") {
      updateTextComponent(oldVnode, newVnode, parentDOMNode);
    } else if (typeof newVnode.type == "string") {
      newVnode.props.children = updateChildren(
        oldProps.children,
        newProps.children,
        newVnode._hostNode,
        newContext
      );
      updateNativeComponent(oldVnode, newVnode, parentDOMNode, newContext);
    }
  } else {
    let newDOMNode = render(newVnode, parentDOMNode, true, newContext);
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

/**
 * 对组件进行挂载
 * @param {*} vnode
 * @param {*} container
 * @param {*} parentContext
 */
function mountComponent(vnode, container, parentContext) {
  if (!vnode) return;
  let { type, props } = vnode;
  let component = new type(props);
  // 对组件的context进行处理
  if (component.getChildContext) {
    component.context = Object.assign(
      {},
      component.context,
      component.getChildContext()
    );
  } else {
    component.context = parentContext;
  }
  //处理生命周期
  if (component.componentWillMount) {
    component.componentWillMount();
  }
  let result = component.render();
  if (!result) {
    console.warn("你可能忘记返回JSX了");
  }

  component.Vnode = result;
  vnode._instance = component;
  component.lefeCycle = Com.MOUNTING;
  //进行渲染和挂载
  let dom = render(result, container, false, component.context, component);
  // component.Vnode._hostNode = dom;
  // component.Vnode._mountIndex = mountIndexAdd();
  component.lefeCycle = Com.MOUNT;
  if (component.componentDidMount) {
    component.componentDidMount();
    component.componentDidMount = null;
  }
  component._updateInLifeCycle();
  return dom;
}

/**
 * 对text节点进行处理
 * @param {*} vnode
 * @param {*} container
 */
function mountTextComponent(vnode, container) {
  let domNode = document.createTextNode(vnode.props);
  vnode._hostNode = domNode;
  container.appendChild(domNode);
  return domNode;
}

/**
 * 对子元素进行挂载
 * @param {*} children
 * @param {*} domNode
 * @param {*} update
 * @param {*} parentContext
 */
function mountChild(children, domNode, update, parentContext, instance) {
  children = flattenChildren(children);

  if (Array.isArray(children)) {
    children.forEach(child => {
      render(child, domNode, update, parentContext, instance);
    });
  } else {
    if (children.type == "#text") {
      mountTextComponent(children, domNode, update);
    } else {
      render(children, domNode, update, parentContext, instance);
    }
  }
  return children;
}

/**
 * 这就是传说中的render函数（准确的说是ReactDOM.render）
 * @param {*} vnode  需要渲染的元素的vnode
 * @param {*} container 需要挂载到的dom元素
 * @param {*} update  是否为更新，若为更新则挂载，否则不挂载
 * @param {*} parentContext  context部分
 */
export function render(vnode, container, update, parentContext, instance) {
  if (!vnode) return;
  //console.log(vnode, "@@@@@@@@@@@@@", parentContext);
  let { props, type, ref } = vnode;
  let { children, className, style } = props;
  let domNode;
  // 对于不同类型的vnode进行处理
  if (type == "#text") {
    domNode = mountTextComponent(vnode, container);
  } else if (typeof type == "string") {
    domNode = document.createElement(type);
  } else if (typeof type == "function") {
    const fixedContext = parentContext || {};
    domNode = mountComponent(vnode, container, fixedContext);
  }
  //对子元素进行处理
  if (children) {
    vnode.props.children = mountChild(
      children,
      domNode,
      false,
      parentContext,
      instance
    );
  }
  if (instance) {
    let refType = testType(vnode.ref);
    if (refType == 5) {
      vnode.ref(domNode);
    } else if (refType == 3 || refType == 4) {
      instance.refs[vnode.ref] = domNode;
    }
  }
  // 将vnode上的属性挂载到真正的DOM节点上
  mapProps(domNode, props);
  vnode._hostNode = domNode;
  vnode._mountIndex = mountIndexAdd();
  if (!update) {
    container.appendChild(domNode);
  }
  return domNode;
}
