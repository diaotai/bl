import { Com } from "./createElement";
import { update } from "./vdom";
import { options } from "./utils";

export class Component {
  constructor(props, context) {
    this.props = props;
    this.state = this.state || {};
    this.nextState = null;
    this.context = context;
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
    let oldVnode = this.Vnode;
    let oldContext = this.context;
    let newVnode = this.render();
    this.state = this.nextState;
    if (this.nextState != preState) {
      this.state = this.nextState;
    }
    if (this.getChildContext) {
      this.context = Object.assign({}, this.context, this.getChildContext());
    }
    //let newVnode = this.render();
    if (this.componentWillUpdate) {
      this.componentWillUpdate(this.props, this.nextState, this.context);
    }
    // console.log(oldVnode,"$$$$$$$$$$$$$",newVnode)
    // console.log(this.context,"context!!!")
    this.Vnode = update(oldVnode, newVnode, oldVnode._hostNode, this.context);
    if (this.componentDidUpdate) {
      this.componentDidUpdate(this.props, preState, oldContext);
    }
  }

  _updateInLifeCycle() {
    //   console.log("我被调用", this.lefeCycle);
    if (this.stateMergeQueue.length) {
      //   console.log("在DidMount中调用setState");
      this.nextState = { ...this.state };
      this.stateMergeQueue = [];
      this.updateComponent();
    }
  }

  setState(nextState, callback) {
    this.nextState = { ...this.state, ...nextState };
    if (this.shouldComponentUpdate) {
      // console.log("I have a should")
      if (
        !this.shouldComponentUpdate(this.props, this.nextState, this.context)
      ) {
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
        this.updateComponent();
      }
    }
  }

  render() {}
}
