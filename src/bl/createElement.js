import { update } from "./render";
import { testType, options } from "./utils";

class Vnode {
  constructor(type, props, key, ref) {
    this.type = type;
    this.props = props;
    this.key = key;
    this.ref = ref;
  }
}

export const Com = {
  CREATE: 0, //创造未挂载
  MOUNT: 1, //已挂在
  UPDATING: 2, //正在更新
  MOUNTING: 3, //
  UPDATED: 4
};

export class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
    this.nextState = null;
    this.lefeCycle = Com.CREATE;
    this._renderCallback = [];
    this.stateMergeQueue = [];
  }
  shouldComponentUpdate() {
    return true;
  }
  componentWillReceiveProps() {}
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidUnmount() {}

  updateComponent() {
    let preState = this.state;
    this.state = this.nextState;
    let oldVnode = this.Vnode;
    let newVnode = this.render();
    if (this.nextState != preState) {
      this.state = this.nextState;
    }
    //let newVnode = this.render();
    if (this.componentWillUpdate) {
      this.componentWillUpdate(this.props, this.nextState);
    }
   // console.log(oldVnode,"$$$$$$$$$$$$$",newVnode)
    this.Vnode = update(oldVnode, newVnode,oldVnode._hostNode);
    if (this.componentDidUpdate) {
      this.componentDidUpdate(this.props, preState);
    }
  }

  _updateInLifeCycle(){
    if(this.stateMergeQueue.length){
      console.log("在DidMount中调用setState")
      this.nextState = {...this.state};
      this.stateMergeQueue = [];
      this.updateComponent();
    }
  }

  setState(nextState, callback) {
    this.nextState = { ...this.state, ...nextState };
    if (this.shouldComponentUpdate) {
      // console.log("I have a should")
      if (!this.shouldComponentUpdate(this.props, this.nextState)) {
        this.state = this.nextState;
        this.nextState = null;
        return;
      }
    }
    let oldNode = this.Vnode;
    let newNode = this.render();
    // console.log(this.props)
   // console.log(oldNode,"setState",newNode)
    if (this.lefeCycle == Com.CREATE) {
    } else {
      //在ComponentWillMount中调用
      if (this.lefeCycle == Com.MOUNTING) {
        this.state = Object.assign({}, this.state, nextState);
        this.stateMergeQueue.push(1);
      //  console.log("在ComponentWillMount中调用#############")
        return;
      }
      //异步调用，即在事件中调用
      if (options.async) {
        let dirtry = options.dirtryComponent[this];
        if(!dirtry){
          options.dirtryComponent[this] = this;
        }
      } else {
        this.updateComponent();
      }
    }
  }

  render() {}
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
