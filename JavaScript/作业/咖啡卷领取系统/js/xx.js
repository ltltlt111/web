/**
 *  如果要实现 自动表单校验，那么 用户 必须 给 表单对象 提供一个  rules 属性、该属性用户指定表单的校验规则 
 *   	校验属性 指的是 标签中的 prop 属性值
 * 
 *   所有需要 进行 数据校验的 表单元素 都必须 添加 prop 属性 , 如果是 单选/复选框 则必须将  prop 添加到他们的父元素上！
 * 
 *  rules 规则 如下:
 * 
	form.rules =  {
		username: [
			{ required: true , message: "" },
			{minlength : 6 ,  message: "" },
			{
				trigger: "change" , 
				validator:  function(val) {
					// 返回 true / false
				},
				message: "",
			}
		], 
	}
	如果 是 type=submit 提交表单，则直接调用 即可完成数据校验
		form.validate(function(data) {
			
			form.submit();
		})
	如果 是 普通按钮 提交表单，则直接调用 下面代码 即可完成数据校验
		<input type="button" class="hare-submit" value="注册" />
		form.validate(".hare-submit" , function(data) {
			// 
			form.submit();
		})
 */

(function(){
    const AUTO_FORM_VALIDATION_FIELDS = [
        {name: "required" ,  defaultMessage: "值不允许为空" },
        {name: "maxlength" , defaultMessage: "值长度过大" },
        {name: "minlength" , defaultMessage: "值长度过短" },
        {name: "min" ,  defaultMessage: "数字太小"},
        {name: "max" , defaultMessage: "数字太大" },
        {name: "pattern" , defaultMessage: "格式不正确"},
        {name: "validator" , defaultMessage: "自定义校验失败"}
    ]
    
    
    
    // 给 表单对象 扩展一个 validate 方法、用来 实现 submit按钮的 自动校验表单的功能 
    
    HTMLFormElement.prototype.validate = function(btnCss, callback) {
        // 禁用 H5 自带 校验风格 
        this.noValidate = true ; 
        let that = this ;
        // 通过 rules 规则中的  trigger 给 表单元素绑定对应的事件。
        for(let [key, rule] of Object.entries(this.rules)) {
            //根据规则找到 trigger
            let obj = rule.find(r => r.trigger != null) ;
            let eventName = obj != null ? obj.trigger : "change" ;
            // 根据 key 找表单元素 ，准备绑定事件
            this.querySelector(`[prop=${key}]`).addEventListener(eventName, function(event) {
                checkProp(that, rule, this);
            })
        }
        
        // 如果 函数 有且只有一个参数 
        if (arguments.length === 1 && btnCss.constructor === Function) {
            callback = btnCss ; // 将 btnCss的值赋值给 callback
            // 给 form 表单绑定 submit 事件、在 表单提交数据前 校验数据
            this.addEventListener("submit", function(event) {
                checkFormData(event, this, callback);
            });
        }
        
        if (arguments.length == 2 && typeof btnCss === "string") {
            this.querySelector(btnCss).addEventListener("click", function(event) {
                checkFormData(event, that, callback);
            });
        }
        
    }
    
    
     function checkFormData(event, form,  callback) {
        // 阻止表单的默认提交 
        event.preventDefault(); 
        // 获取 所有 拥有 prop 属性的元素 
        let validateProps = form.querySelectorAll(`[prop]`) ;
        let checkStatus = true ; // 校验成功
        // 遍历所有要校验的属性
        for (let propTag of validateProps) {
            let key = propTag.getAttribute("prop") ;
            // 提取 需要校验的属性 拥有的校验规则 
            let rule = form.rules[key] ;
            
            if (!checkProp(form, rule, propTag)) {
                checkStatus = false ;
                continue ;
            }
        }
        // 在整个校验结束 后，如果 checkStatus 值 仍旧 为true， 则代表 整个表单校验成功、没有任何错误
        if (checkStatus) {
            // 获取表单要提交的所有的数据 
            let data = getFormData(form)
            callback(data);
        }
    }
    
    function getFormData(form) {
      // 获取表单中的所有元素
      let formData = new FormData(form) ;
      
      let obj = {} ;
      
      for(let [key , val] of formData.entries()) {
          if (obj[key] != null) {
             let v = obj[key] ;
             if (v.constructor != Array) {
                 let array = [v, val] ;
                 obj[key] = array ;
             }else{
                 obj[key].push(val);
             }
          }else{
              obj[key] = val ;
          }
      }
      return obj ;
    }
    
    
    
    
    /**
     *从 rule 或者 tag 中 提取 对应的校验规则 
     * @param {Object} ruleName (字符串)
     * @param {Object} rule (数组)
     * @param {Object} tag
     */
    function getRule(ruleName, rule, tag) {
        rule = rule ?? [] ;
        // 从 rule 中 提取 ruleName 
        let ruleObj = rule.find(r => Object.keys(r).includes(ruleName)) ;
        
        // 如果 找到的 单个匹配规则 没有消息 ，取默认该规则的消息
        if (ruleObj != null && ruleObj.message == null) {
            ruleObj.message = AUTO_FORM_VALIDATION_FIELDS.find(r => r.name == ruleName)["defaultMessage"]; 
        }
        // 如果 没有找到 该规则， 则尝试从 标签上获取
        if (ruleObj == null && ruleName != "validator" && ruleName != "pattern") {
            let val = tag.getAttribute(ruleName) ;
            // 如果 标签上找到了该规则，则 获取该规则。
            if (val != null) {
                ruleObj = { 
                    [ruleName]: val=="" ? true: val , 
                    message: AUTO_FORM_VALIDATION_FIELDS.find(r => r.name == ruleName)["defaultMessage"]
                }
            }
        }
        return ruleObj ;
    }
    
    
    
    
    function checkProp(formTag ,rule, propTag) {
        
        let requiredObj = getRule("required", rule, propTag);
        let patternObj = getRule("pattern", rule, propTag); 
        
        let maxlengthObj = getRule("maxlength", rule, propTag);
        let minlengthObj = getRule("minlength", rule, propTag);
        let minObj = getRule("min", rule, propTag);
        let maxObj = getRule("max", rule, propTag); 
        
        // 获取 validator 规则 
        let validatorObj = getRule("validator", rule, propTag); 
        
        // 判断 当前 标签是否是 radio 或者 复选框, 如果是 单选/复选，那么  prop 绑定到了父元素上。
        if (!["input", "select", "textarea"].includes(propTag.nodeName.toLowerCase())) {
            let node = propTag.querySelectorAll(`input:checked`);
            if (node.length == 0 && requiredObj != null && requiredObj.required) {
                showErrorTipMessage(formTag, propTag, requiredObj.message) ;
                return false ;
            }
            return true ;
        }
        
        // 获取表单元素对应的值
        let val = propTag.value.trim() ;
        
        if (requiredObj != null && requiredObj.required && val === "") {
            // 进行 友好提示 
            showErrorTipMessage(formTag, propTag, requiredObj.message) ;
            return false ;
        }
        
        // 使用正则 校验 该值 
        if (patternObj !=null && !patternObj.pattern.test(val)) {
            showErrorTipMessage(formTag, propTag, patternObj.message) ;
            return false ;
        }
        
        // 校验 最大长度 
        if (maxlengthObj !=null && val.length > maxlengthObj.maxlength) {
            showErrorTipMessage(formTag, propTag, maxlengthObj.message) ;
            return false ;
        }
        // 校验 最小长度
        if (minlengthObj !=null && val.length < minlengthObj.minlength) {
            showErrorTipMessage(formTag, propTag, minlengthObj.message) ;
            return false ;
        }
        // 校验数字
        if ((maxObj !=null || minObj != null ) && isNaN(val)) {
            showErrorTipMessage(formTag, propTag, "值不是一个数字") ;
            return false ;
        }
        // 校验最大值
        if (maxObj !=null && val > maxObj.max) {
            showErrorTipMessage(formTag, propTag, maxObj.message) ;
            return false ;
        }	
        // 校验最小值
        if (minObj !=null && val.length < minObj.min) {
            showErrorTipMessage(formTag, propTag, minObj.message) ;
            return false ;
        }
        
        if (validatorObj != null) {
            if (!validatorObj.validator(val)) {
                showErrorTipMessage(formTag, propTag, validatorObj.message) ;
                return false ;
            }
        }
        return true ;
    }
    
    
    
    /**
     * 进行 校验失败提示的方法 
     * @param {Object} formTag
     * @param {Object} currentTag
     * @param {Object} message
     */
    function showErrorTipMessage(formTag, currentTag , message) {
        console.log(currentTag, message);
        alert(message);
    }
})()
        
        