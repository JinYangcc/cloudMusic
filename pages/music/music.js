// pages/music/music.js
import request from '../../utils/request'
import PubSub from 'pubsub-js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList: [], //歌单详情的歌曲列表
    index: 0
  },
  //跳转到音乐播放页面
  goPlayMusic(event) {
    let {
      song,
      index
    } = event.currentTarget.dataset
    console.log(song)
    this.setData({
      index
    })
    wx.navigateTo({
      url: '/pages/playmusic/playmusic?id=' + song.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let gedanid = wx.getStorageSync('gedanid')
    let cookie = wx.getStorageSync('cookies')
    let result = await request('/playlist/detail', {
      id: gedanid,
      cookie
    })
    let musicList = result.data.playlist
    this.setData({
      musicList
    })
    //消息订阅
    PubSub.subscribe('switchType', (_, type) => {
      let {
        musicList,
        index
      } = this.data
      if (type === 'pre') {
        (index === 0) && (index = musicList.tracks.length)
        index -= 1;
      } else {
        (index === musicList.tracks.length - 1) && (index -= 1)
        index += 1
      }
      this.setData({
        index
      })
      let musicId = musicList.tracks[index].id

      //发布消息
      PubSub.publish('musicId', musicId)
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