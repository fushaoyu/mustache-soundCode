/**
 *
 *
 * @export
 * @param {*} tokens
 * @returns
 * 
 * 让tokens数组变为dom字符串
 */

import lookUp from "./lookUp"
export default function renderTemplate(tokens, data) {
    var resultStr = "";
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token[0] == "text") {
            resultStr += token[1]
        } else if (token[0] == "name") {
            resultStr += lookUp(data, token[1])
        } else if (token[0] == "#") {
            resultStr += parseArray(token, data)
        }
    }
    return resultStr
}

// 处理数组，结合renderTemplata实现递归
function parseArray (token,data) {
    //拿到数据结构中对应的内容  如：(拿到数组中arr的内容)
    var v = lookUp(data,token[1]);
    //结果字符串
    var result = ""
    //遍历v数组，v一定是数组
    //注意，下面这个循环是整个包中最难思考的一个循环
    //它是遍历数据，而不是遍历tokens，数组中的数据有几条就遍历几次
    for (let i = 0; i < v.length; i++) {
        //这里要补一个’.‘属性,为了让模板循环的时候.属性有匹配的字段
        result += renderTemplate(token[2],{
            ...v[i],
            ".":v[i]
        });
    }
    return result
}