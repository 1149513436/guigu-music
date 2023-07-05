// pages/personal/personal.js
import request from '../../utils/request'
let startY=0;//页面手指移动的距离
let moveY=0;//
let distance=0;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		coverTransform:'translateY(0)',
		coverTransition:'',
		userInfo:{},//用户信息
		rencentPlayList:[],//用户最近播放
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		let userInfo=JSON.parse(wx.getStorageSync('userInfo')) ;
		this.setData({
			userInfo
		})
		//获取用户播放记录
		this.getUserRecentPlayList(this.data.userInfo.userId)
	},
	//在未登录的状态点击头像跳转到登录界面
	toLogin(){
		wx.navigateTo({
			url: '/pages/personal/personal.wxml',
		})
	},
	handleTouchStart(event){
	this.setData({
		coverTransition:''
	})
			startY=event.touches[0].clientY;
	},
	handleTouchMove(event){
			moveY=event.touches[0].clientY;
			distance=moveY-startY;
			if(distance<=0){
				return;
			}else{
				if(distance>=80){
					distance=80;
				}
				this.setData({
					coverTransform:`translateY(${distance}rpx)`
				})
			}
		
	},
	handleTouchEnd(){
			this.setData({
				coverTransform:`translateY(0rpx)`,
				coverTransition:`transform 1s linear`
			})
	},

	/* 获取用户最近播放记录 */
 async	getUserRecentPlayList(userId){
		let rencentPlayListData=await request('user/record',{uid:userId,type:0})
		console.log("rencentPlayListData",rencentPlayListData);
		let rencentPlayList=rencentPlayListData.allData.splice(0,10).map((item,index)=>{
				item.id=index++;
				return item;
		})
		this.setData({
			rencentPlayList
		})
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