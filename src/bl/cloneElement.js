import { createElement } from "./createElement";

export function cloneElement(vNode,props){
    let config,children;
    for(let i in vNode.props){
        if(i=="children"){
            children = vNode.props.children;
            continue;
        }
        config[i]=vNode.props[i];
    }
    config = {...config,...props};
    let newref = props.ref?props.ref:vNode.ref;
    let newkey = props.key?props.key:vNode.key;
    config.key = newkey;
    config.ref = newref;
    return createElement(vNode.type,config,children);
}