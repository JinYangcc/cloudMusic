// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },
  //登录
  async login() {
    let {
      phone,
      password
    } = this.data;
    if (!phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'error'
      })
      return;
    }
    let phonerelu = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    if (!phonerelu.test(phone)) {
      wx.showToast({
        title: '手机号有误',
        icon: 'error'
      })
      return;
    }
    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: "error"
      })
      return;
    }
    let result = await request('/login/cellphone', {
      phone,
      password
    })
    if (result.data.code != 200) {
      console.log(result)
      let msg = result.data.message
      wx.showToast({
        title: `${msg}`,
        icon: 'error'
      })
    } else {
      wx.setStorageSync('userInfo', JSON.stringify(result.data.profile))
      wx.setStorageSync('cookies', result.data.cookie)
      wx.setStorageSync('uid', result.data.profile.userId)
      wx.reLaunch({
        url: '/pages/mine/mine',
      })
    }
    this.setData({
      phone: '',
      password: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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