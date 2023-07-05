// pages/index/index.js
import request from '../../utils/request'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: {

		},
		bannerList: [],//轮播图
		recommendList: [],//推荐歌单
		topList: [],//排行版数据
	},
	getInfo() {
		//官网的api，可以进去直接Ctrl+F搜索关键字
		wx.getUserProfile({
			desc: '获取用户信息',
			success: (res) => {
				this.setData({
					//需要在data中定义一个userInfo空对象用来接收信息        
					userInfo: res.userInfo
				})
				console.log(res);
				// console.log(userInfo);
			},
			fail: (res) => {
				console.log('222', res)
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	async onLoad(options) {
		let bannerData = await request("banner", { type: 2 }, 'get')
		// console.log("拿到了",bannerData);
		this.setData({
			bannerList: bannerData.banners
		})
		//获取推荐歌单数据
		let recommendData = await request("personalized", { limit: 10 });
		this.setData({
			recommendList: recommendData.result
		})
		//获取排行版数据
		let index = 0;
		let resultArr = []
		// while(index<5){
		// let topListData=await request('top/list',{idx:index++});
		let topListData = await request('related/playlist', { id: 1 });

		// console.log("topListData",topListData);
		for (let i = 0; i < topListData.playlists.length; i++) {
			let tracks = await request("playlist/detail", { id: topListData.playlists[i].id }, 'get');
			let itemTracks = tracks.playlist.subscribers
			// console.log("itemTracks",itemTracks);
			let topListItem = { name: topListData.playlists[i].name, tracks: itemTracks }
			//tracks:topListData.playlist.tracks.slice(0,3)
			resultArr.push(topListItem)
			this.setData({
				topList: resultArr
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