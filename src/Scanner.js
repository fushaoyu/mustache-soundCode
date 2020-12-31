//扫描器类
export default class Scanner {
    constructor(template) {
        this.template = template;
        //指针
        this.pos = 0;
        //尾巴，一开始就是模板字符串原文
        this.tail = template;
    }
    //功能弱，就是走过指定内容，没有返回值 
    scan(tag) {
        if (this.tail.indexOf(tag) == 0) {
            //tag有多长，比如{{ 长度是2，就让指针后移多少位
            this.pos += tag.length;
            //对模板字符重新赋值
            this.tail = this.template.substring(this.pos)
        }
    }
    //让指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前的所有字符
    scanUtil(stopTag) {
        
        //记录字符最开始的位子
        const pos_backup = this.pos;
        //console.log(pos_backup,this.pos)
        //查找如果没有找到对应的字符就继续找
        //这里写并且是因为，上面的方法跳过了指定字符，所以这里可能会永远找不到指定的字符会造成死循环所以得加。 
        while (this.eos() && this.tail.indexOf(stopTag) != 0) {
            //因为前面肯定没有符合的字符所以指针加一，忽略之前的字符
            this.pos++
            //对模板字符重新赋值
            this.tail = this.template.substring(this.pos)
        }
        
        //返回查找到匹配字符之前的多有字符
        return this.template.substring(pos_backup, this.pos)
    }

    eos() {
        return this.pos < this.template.length
    }
}