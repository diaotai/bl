import { testType } from "./utils";

/**
 * vdom的最基本单位
 */
class Vnode {
  constructor(type, props, key, ref) {
    this.type = type;
    this.props = props;
    this.key = key;
    this.ref = ref;
  }
}

/**
 * 一个组件的不同生命状态
 */
export const Com = {
  CREATE: 0, //创造未挂载
  MOUNT: 1, //已挂在
  UPDATING: 2, //正在更新
  MOUNTING: 3, //
  UPDATED: 4
};

const RESERVED_PROPS = {
  ref: true,
  key: true
};

/**
 * bl的入口函数，当一个babel遇到一个jsx，会直接调用React.createElement
 * @param {*} type  这个jsx是什么类型
 * @param {*} config 包括除children的所有属性
 * @param {*} children 子元素
 */
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
      if (RESERVED_PROPS.hasOwnProperty(i)) continue;
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
  // console.log(ref)
  return new Vnode(type, props, key, ref);
}

/**
 * 利用递归将所有文字节点转化为Vnode
 * @param {*} children
 */
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
        target.push(child);
      } else {
        target.push(child);
      }
    }
    if (i == children.length - 1) {
      if (content) target.push(content);
    }
  }
  // console.log(target)
  let result = [];
  target.forEach((item, index) => {
    if (Array.isArray(item)) {
      item.forEach(item => {
        result.push(item);
      });
    } else {
      result.push(flattenChildren(item));
    }
  });
  return result;
}
