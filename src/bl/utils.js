//用于测试数据类型
export function testType(value){
    const typeMap = {
        "[object Null]":0,
        "[object Undefined]":1,
        "[object Boolean]":2,
        "[object Number]":3,
        "[object String]":4,
        "[object Function]": 5,
        "[object Symbol]": 6,
        "[object Array]": 7
    }
    return typeMap[Object.prototype.toString.call(value)]||8;
}

export function toArray(value){
    if(!Array.isArray(value)) return [value]
    else return value
}