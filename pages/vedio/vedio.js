// pages/vedio/vedio.js
import request from '../../utils/request'
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		videoGroupList:[],
		cnt:0,//控制当前选中的nav
		navId:'',
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		// console.log("进入视频页");
	this.getVideoGroupListData()
	// console.log(7777);
	},


	// 获取导航栏数据
	async getVideoGroupListData(){
		let videoGroupListData=await request('video/group/list');
		this.setData({
			videoGroupList:videoGroupListData.data.slice(0,14),
			navId:videoGroupListData.data[0].id,
		})
		this.getVideoGroupData(this.data.navId);
	},
	clickNav(ev){
		// console.log(ev);
		 this.setData({
			navId:+ev.currentTarget.id
		 })
	},
 async	getVideoGroupData(navId){
			let vedioListData=await request('video/group',{id:navId});
			console.log("vedioListData",vedioListData);
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