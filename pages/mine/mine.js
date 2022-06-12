// pages/mine/mine.js
import request from '../../utils/request'
let startY = 0
let moveY = 0
let resultY = 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: "translateY(0)",
    coverTransition: "",
    userInfo: {}
  },
  //登录
  login() {
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      wx.showModal({
        content: '退出登录',
        async success(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            let result = await request('/logout')
            if (result.data.code == 200) {
              wx.clearStorageSync()
            }
            wx.reLaunch({
              url: '/pages/mine/mine',
            })
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    }
  },
  //转到最近播放页面
  toRecord() {
    wx.navigateTo({
      url: '/pages/record/record',
    })
  },
  handleTouchStart(events) {
    startY = events.touches[0].clientY,
      this.setData({
        coverTransition: '',
      })
  },
  handleTouchMove(events) {
    moveY = events.touches[0].clientY
    resultY = moveY - startY
    this.setData({
      coverTransform: `translateY(${resultY}rpx)`,
    })
    console.log(resultY)
  },
  handleTouchEnd(events) {
    this.setData({
      coverTransform: "translateY(0)",
      coverTransition: "transform 1s linear"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo)
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