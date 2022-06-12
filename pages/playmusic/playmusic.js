// pages/playmusic/playmusic.js
import request from '../../utils/request'
import PubSub from 'pubsub-js'
import moment from 'moment'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: true,
    musicInfo: {},
    musicId: '',
    musicUrl: '',
    nowTime: '',
    totalTime: '',
    barwidth: 200,
  },


  //点击播放与暂停
  play() {
    let isPlay = !this.data.isPlay
    //改变播放状态再发请求实现播放与暂停
    let {
      musicId,
      musicUrl
    } = this.data
    this.musicControl(isPlay, musicId, musicUrl)
  },

  //控制歌曲的播放与暂停
  async musicControl(isPlay, musicId, musicUrl) {
    if (isPlay) {
      //如果没有
      if (!musicUrl) {
        let cookie = wx.getStorageSync('cookies')
        let result = await request('/song/url', {
          id: musicId,
          cookie
        })
        let musicUrl = result.data.data[0].url
        this.setData({
          musicUrl
        })
      }
      this.playMusic.src = this.data.musicUrl
      this.playMusic.title = this.data.musicInfo.name
    } else {
      //暂停音乐
      this.playMusic.pause()
    }
  },
  //切换歌曲 上一曲下一曲
  handleSwitch(event) {
    let type = event.currentTarget.id
    //订阅消息
    PubSub.subscribe('musicId', (_, musicId) => {
      console.log(musicId)
      this.setData({
        musicId
      })
      this.getMusicInfo(musicId)
      //播放
      this.musicControl(this.data.isPlay, musicId)
      //取消订阅
      PubSub.unsubscribe('musicId')
    })
    //发布消息
    PubSub.publish('switchType', type)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id)
    let musicId = options.id
    this.setData({
      musicId
    })
    this.getMusicInfo(musicId)

    //进入自动播放
    this.musicControl(this.data.isPlay, this.data.musicId)
    //添加到this
    this.playMusic = wx.getBackgroundAudioManager()
    //监听音乐播放的状态
    this.playMusic.onPlay(() => {
      this.setData({
        isPlay: true
      })
    });
    this.playMusic.onPause(() => {
      this.setData({
        isPlay: false
      })
    })
    this.playMusic.onStop(() => {
      this.setData({
        isPlay: false
      })
    })
    //播放结束自动下一曲
    this.playMusic.onEnded(() => {
      //订阅消息
      PubSub.subscribe('musicId', (_, musicId) => {
        this.setData({
          musicId
        })
        this.getMusicInfo(musicId)
        //播放
        this.musicControl(this.data.isPlay, musicId)
        //取消订阅
        PubSub.unsubscribe('musicId')
      })
      //发布消息
      PubSub.publish('switchType', 'next')
      this.setData({
        barwidth: 0,
        nowTime:'00:00'
      })
    })
    //获取当前的播放时间
    this.playMusic.onTimeUpdate(() => {
      let nowTime = moment(this.playMusic.currentTime * 1000).format('mm:ss')
      //计算进度条的宽度
      let barwidth = this.playMusic.currentTime / this.playMusic.duration * 450
      this.setData({
        nowTime,
        barwidth
      })
    })

  },
  //获取歌曲详情
  async getMusicInfo(musicId) {
    //我也不知道这个有啥用encodeURIComponent
    let cookie = encodeURIComponent(wx.getStorageSync('cookies'))
    let result = await request('/song/detail', {
      ids: musicId,
      cookie
    })
    //总时间
    let totalTime = moment(result.data.songs[0].dt).format('mm:ss');
    this.setData({
      musicInfo: result.data.songs[0],
      totalTime
    })
    //设置title
    wx.setNavigationBarTitle({
      title: this.data.musicInfo.name
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