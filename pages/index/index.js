//引入请求函数
import request from '../../utils/request'


// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [], //轮播图数据
    personalizedList: [], //推荐歌单
    topList: [], //排行榜
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    //获取轮播图数据
    let bannerList = await request('/banner', {
      type: 2
    })
    this.setData({
      bannerList: bannerList.data.banners
    })
    //获取推荐歌单数据
    let personalized = await request('/personalized')
    this.setData({
      personalizedList: personalized.data.result
    })
    //获取排行榜数据
    let top = await request('/toplist/detail')
    this.setData({
      topList: top.data.list.splice(0,4)
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