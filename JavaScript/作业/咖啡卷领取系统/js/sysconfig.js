
const sysAxios = axios.create({
  baseURL: 'http://192.168.17.152:8080'
});

// 配置一个响应拦截器、处理接口返回的数据
sysAxios.interceptors.response.use(function(response) {
	return response.data ;
}, async function(error) {
	if (error.response !=null && error.response.status === 418) {
		// 1. 清除掉 访问令牌 
		sessionStorage.removeItem("ACCESS_TOKEN") ; 
		console.log(error.response.config);
		if (error.response.config.headers["Authorization"]) {
			// 2. 获取新令牌
			let token = await getAccessToken()
			error.response.config.headers["Authorization"] = "Bearer " + token ;
		}
		// 2. 再次 调用 该请求
		return sysAxios.request(error.response.config);
	}
	throw error ;
});

/**
 * 异步函数
 * 		在 函数前面 添加一个关键 字 async 、 标记该函数是一个异步函数
 * 
 * 		在 函数中 使用 await 关键字 等待 异步操作的结果
 * 
 *  异步函数返回的结果是 Promise对象 。
 */

async function getAccessToken() {
	let token = sessionStorage.getItem("ACCESS_TOKEN") ;
	// 如果 token 不为 空，则直接返回 
	if (token != null) return token ; 
	
	// 如果 token 为空， 则 调用 接口 ，通过 刷新令牌获取 访问令牌
	let refreshToken = localStorage.getItem("REFRESH_TOKEN"); 
	
	// 如果 refreshToken 没值，
	if (refreshToken == null) {
		// 如果 刷新令牌也没有数据、则直接跳转到登录
		return Promise.reject("no-login");
	}
	// 如果有刷新令牌 ，则 根据 刷新 令牌 换取令牌 
	// await 会阻塞 程序的执行，直到 异步请求返回结果
	let ret = await sysAxios.put("/api/token", {refresh: refreshToken}, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
	
	if (ret.status) {
		sessionStorage.setItem("ACCESS_TOKEN", ret.data.accessToken);
		localStorage.setItem("REFRESH_TOKEN", ret.data.refreshToken);
		return ret.data.accessToken ;
	}
	
	return Promise.reject("no-login");
}


// 对调用的接口 进行 统一管理 
const API = {
	/** 注册 */
	register(data) {
		return sysAxios.post("/register", data);
	},
	/** 登录 */
	login(data) {
		return sysAxios.post("/api/token", data, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		})
	},
	
	async getTeachers() {
		let token = await getAccessToken() ;
		return sysAxios.get("/teacher/list", {
			headers: {
				Authorization: "Bearer " + token ,
			}
		});
	},
	
	async applyCoffee(data) {
		let token = await getAccessToken() ;
		return sysAxios.post("/student/apply", data, {
			headers: {
				Authorization: "Bearer " + token ,
			}
		});
	},

	async getCoffeeList() {
		let token = await getAccessToken() ;
		return sysAxios.get("/student/coffeelist", {
			headers: {
				Authorization: "Bearer " + token ,
			}
		});
	},

	async getAllNoVertifyCoffeeList(){
		let token = await getAccessToken() ;
		return sysAxios.get("/teacher/coffee/verify", {
			headers: {
				Authorization: "Bearer " + token ,
			}
		});
	},

	async getAllMyCoffee(data){
		let token = await getAccessToken() ;
		return sysAxios.get(`/student/coffeelist?state=${data}`, {
			headers: {
				Authorization: "Bearer " + token ,
			}
		});
	},


	async getCoffeeApplyDetail(cid){
		let token = await getAccessToken() ;
		return sysAxios.get(`/teacher/coffee/detail/${cid}`, {
			headers: {
				Authorization: "Bearer " + token ,
			}
		});
	},

	async vertifyCoffee(data){
		let token = await getAccessToken() ;
		return sysAxios.put(`/teacher/coffee/verify/${data.cid}-${data.agree}`, null,{
			headers: {
				Authorization: "Bearer " + token ,
			}
		});
	},

	async cancelCoffeeOrder(cid){
		let token = await getAccessToken() ;
		return sysAxios.delete(`/teacher/coffee/cancel/${cid}`, {
			headers: {
				Authorization: "Bearer " + token ,
			}
		});
	},

	async getCoffeeOrderDetail(cid){
		let token = await getAccessToken() ;
		return sysAxios.post(`/teacher/coffee/cancel/${cid}`, {
			headers: {
				Authorization: "Bearer " + token ,
			}
		});
	},
}



