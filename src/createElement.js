class Vnode {
  constructor(type, props, key, ref) {
    this.type = type;
    this.props = props;
    this.key = key;
    this.ref = ref;
  }
}

class Component{
    constructor(props){
        this.props=props;
        this.state=this.state||{};
        this.nextState = null;
    }

    setState(nextState){

    }

    render(){

    }
}

function createElement(type, config, ...children) {
    if(!type) return;
    let props={},key,ref;
    if(config){
        key=config.key===undefined?null:config.key;
        ref=config.ref===undefined?null:config.ref;
        for(let i in config){
            if(i=="key"||i=="ref") continue;
            if(config.hasOwnProperty(i)){
                props[i]=config[i];
            }
         
        }
    }
    if(children.length==1){
        props.children=children[0]
    }else if(children.length>1){
        props.children=children;
    }
    return new Vnode(type,props,key,ref)
}

export const React={
    createElement,
    Component
};
