import { mapPropsToDom } from "./render";

class Vnode {
  constructor(type, props, key, ref) {
    this.type = type;
    this.props = props;
    this.key = key;
    this.ref = ref;
  }
}

export class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
    this.nextState = null;
  }

  setState(nextState) {
    const preState = this.state;
    this.nextState = { ...this.state, ...nextState };
    this.state = this.nextState;
    let oldNode = this.Vnode;
    let newNode = this.render();
    //     console.log("newNode",newNode)
    updateComponent(this, oldNode, newNode);
  }

  render() {}
}

function updateComponent(instance, oldVnode, newVnode) {
   // console.log(oldVnode,"!!!",newVnode)
 // console.log(ReactDOM.mapPropsToDom)
  if (oldVnode.type === newVnode.type) {
  //  console.log(oldVnode._hostNode, newVnode.props)
  mapPropsToDom(oldVnode._hostNode, newVnode.props); //更新节点
  // oldVnode._hostNode.style.background = "yellow"
  } else {
    //remove
  }
}

export function createElement(type, config, ...children) {
  console.log(config,"type!!!",type)
  if (!type) return;
  let props = {},
    key,
    ref;
  if (config) {
    key = config.key === undefined ? null : config.key;
    ref = config.ref === undefined ? null : config.ref;
    for (let i in config) {
      if (i == "key" || i == "ref") continue;
      if (config.hasOwnProperty(i)) {
        props[i] = config[i];
      }
    }
  }
  if (children.length == 1) {
    props.children = children[0];
  } else if (children.length > 1) {
    props.children = children;
  }
  return new Vnode(type, props, key, ref);
}


