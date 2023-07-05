// 封装Ajax请求
/* 
1. 
*/
import config from './config'

export default (url,data={},method='get')=> {
	return new Promise((resolve,reject)=>{
		wx.request({
			url:config.host + url,
			method,
			data,
			// header:{
			// 	// cookie:wx.getStorageSync('cookies')[0], 
			// },
			success:(res)=>{
				if(data.isLogin){//判断请求的参数中是否有登录请求标志
					console.log("res",res);
					wx.setStorage({
						key:'cookies', 
						data:res.cookies
					})
				}
				console.log("url",url);
					resolve(res.data)
			},
			fail:(err)=>{
					// console.log("请求失败",err);
					reject(err)
			}
		})
	})
		
}