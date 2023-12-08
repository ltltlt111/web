
/**
 * 支持的日期格式化格式
 * %Y：年
 * %m：月
 * %d：日
 * %H：时
 * %M：分
 * %S：秒
 * %s：毫秒(自己定义)
 * %e：星期
 * 
 * 
 * YYYY：年
 * MM：月
 * dd：日
 * HH：时
 * mm：分
 * ss：秒
 * SSS：毫秒
 * E：星期
 */
Date.prototype.format = function (pattern){
    let year = this.getFullYear();
    let month = (this.getMonth() + 1 + "").padStart(2,"0");
    let day = (this.getDate()+"").padStart(2,"0");
    let hour = (this.getHours()+"").padStart(2,"0");
    let min = (this.getMinutes()+"").padStart(2,"0");
    let sec = (this.getSeconds()+"").padStart(2,"0");
    let mill = (this.getMilliseconds()+"").padStart(3,"0");
    let week = ["日","一","二","三","四","五","六"][this.getDay()];


    return pattern.replace("%Y", year).replace("YYYY",year).replace("%m",month).replace("MM",month).replace("%d", day)
    .replace("dd",day).replace("%H", hour).replace("HH",hour).replace("%M",min).replace("mm",min).replace("%S", sec).replace("ss",sec)
    .replace("%s",mill).replace("SSS",mill).replace("%e",week).replace("E",week)
}