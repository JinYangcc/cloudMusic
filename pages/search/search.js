// pages/search/search.js
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    SearchHotList: [],
    placeholder: '',
    searchValue: '',
    searchList: [],
    historyList: [],
  },
  //获取热搜榜单
  async getSearchHotList() {
    let result = await request('/search/hot/detail')
    this.setData({
      SearchHotList: result.data.data,
      placeholder: result.data.data[0].searchWord
    })

  },
  //搜索  表单内容发生变化回调
  async searchMusic(event) {
    if (event.detail.value == '') {
      this.setData({
        searchValue: '',
      })
    } else {
      let {
        historyList,
        searchValue
      } = this.data
      this.setData({
        searchValue: event.detail.value.trim()
      })
      let historyItem = historyList
      if(searchValue==''){
        return
      }
      historyItem.unshift(searchValue)
      this.setData({
        historyList: historyItem
      })
      let result = await request('/search', {
        keywords: this.data.searchValue,
        limit: 10
      })
      this.setData({
        searchList: result.data.result.songs
      })
    }
  },
  //清除输入框内容
  clearSearchInput() {
    this.setData({
      searchValue: '',
      searchList: []
    })
  },
  //清空历史记录
  clearHistory(){
    this.setData({
      historyList:[]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSearchHotList()
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