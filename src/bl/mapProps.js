import { isEventName, isLowerEventName } from "./utils";

let mappingStrategy = {
  style: function(domNode, style) {
    if (style) {
      Object.keys(style).forEach(key => {
        domNode.style[key] = style[key];
      });
    }
  },
  event: function(domNode, eventName, callback) {
    let events = domNode.__events || {};
    events[eventName] = callback;
    domNode.__events = events;
    console.log("event",eventName,"!!!")
    addEvent(domNode,eventName, callback);
  },
  className: function(domNode, className) {
    if (className) {
      domNode.className = className;
    }
  }
};

/**
 * 获取注册了事件的路径
 * @param {*} event
 * @param {*} end
 */
function getEventPath(event, end) {
  let path = [],
    pathEnd = end || document;
  let begin = event.target;
  while (begin) {
    if (begin.__events) {
      path.push(begin);
    }
    if (begin == pathEnd) break;
    begin = begin.parentNode;
  }
  return path;
}

function dispatchEvent(event, eventName, end) {
  let path = getEventPath(event, end);
  triggerEventByPath(e, eventName, path);
}

/**
 * 按路径出发事件
 * @param {*} e
 * @param {*} eventName
 * @param {*} path
 */
function triggerEventByPath(e, eventName, path) {
  let E = Object.assign({}, e);
  path.forEach(item => {
    let callback = path[item].__events[eventName];
    E.currentTarget = path[item];
    if (typeof callback == "function") {
      callback.call(path[i], E);
    }
  });
}

/**
 * 针对不同浏览器添加事件
 * @param {*} domNode
 * @param {*} eventName
 * @param {*} callback
 */
function addEvent(domNode, eventName, callback) {
  if (domNode.addEventListener) {
    domNode.addEventListener(eventName, callback, false);
  } else if (domNode.attachEvent) {
    domNode.attachEvent("on" + eventName, callback);
  }
}

/**
 * 将props对应到props上
 * @param {*} domNode
 * @param {*} props
 */
export function mapProps(domNode, props) {
  for (let key in props) {
    if (key == "children") continue;
    if (isEventName(key)) {
      let eventName = key.slice(2).toLowerCase();
      mappingStrategy.event(domNode, eventName, props[key]);
      console.log("addEvent",eventName)
    } else if(typeof mappingStrategy[key]=="function"){
      mappingStrategy[key](domNode, props[key]);
    }
  }
}
