function jsoup(url, { method = "GET", headers={}, data = null, dataType = "json" } = {}) {
    // 1，创建XMLHttpRequest对象
    let xhr = new XMLHttpRequest();

    // 2，调用open方法发送请求
    xhr.open(method, url);

    // 3，设置请求头
    // Content-Type类型：
    // text/plain:纯文本发送
    // application/x-www.form-urlencoded:表单格式提交
    // application/json:以json格式提交数据
    // multipart/form-data:文件上传方式
    if (!Object.keys(headers).includes("Content-Type")) {
        headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    for (let [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
    }

    // 4，发送请求并提交数据
    xhr.send(data);


    return new Promise(function (resolve, reject) {
        // 5，监听客户端和服务器状态改变
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                // 获取响应结果
                if (dataType === "json") {
                    resolve(JSON.parse(xhr.responseText));
                } else if (dataType == "text" || dataType === "html") {
                    resolve(xhr.responseText);
                } else if (dataType == "xml") {
                    resolve(xhr.responseXML);
                }
                reject("返回类型暂不支持");
            } else if (xhr.readyState === 4) {
                if (dataType === "json") {
                    reject(JSON.parse(xhr.responseText))
                } else if (dataType == "text" || dataType === "html") {
                    reject(xhr.responseText);
                } else if (dataType == "xml") {
                    reject(xhr.responseXML);
                }
                reject("返回类型暂不支持");
            }
        }
    })

}