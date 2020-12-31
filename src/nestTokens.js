/*
    这个模块是来把数据整理成多维数组
**/

export default function nestTokens(tokens) {
    //结果数组
    var nestTokens = [];
    //栈结构，存放小tokens，栈顶（靠近端口的，最先进入）的tokens数组中当前操作的这个tokens小数组
    var sections = [];
    //收集器，初始化收集nestTokens结果数组，引用类型值，所以指向的是同一个数组
    //这个东西利用了引用数据类型的特性改变collector指针指向之后在去改变它的内容，不影响之前的内容，这样它的赋值对象也同时会被改变
    var collector = nestTokens;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        //console.log(token);
        switch (token[0]) {
            case "#":
                collector.push(token)
                sections.push(token)
                collector = token[2] = []  //注意这个地方  collector的指针变了
                break;
            case "/":
                var sections_pop = sections.pop() // pop() 来删除数组的最后一个元素   (这里本来数组内有2条内容删除一条，现在只有一条了)
                //sections[sections.length - 1][2] 意思是回到上一级的地方
                collector = sections.length > 0 ? sections[sections.length - 1][2] : nestTokens;
                break;
            default:
                collector.push(token)
                break;
        }
    }
    return nestTokens
}