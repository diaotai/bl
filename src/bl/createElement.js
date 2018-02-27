import { update } from "./render";
import { testType } from "./utils";

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
  shouldComponentUpdate() {}
  componentWillReceiveProps() {}
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidUnmount() {}

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
  instance.Vnode = update(oldVnode, newVnode);
}

export function createElement(type, config, ...children) {
  //console.log(config,"type!!!",type)
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
  //对于组件进行defaultProps处理
  let defaultProps = type.defaultProps;
  if (defaultProps) {
    Object.keys(defaultProps).forEach(key => {
      if (props[key] == undefined) {
        props[key] = defaultProps[key];
      }
    });
  }
  return new Vnode(type, props, key, ref);
}

//利用递归将所有文字节点转化为Vnode
export function flattenChildren(children) {
  if (!Array.isArray(children)) {
    if (children === undefined) {
      return new Vnode("#text", "", null, null);
    } else if (testType(children) == 3 || testType(children) == 4) {
      return new Vnode("#text", children, null, null);
    }
    return children;
  }
  let isLastString = false;
  let content = "";
  let target = [];
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let type = testType(child);
    if (type == 3 || type == 4) {
      content += child;
      isLastString = true;
    } else {
      if (isLastString) {
        isLastString = false;
        target.push(content);
        content = "";
      }
      if (type == 7) {
        child.forEach(val => {
          target.push(val);
        });
      } else {
        target.push(child);
      }
    }
    if (i == children.length - 1) {
      target.push(content);
    }
  }
  return target.map(item => {
    return flattenChildren(item);
  });
}
