// pages/login/login.js
import request from '../../utils/request'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		phone:'',
		password:'',
		loginImg:'',
		key:'',//二维码登录的唯一标识
		// timer:null,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
   async onLoad(options) {
	   let timestamp=new Date().getTime();
		let res=await request('login/qr/key',{timestamp},
		'get')
		// console.log("res",res);
		if(res.code==200){
			this.setData({
				key:res.data.unikey
			})
			console.log("key",this.data.key,res.data.unikey);
		  let imgInfo=await request("login/qr/create",{key:this.data.key,timestamp:new Date().getTime(),noCookie:true},'get')
		  this.setData({
			  loginImg:imgInfo.data.qrurl
		  })
		//   this.checkLoginStatus();
		}
			if(wx.getStorageSync('userInfo')&& JSON.parse(wx.getStorageSync('userInfo')).userId){
				wx.reLaunch({
					url: '/pages/personal/personal',
				})
			}

	},
	 checkLoginStatus(){
		 let timer;
		 let timestamp=new Date().getTime()
		 timer=setInterval(async()=>{
			let status=await request("login/qr/check",{key:this.data.key,timestamp},'get')
			if(status.code==800){
				alert("二维码过期")
				clearInterval(timer)
			}
		    if(status.code==803){
				clearInterval(timer)
				wx.reLaunch({
					url: '/pages/personal/personal',
				})
			}
		   console.log("status",status);
		   },3100)
	
	},
	handleInput(){
		// console.log("phone",this.data.phone);
	},
async	login(){
		let {phone,password}=this.data;
		if(!phone){
			wx.showToast({
				title: '电话号码不能为空',
				icon:'error'
			})
			return
		}
		let phoneReg=/^1[3-9]\d{9}$/;
		if(!phoneReg.test(phone)){
			wx.showToast({
				title: '电话号码格式错误',
				icon:'error'
			})
			return 
		}
		if(!password){
			wx.showToast({
				title: '密码不能为空',
				icon:'error'
			})
			return
		}
		//本来是	let res=await request('login/phonecell',{phone,password},'get')
		let res=await request('user/detail',{uid:8620327026,isLogin:true},'get')
		// console.log("res",res);
		if(res.code==200 ||res.code==-462){
			wx.showToast({
				title: '验证通过',
				icon:'success'
			})
			// console.log("jinru");
			wx.setStorageSync('userInfo',JSON.stringify(res.profile))
			wx.reLaunch({
				url: '/pages/personal/personal',
			})
		}else if(res.code==400){
			wx.showToast({
				title: '手机号错误',
				icon:'error'
			})
		}else if(res.code>=500){
			wx.showToast({
				title: '密码错误',
				icon:'error'
			})
		}else{
			wx.showToast({
				title: '手机号或密码错误',
				icon:'error'
			})
		}
		
	
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})