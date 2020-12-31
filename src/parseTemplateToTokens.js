import Scanner from "./Scanner";
import nestTokens from "./nestTokens"

/**
 * 
 * 将模板字符串变为tokens数组
 * 
 * */
export default function parseTemplateToTokens(template) {
    var tokens = [];
    //实例化一个扫描器，构造时提供一个参数，这个参数就是模板字符串
    //这个方法就只针对模板字符串工作
    var scanner = new Scanner(template);
    var text;
    while (scanner.eos()) {
        text = scanner.scanUtil("{{")
        if (text !== '') {
            tokens.push(['text', text.replace(/\s/g,"")])
        }

        scanner.scan("{{")

        text = scanner.scanUtil("}}")
        if (text !== '') {
            //这个text就是{{}}中间的东西，判断一下首字符
            if (text[0] === '#') {
                tokens.push(['#', text.substring(1)])
            } else if (text[0] === '/') {
                tokens.push(['/', text.substring(1)])
            } else {
                tokens.push(['name', text])
            }
        }

        scanner.scan("}}")
    }

    return nestTokens(tokens);
}