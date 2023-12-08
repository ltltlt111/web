# 请求方式

- GET：适用于查询
- POST：适用于数据提交，一般是新增数据常用POST
- PUT：通常用于数据更新操作，适用于整条数据的更新
- DELETE：适用于数据的删除
- PATCH：和PUT一样适用于数据的更新，适用于部分更新


## axios的调用方式

- request请求是一个万能请求，可以发送任意类型的请求
```
axios.request(options)
```
> options是一个对象

- get请求

```
axios.get(url, options)
```

- post请求

```
axios.post(url, data, options)
```

- put请求

```
axios.put(url, data, options)
```

- delete请求

```
axios.delete(url, options)
```


### options中常用的属性

- url：设置请求地址
- method：设置请求方式，默认为get
- params：给get请求的网址设置查询参数
- data：设置除get请求之外的其他请求需要的参数
- headers：设置请求头信息，axios默认的提交方式是"application/json"
- responseType：响应数据的格式，默认为json
- timeout：接口超时时间，单位是毫秒，默认为0，代表不限制时间
- withCredentials：是否允许携带Cookie，默认不允许


