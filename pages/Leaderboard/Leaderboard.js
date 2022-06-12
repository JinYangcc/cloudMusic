// pages/Leaderboard/Leaderboard.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    LeaderboardList: [],
  },
//得到排行榜页面的数据
  async getLeaderboardList() {
    let result = await request('/toplist/detail')
    let LeaderboardList = result.data.list.splice(0, 4)
    this.setData({
      LeaderboardList
    })
    // console.log(result)
  },
  //去排行榜里的详情页
  goMusic(event) {
    let id = event.currentTarget.id
    console.log(id)
    wx.setStorageSync('gedanid', id)
    wx.navigateTo({
      url: '/pages/music/music',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getLeaderboardList()
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