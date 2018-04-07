import { Com } from "./createElement";
import { update } from "./vdom";
import { options } from "./utils";

/**
 * 定义React.Component 类
 * 参数有两个，props和context 
 */
export class Component {
  //创建组件时进行一系列初始化，此外新创建组件的生命状态为Com.create
  constructor(props, context) {
    this.props = props;
    this.state = this.state || {};
    this.nextState = null;
    this.context = context;
    this.lefeCycle = Com.CREATE;
    this._renderCallback = [];
    this.stateMergeQueue = [];
    this.refs = {};
  }
//   shouldComponentUpdate() {
//     return true;
//   }
  componentWillReceiveProps() {}
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidUnmount() {}

  /**
   * 本函数用于在setState后触发组件的实质性更新
   */
  updateComponent() {
    let preState = this.state;
    let oldVnode = this.Vnode;
    let oldContext = this.context;
    let newVnode = this.render();
    this.state = this.nextState;
    if (this.nextState != preState) {
      this.state = this.nextState;
    }
    //处理context
    if (this.getChildContext) {
      this.context = Object.assign({}, this.context, this.getChildContext());
    }
    //let newVnode = this.render();
    
    //处理生命周期
    if (this.componentWillUpdate) {
      this.componentWillUpdate(this.props, this.nextState, this.context);
    }
    // console.log(oldVnode,"$$$$$$$$$$$$$",newVnode)
    // console.log(this.context,"context!!!")
    
    //进行实质性更新
    this.Vnode = update(oldVnode, newVnode, oldVnode._hostNode, this.context);
    //处理生命周期
    if (this.componentDidUpdate) {
      this.componentDidUpdate(this.props, preState, oldContext);
    }
  }

  /**
   * 在vdom中调用，
   */
  _updateInLifeCycle() {
    //   console.log("我被调用", this.lefeCycle);
    if (this.stateMergeQueue.length) {
      //   console.log("在DidMount中调用setState");
      this.nextState = { ...this.state };
      this.stateMergeQueue = [];
      this.updateComponent();
    }
  }
  /**
   * 本函数用于触发组件更新
   * @param {*} nextState 下一个状态（只需要写入需更新的部分即可）
   * @param {*} callback   完成setState后的回调函数
   */
  setState(nextState, callback) {
    this.nextState = { ...this.state, ...nextState };
    //判断组件是否存在shouldComponentUpdate
    if (this.shouldComponentUpdate) {
      // console.log("I have a should")
      if (
        !this.shouldComponentUpdate(this.props, this.nextState, this.context)
      ) {
        //若返回值为false，则完成数据更新，但不渲染出来
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
        if (!dirtry) {
          options.dirtryComponent[this] = this;
        }
      } else {
        //如果为正常情况，直接更新即可
        this.updateComponent();
      }
    }
  }
  /**
   * 本函数留待组件重写，但为了避免调用undefined出错，写一个空函数在这里
   */
  render() {}
}
