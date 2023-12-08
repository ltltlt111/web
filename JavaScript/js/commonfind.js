/**
 * 给元素对象扩展方法
 * 
 * 1，parents()：用来获取指定元素的所有父级元素
 * 
 * 2，prevAll()：获取指定元素前面的所有兄弟
 * 
 * 3，nextAll()：获取指定元素后面的所有兄弟
 * 
 * 4，siblings()：获取指定元素前后的所有兄弟
 * 
 * 5，css()：
 *      如果传入一个参数且是字符串类型，代表获取css指定的样式值
 *          例如css("color")，返回一个#999
 *      如果传入两个参数，代表修改指定的两个样式
 *          例如css("color","#000") 则等价于style.color = "#000"
 *      如果传入一个参数且是对象类型，则支持批量设置样式
 *          例如css({fontSize:"20px","color":"red"}) 相当于给标签添加字体大小为20px，且颜色为红色
 */

Element.prototype.parents = function(){
    // 获取所有的父元素
    let ret = [];
    let node = this;
    while((node = node.parentElement) != null){
        ret.push(node);
    }
    return ret;
}

Element.prototype.prevAll = function(){
    let ret = [];
    let node = this;
    while((node = node.previousElementSibling) != null){
        ret.push(node);
    }
    return ret;
} 

Element.prototype.nextAll = function(){
    let ret = [];
    let node = this;
    while((node = node.nextElementSibling) != null){
        ret.push(node);
    }
    return ret;
}

Element.prototype.siblings = function(){
    return [...this.prevAll().reverse(), ...this.nextAll()]
}


Element.prototype.css = function(property, value){
    // 如果传入一个参数
    if (arguments.length == 1 && typeof property == 'string') {
        return this.style[property]
    }

    // 如果传入了两个参数
    if (arguments.length == 2 && typeof property === 'string'){
        this.style[property] = value;
        return this;
    }

    // 传入了一个对象
    if (arguments.length == 1 && typeof property === 'object') {
        for (let prop in property) {
            this.style[prop] = property[prop];
        }
        return this;
    }

}

// 添加cookie
const Cookies = {
    // 添加cookie
    add(name, value, {domain, path, maxAge, expires} = {}){
        domain = domain ?? location.hostname;
        let ret = `${name}=${value}; domain=${domain}`;
        if(path != null){
            ret += "; path=" + path;
        }
        if(maxAge != null && /^\d+$/.test(maxAge+"")){
            ret += "; max-age=" + maxAge;
        }
        if(expires != null && expires.constructor === Date){
            ret += "; expires=" + expires;
        }

        document.cookie = ret;
    },

    get(name){
        let array = document.cookie.split(/;\s+/);
        let arr = array.map(entry => entry.split("="))
            .find(([key, val]) => key === name);
        return arr != null ? arr[1] : null;
    },

    remove(name){
        document.cookie = `${name}=;max-age=0`
    }
}
