//用于测试数据类型
export function testType(value) {
  const typeMap = {
    "[object Null]": 0,
    "[object Undefined]": 1,
    "[object Boolean]": 2,
    "[object Number]": 3,
    "[object String]": 4,
    "[object Function]": 5,
    "[object Symbol]": 6,
    "[object Array]": 7
  };
  return typeMap[Object.prototype.toString.call(value)] || 8;
}

/**
 * 用于标志setState更新是否为异步，以及为异步时用dirtyComponents存储需要更新的组件
 */
export const options = {
  async: false,
  dirtyComponents: {}
};

/**
 * 本函数用于将一个元素转换为数组（若本身为数组，则直接返回）
 * @param {*} value 
 */
export function toArray(value) {
  if (!Array.isArray(value)) return [value];
  return value;
}

/**
 * 判断字符串是否为一个事件名
 * @param {*} eventName 
 */
export function isEventName(eventName) {
  return /^on[A-Z]/.test(eventName);
}

export function isLowerEventName(eventName) {
  return /^on[a-z]/.test(eventName);
}
