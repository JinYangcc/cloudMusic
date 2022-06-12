// pages/video/video.js

import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [], //视频标签列表
    navId: '', //标签的id
    videoList: [], //视频列表
    cookie: '',
    isTrigger: false,
  },
  //获取视频标签数据
  async getGroupList() {
    let result = await request('/video/group/list')
    let videoGroupList = result.data.data.splice(0, 10)
    let cookie = encodeURIComponent(wx.getStorageSync('cookies'))
    this.setData({
      videoGroupList,
      navId: videoGroupList[0].id,
      cookie
    })
    this.getVideoList(this.data.navId, cookie)
  },
  //点击添加下划线
  navActive(event) {
    let navId = event.currentTarget.id
    console.log(navId)
    this.setData({
      navId: navId * 1
    })
    //正在加载提示框
    wx.showLoading({
      title: '加载中',
    })
    let cookie = encodeURIComponent(wx.getStorageSync('cookies'))
    this.setData({
      cookie
    })
    this.getVideoList(navId, cookie)
  },
  //获取视频列表数据
  async getVideoList(navId, cookie) {
    let result = await request('/video/group', {
      id: navId,
      cookie: cookie
    })
    let index = 0
    if (cookie) {
      let videoList = result.data.datas.map(item => {
        item.id = index
        index++
        return item
      })
      this.setData({
        videoList: videoList,
        isTrigger: false
      })
      wx.hideLoading()
    }
  },
  //去视频详情页播放视频
  async goVideo(event) {
    let id = event.currentTarget.id
    let result = await request('/video/url', {
      id
    })
    let videoUrl = result.data.urls[0].url
    wx.setStorageSync('video', videoUrl)
    wx.navigateTo({
      url: '/pages/playVideo/playVideo',
    })
  },
  //下拉刷新
  errerere() {
    this.getVideoList(this.data.navId, this.data.cookie)
  },
  goSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getGroupList();
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