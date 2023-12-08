const AUTO_FORM_VALIDATION_FIELDS = [
    {
        name:"required",
        defaultMessage:"值不能为空",
    },
    {
        name:"maxlength",
        defaultMessage:"值长度过大",
    },
    {
        name:"minlength",
        defaultMessage:"值长度过短",
    },
    {
        name:"min",
        defaultMessage:"数字太小",
    },
    {
        name:"max",
        defaultMessage:"数字太大",
    },
    {
        name:"pattern",
        defaultMessage:"格式不正确",
    },
]


/** 
 * 如果要实现自动表单校验，那么用户必须给表单对象提供一个rules属性，该属性用户指定表单的校验规则
 *      校验属性指的是标签中的prop属性值
 * 
 * 所有需要进行数据校验的表单元素都必须添加prop属性
 * rules 规则如下：
 *  rules:{
 *      username:[
 *              {
 *                  type:String,        // 值的类型必须是字符串格式
 *                  required:true,      // 代表是否必穿，该属性允许写在标签上
 *                  trigger:"input",    // 当初发input时间的时候进行数据校验。当不提供trigger，默认为change
 *                  minlength:6,        // 允许字符串最小长度为6
 *                  message:"",         // 校验失败的错误信息
 *              },
 *              {
 *                  trigger:"change",
 *                  validator:function(val){
 *                      // 自定义校验逻辑，如果校验成功不返回数据，如果校验失败返回错误提示信息
 *                  }
 *              }
 *        ]         
 *  }
 * 
 * 
 */

// 给表单对象扩展validate方法来实现submit按钮的自动校验表单的功能
HTMLFormElement.prototype.validate = function(callback){
    // 禁用H5自带校验风格
    this.noValidate = true;

    // 给form表单绑定submit事件，在表单提交数据前校验数据
    this.addEventListener("submit", function(event){
        // 阻止表单默认提交
        event.preventDefault();
        // 获取所有拥有prop属性的元素
        let validateProps = this.querySelector("[prop]");

        // 提取需要校验的属性拥有的校验规则
        Array.from(validateProps).forEach(propTag, index => {
            let key = propTag.getAttribute("prop");
            let rule = this.rules[key];
            let requiredObj = this.rules;
            if(rule != null){
                // 遍历rule获取 required规则
                let required = false;

                if(rule.find(r => r["required"])){

                }
                requiredObj["value"] = required["required"];
                requiredObj["message"] = required.message ?? AUTO_FORM_VALIDATION_FIELDS.find("required")["defaultMessage"];
            }else{
                if(propTag.required){
                    requiredObj["value"] = true;
                    requiredObj["message"] = AUTO_FORM_VALIDATION_FIELDS.find("required")["defaultMessage"];
                }
            }
        })
    })
}