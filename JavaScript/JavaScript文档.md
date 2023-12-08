# JavaScript简介

- 可以给网页实现交互行为，让网页拥有人机交互能力
- js是一门脚本编程语言，是一门弱类型语言。主要服务于浏览器
- js和python，Java一样都是面向对象的高级语言

## JavaScript引入方式
- 1，行内引入(不推荐)
> 在标签上通过特殊属性例如 a 标签的 href 属性或者事件属性编写JavaScript代码
```
    <!-- alert会阻塞程序的运行 -->
    <a href="javascript:alert('hello world')">点我1</a>
    <a onclick="alert('hello js')" >点我2</a>
    <!-- ondblclick:双击 -->
    <a ondblclick="alert('hello js')" >点我3</a>
```

- 2，内联引入
> 在网页中，通过`script`标签定义要编写的js代码的块
```
    <script type="text/javascript" >
        alert("hello world")
    </script>
```
**type 用来设置脚本类型，默认值为 text/javascript**
**script标签允许出现在网页的任何位置，但是推荐写在 head 中，经常写在尾部**

- 3，外联引入(最推荐)
> 将 js 代码写在一个后缀名为 .js 的文件中，通过`script`标签的 src 属性引入外部脚本文件

```
    <script src="./js/test1.js"></script>
```
**如果script标签设置了src属性，那么script标签体中不能写任何js代码**



## JS中的注释方式：

- 单行注释：`//`(定义上)
- 多行注释：`/* ... */`(定义上)
- 文档注释：`/** ... */`(声明上)

## 输出方式
```
console.log(a);：输出
console.info(a);：输出
console.error(a);：打印错误日志信息
console.dir(a);：自省

```

## JS变量的声明方式

> 变量的声明方式一：关键字`var`
- var在 script 脚本上下文声明的变量默认是全局变量，在 函数/类中声明的变量默认是局部变量
- 全局变量会自动成为window对象的属性
```
    <script>
        // 声明变量a
        var a;
        // 同时声明两个变量a,b
        var a,b;
        // 给变量赋值
        a = 6;
        var a = 10;
        var a = 20;
        // 同时给多个变量定义赋值
        var a =3,b=4,c;
        // 在控制台输出a
        console.log(a,b,c);
        console.log(window.a,window.b,window.c);
    </script>
```

> 变量的声明方式二：关键字`let`
```
    <script>
        let a = 10;
        console.log(a);
    </script>
```

> 常量声明方式：关键字`const`
```
    <script>
    // 常量一旦确定不可更改
        const PI =3.14;
        console.log(PI);
    </script>
```

### let 和 var 的区别
- 1，var存在变量提升现象，let不存在变量提升现象
```
    <script>
        console.log(a);  // 输出undefined
        var a = 100;     // 此时上面也不会报错(变量提升:先使用再声明)
        console.log(a);
    </script>
```

- 2，var可以多次声明同一个变量，而let不允许多次声明
```
    <script>
        var a = 3;
        var a ;
        console.log(a);  // 3
        
        let b = 3;
        let b = 4; // 抛出错误 
        console.log(b);  
    </script>
```

- 3，let存在暂时性死区现象
```
    <script>
        let a = 3;
        if (a >= 3){
            a = 10;   // 程序报错，let a = 10会导致锁死这个if语句中的代码，在let a = 10之前不允许使用a
            let a = 10;
            console.log(a);
        }
    </script>
```

4，var在scrip脚本上下文中是全局变量，在函数中也是局部变量，let声明的变量是局部变量，在
```
    <script>
        let a = 3;
        if (a >= 3){
            let b = 10; // let声明的b是一个局部变量局部变量作用范围是从声明开始到块结束
            console.log(b);
        }
        console.log(b);  // 会提示未定义
    </script>    
```

## 运算符

> 1，算术运算符：+，-，*，/，%

```
`/`表示除法求商，除数允许为0，在js中+0和-0有区别
```

> 2，位运算符：&(位与)，|(位或)，~(位非)，^(异或)

| 位于                        | 位或                            | 位非       | 异或                 |
| --------------------------- | ------------------------------- | ---------- | -------------------- |
| 相同位为1，结果为1，否则为0 | 相同位只要有1，结果为1，否则为0 | 1变0，0变1 | 同位相同为1，不同为0 |

> 3，位移运算符
- "<<"：左移运算符
- ">>"：右移运算符
- ">>>"：无符号右移位

> 4，关系运算符:>，>=,<,<=,==,!=,===,!==

```
js运算符不支持x < a < z 写法
```
**===用来比较内容和类型是否相等，主要用来比较基本数据类型(字符串，数字，布尔，空)**

> 5，逻辑运算符&&(逻辑与)，||(逻辑或)，!(逻辑非)

- &&：一假则假，存在短路问题，如果第一个表达式为假，则第二个表达式不参与运算
- ||：一真则真，存在短路现象，如果第一个表达式为真，则第二个表达式不参与运算
- !：非真则假，非假则真
- &：也可以做逻辑与，不会存在短路现象
- |：也可以做逻辑或，不会存在短路现象

> 6，三元运算符
```
python:exp1 if condition else exp2:
x = 3 if a > 10 else 4

javascript:condition ? expr1 : expr2
let x = a > 10 ? 3 : 4
```

> 7，赋值运算符：=，+=，-=，*=，/=，%=，^=，|=，&=，<<=，>>=，>>>=

```
a += b ===> a = a + b 但不等于 a = b + a
```

> 8，一元运算符
```
a++：先计算a++表达式的值。表达式的值等于a的值，再对a进行自增+1运算
++a：先对a进行自增+1运算，再计算++a表达式的值，表达式的值等于a的值
a--：先计算a--表达式的值。表达式的值等于a的值，再对a进行自减-1运算
--a：先对a进行自减-1运算，再计算--a表达式的值，表达式的值等于a的值
```

# 流程控制

- 判断
  - switch选择
  - if选择

- 循环

## 判断 - switch
> switch选择
```
switch(var|exp){
    case <val1>:
        code
    case <val1>:
        code
    ...
    default:
        code
}
```
- switch可以通过值的情况进行分支处理，值最大的特点是有限个，可枚举的。值得可能性不会太多
- switch有穿透效果，当某一个case满足条件后，会执行case中的代码，但是默认switch会穿透后面的剩余case
- 解决穿透：在某一个case后加入break

```
    <script>
        let month = 3;
        let maxDay = 0;
        switch(month){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                maxDay = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                maxDay = 30;
                break;
            case 2:
                maxDay = 29;
                break;
            default:
                maxDay = 0;
        }
    </script>
```

## 判断 -if
if 语法
```
if(条件){

}else if(条件){

}...
else{

}
```

## 循环 - for

```
for(初始化;条件;循环控制){
    // 循环体代码
}
```

> 循环初始值只会被执行一次，循环条件每次都会执行，循环控制在循环体代码执行完成后才会执行


## 循环 - while

```
while(循环条件){
    // 循环体代码
}
```

## 循环 - do ... while
```
de{
    循环体代码
}while(循环条件);
```
> do ... while无论循环条件是否成立，do代码块中的内容至少会执行一次


## 字符串常见操作

- 字符串的定义方式
  - 单引号:`'`
  - 双引号:`"`
  - 反逗号: `
    - 允许定义多行字符串
    - 支持字符串模板
    > 字符串模板是指允许在定义的字符串中使用${exp}的方式获取指定表达式的值，可以替代字符串的拼接

- 字符串的拼接"+"
- 字符串支持算数运算符的使用(除了`+`相当于拼接)
> 字符串和数字做算术运算，先将字符串转化为数字，如果无法转换则返回NaN

> NaN与任何数做运算都返回NaN

> 判断是否为NaN用isNaN,isNaN函数会将传入的内容转换为数字来判断

> Number.isNaN(x)：判断x是不是非数，但是该方法不会将传入的内容转换为数字，所以只有当传入的值是NaN时，才会返回true

- 字符串常见属性/方法
    - length：获取字符串长度
    - charAt(index)：获取指定索引位置字符，超出索引返回空字符串
    - chatCodeAt(index)：返回指定索引对应的字符码点，超出返回非数
    - at(index)：获取指定索引位置字符，超出索引返回undefined
    - codePointAt(index)：返回指定索引对应的字符码点，超出返回undefined
    - concat()：拼接字符串，效果类似于"+"
    - startswith()：判断字符串是否以指定字符串开头
    - endswith()：判断字符串是否以指定字符串结尾
    - includes()：判断字符串是否包含
    - indexOf()：查找指定字符串在字符串中第一次出现的索引位置
    - lastIndexOf():查找指定字符串在字符串中最后一次出现的索引位置
    - substr()：从字符串中提取指定起始位置和长度的子字符串。
    - substring()：从字符串中提取指定索引位置之间的子字符串。
    - repeat()：将字符串重复多少次
    - replace()：替换第一个
    - replaceAll()：替换所有
    - split()：切割字符串
    - padStart()
    - padEnd()
    - trim()：剔除左右空格
    - trimLeft()/trimStart()
    - trimRight()/trimeEnd()
    - toUpperCase()
    - toLowerCase()


## RegExp 正则表达式

> 正则表达式可以对字符串进行搜索查找替换提取等操作

- 字面量定义方式 `/regex/flag?`,以`/`开头，以`/`结尾
- 通过 RegExp 构建正则
```
let regex = new RegExp(regex, flag?)
```

### 正则表达式中常用方法

- test(str)：返回一个 boolean ,判断正则是否匹配字符串
- exec(str)：返回正则表达式匹配的结果

### 正则表达式 RegExp 类常用的静态属性

- $&：获取正则匹配的内容，该属性不能通过 . 访问，需要通过 RegExp["$&"]来获取
- $1~$9：获取正则匹配的对应分组内容

### 正则中的修饰符

- g：全局模式
- i：忽略大小写
- s：dotAll模式，小数点 匹配所有字符
- m：多行模式


## 数组

### 数组的定义方式

- 字面量定义方式

```
let array = []     // 定义一个空数组

let array = [1,2,3] // 定义一个内容为1，2，3的数组
```

- 使用new构建数组对象

```
let array = new Array();   // 定义一个空的数组

let array = new Array(10); // 定义一个长度为10的数组，内容均为undefined

let array = new Array(1,2,3); //定义一个内容为1，2，3的数组
```

### 数组的基本操作
- 获取数组中指定索引位置的元素

```
array[index]：获取指定位置的元素，索引不支持负值
```

- 修改数组中指定索引位置的元素

```
array[index] = 10
```

- 添加元素

```
array[index] = 10  // 不推荐，可能会导致索引不连续

array.push(x...);  // 向数组尾部添加元素,支持多个使用逗号分隔即可

array.unshift(x...);  //向数组头部添加元素,支持多个使用逗号分隔即可

array.splice(index,0,x...); // 向index索引位置添加元素
```

- 删除元素

```
array.splice(index,count); // 从index位置删除count个元素

array.pop(); // 删除尾部

array.shift(); //删除头部
```

### 数组中常见的方法

- concat()：合并数组，返回合并后的新数组
- fill(x)：给数组中内容进行填充
- includes(x)：判断x是否在数组中存在
- indexOf(x)：查看x在数组中第一次出现的索引位置，找不到返回-1
- lastIndexOf(x)：查看x在数组中最后一次出现的索引位置，找不到返回-1
- join(seperator)：将数组中的元素按照指定的seperator分隔符进行拼接成字符串
- sort(compareFn)：对数组中的元素进行排序

```
let array = [1,7,1,6,3,3,5,9]
array.sort(function(a,b){ return a - b }) // 升序排列
array.sort(function(a,b){ return b - a }) // 降序排列
```

- reverse()：反转数组中的元素
- slice(start,end)：切片

### 和遍历相关的方法

- keys()：获取数组索引组成的迭代器
- values()：获取数组组成的值的迭代器
- entries()：获取数组的键值对构成的迭代器

### 数组的遍历方式

- for...i遍历

```
for(let i = 0 ; i < array.length; i ++){
    console.log(array[i]);
}
```

- for...in 遍历

```
for(let index in array){
    console.log(array[index]);
}
```

- for...of遍历

```
for(let x of array){
    console.log(x);
}
```

- forEach 遍历

```
let array = [12,33,7,4]
array.forEach(val,index,arr)=>{
    console.log(val,index);
}
```

### 数组中的高阶方法

> 数组中的高阶函数除reduce外，函数的参数有三个，分别是元素，索引和数组本身

- find(fn)：根据指定的条件查找满足条件的第一个元素，找不到返回undefined

```
// 获取数组中第一个奇数元素
array.find(function(a){
    return a % 2 == 1
})

// 箭头函数是对函数的一种简写语法是：(参数列表) => {函数体}
// 如果有且只有一个参数则可以省略小括号
// 如果函数体有且只有一行代码可以省略大括号，当只有一行代码且包含return并省略了大括号，必须省略return关键字
array.find(a=> a % 2 == 1)
```
- findeIndex(fn)：根据指定的条件查找满足条件的第一个元素对应的索引，找不到返回undefined
```
array.findIndex(a=> a % 2 == 1)
```
- filter(fn)： 根据指定的条件获取满足条件的所有元素
```
array.filter(a=> a % 2 == 1)
```

- map(fn)：将数组中元素根据指定的规则映射为一个新数组

```
// 将数组中所有元素扩大三倍
array.map(a => a * 3)
```

- some(fn)：判断数组中是否有元素满足指定的条件

```
// 判断数组中是否有3的倍数的元素
array.some(a => a % 3 == 0)
```

- every(fn)：判断数组中是否所有元素都满足指定的条件
```
// 判断数组中是否每个元素都是3的倍数
array.some(a => a % 3 == 0)
``` 

- reduce(fn, init):统计数据

> fn 函数有两个参数
> 如果传入了init初始值，如果fn第一个参数 第一次执行的时候为init初始值，以后每一次执行的时候第一个参数为上一次函数返回的结果，如果没有传入init初始值，那么fn第一个参数第一次执行的时候代表数组中的第一个元素


> 如果传入了init初始值，那么fn第二个参数第一次执行的时候代表数组中的第一个元素，如果没有传入init，那么fn第二个参数第一次执行的时候代表数组中的第二个元素 

```
// 求数组中所有元素累加的值
array.reduce((a,b) => a+b)
array.reduce((a,b) => a+b, 0)

array.reduce((a,b)=>{
    return a;
},[0,0]);
```


### 数组的解构赋值

解构赋值：按照某种特定的规则，将 对象/数组 中的数据进行提取并赋值给指定的变量。这种手段被称为解构赋值。

规则：通过中括号语法对数组中的数据按照位置逐个进行解构

```
<script>
    let array = [23, 45, 657, 12 ,32, 8, 12];
    // // 获取数组中的第一个元素并赋值给a
    // let a = array[0]
    // // 获取数组中的第二个元素并赋值给b
    // let b = array[1]
    // // 获取数组中的剩余的元素并赋值给c
    // let c = array.slice(2)
    // console.log(a,b,c);

    // 获取数组中的第一个元素并赋值给a,获取数组中的第一个元素并赋值给a,获取数组中第三个并赋值给c
    let [a,b,c] = array
    console.log(a,b,c);

    // 第一个元素并赋值给a1，第二个元素并赋值给b1，剩余的元素并赋值给c1
    // ...接收剩余元素只能放到最后一个位置
    let[a1,b1,...c1] = array
    console.log(a1,b1,c1);

    // 获取数组中的第一个元素和第三个元素赋值给d和e
    let [d,,e] = array
    console.log(d,e);

    // 如果多了
    let array2 = [1,53,12];
    // 解构不到数值就是undefined
    let [f,g,h,i] = array2;
    console.log(f,g,h,i);

    // 结构赋值还可以给数据设置默认值（剩余参数不能加默认值，会解构成空数组）
    let [a2=1,b2=0,...c2] = []
    console.log(a2,b2,c2);

    let array3 = [3,null,20]
    let [a3,b3,c3] = array3
    // 也可以直接接受null或者undefined或0，底层是绝对相等'==='
    console.log(a3,b3,c3);

    // 对 entries中的键和值 进行解构赋值
    for (let [key,val] of array.entries()){
        console.log(key,val);
    }

    let array4 = [12,42,[32,44,1],23,7]
    // 使用解构赋值得到44
    let [,,[,r]] = array4
    console.log(r);
    
</script>
```

### 数组展开运算符:`...`
```
<script>
    let array1 = [1,2,3,4]
    let array2 = [34,25,3]

    // 将两个数组合并
    let array3 = array1.concat(array2)
    console.log(array1,array2,array3);

    // 数组展开运算符：`...`
    let array4 = [...array1,...array2]
    console.log(array4);

    // 效果一样
    array1.push(...array2)
    console.log(array1);
</script>
```

## 对象 Object

### 对象的定义方式

- 字面量定义方式

```
let obj = {}   //定义一个空对象

let obj = {name:"张三",age:18}
```

- 使用new构建对象

```
let obj = new Object();
obj.name = "张三"
```


### 对象的遍历方式

- for ... in 遍历

```
for (let key in obj){
    let val = obj[key]
    onsole.log(key, val);
    }
```

- 键遍历：Object.keys(obj)

```
for (let key of Object.keys(obj)) {
    console.log(key, obj[key]);
}

```

- 值遍历：Object.values(obj)

```
for(let val of Object.values(obj)){
    console.log(val)
}
```

- 键值对遍历:Object.entries(obj)

```
for(let [key, val] of Object.entries(obj)){
    console.log(key,val)
}
```

### 对象的常见操作

- Object.is()：作用基本等同于 === ,

```
+= === -0(true)
NaN === NaN(false)
Object.is(+0,-0)(false)
Object.is(NaN, NaN)(true)
```

- Object.assign(target,..source)：将多个对象(source)合并到target对象中，返回合并后的对象

- Object.freeze()：将一个对象进行冻结，作为只读操作

- Object.defineProperty(obj,property,description)：给对象动态添加属性的方法，可以对属性做更详细的控制

```
Object.defineProperty(obj,property,description)
    obj:要动态添加的对象
    propertyName:动态添加属性的名字，是一个字符串
    description:属性设置详情


    let obj1 = {name:"张三"};

    // 给obj1对象动态添加一个sex性别属性，且性别属性一旦设置不允许更改
    Object.defineProperty(obj1, "sex", {
        // writable:true,      // 是否允许修改
        // value:"男",         // 配合writable设置该属性默认值
        configurable:true,  // 是否允许删除
        enumerable:true,    // 控制属性是否可枚举
        set:function(val){
            this._sex = val;
        }, // 设置这个属性不能设置writable和value两个属性，否则会冲突
        get:function(){
            return this.val
        } // 与set一起使用
    })
    obj1.sex = "男"
    console.log(obj1);
```


### 对象的简写

> 当对象的键名和表示值的变量名相同的时候，可以省略：值

```
let name = "张三";
let sex = "男";

let obj = {name:name, sex:sex};

上述代码可以简写为 let obj = {name, sex}
```

### 函数的简写

```
let obj = {
    name:"张三",
    say: function(){
        console.log(this.name+"在说话");
    }
}

:function可以省略

let obj = {
    name:"张三",
    say(){
        console.log(this.name+"在说话");
    }
}
```


### 对象的解构赋值
对象解构规则：使用{}按照键名进行解构赋值

```
let obj = {name:"张三",age:20,tel:"224646611"}

// 声明了三个变量，分别是：name, a, phone
let {name:name, age:a, tel:phone} = obj;

// 可以简写为
let {name, age:a ,tel:phone} = obj;


<script>
    let obj = {name:"张三",sex:"男", age:20,tel:"224646611"}

    // // ...除解构出来之外的剩余所有
    // let {name,sex:s, ...x} = obj;
    // // 如果解构不到就是undefined
    // console.log(name,s,x);

    // 也可以设置默认值,解构值是undefined时，默认值才会生效
    let {name,age:a=18,...x} = obj
    console.log(name,a,x);
</script>


let obj = {name:"xxxx"}
let name;
{name} = obj    //此时会出错，大括号在js中有特殊含义
({name} = obj)  // 此时不会报错
```

### 属性名表达式

> 使用[key]语法动态操作对象中的属性
```
let x = "name"
obj[x] = xxx 
```
如何使用解构赋值获取数组中的第一个和最后一个元素
数组也是对象，可以按照对象的解构规则来结构数组
```
array = [1,5,3,2]
let {0:a,1:b,2:c,3:d,length:len} = array
console.log(a,b,c,d,len)
```


### 对象展开运算符 `...`

```
// 对象展开操作
let obj2 = {name:"李四",sex:"男",tel:"224646611"}
let obj3 = {name:"张三",age:20,tel:[{"火警":"119"},{"救护车":"120"},{"公安":"110"}]}

let obj4 = {...obj2, obj3}
console.log(obj4);
```



## 函数 `function`

- 函数的定义方式

```
语法：
function 函数名(参数列表){
    函数体
}
```


### 箭头函数


