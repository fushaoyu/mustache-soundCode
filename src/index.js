import parseTemplateToTokens from "./parseTemplateToTokens";
import renderTemplate from "./renderTemplate"

//提供全局的方法
window.SetTemplate = {
    rander(template, data) {

        var mm = {
            a: {
                b: {
                    c: 100
                }
            }
        }
        //调用parseTemplateToTokens方法，让模板字符串能够变为tokens数组
        var tokens = parseTemplateToTokens(template);
        //调用renderTemplate函数，让tokens数组变为dom字符串
        var domStr = renderTemplate(tokens, data)
        return domStr
        console.log(domStr)
    }
}