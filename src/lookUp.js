/**
 *
 *   功能是可以在dataObj对象中，寻找用连续点符号的keyName属性
 *  比如，dataObj是
 *  {
        a:{
            b:{
                c:100
            }
        }
    }
    那么lookUp(dataObj,"a.b.c")结果就是100
 */
export default function lookUp(dataObj, keyName) {
    //console.log(dataObj, keyName);
    if (keyName !== "." && keyName.indexOf(".") > -1) {
        var keys = keyName.split(".");
        //设置一个临时变量，这个临时变量用于周转，一层层找下去
        var temp = dataObj;
        for (let i = 0; i < keys.length; i++) {
            console.log(keys)
            //每次替换成找到的对象
            temp = temp[keys[i]]
        }
        return temp
    }
    //如果没有点符号
    return dataObj[keyName]

}