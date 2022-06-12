//封装request 发送请求

export default (url, data = {}, method = 'get', header = {
  'content-type': 'application/json'
}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://cloud-music.pl-fe.cn' + url,
      data,
      method,
      header,
      success: (result) => {
        console.log('请求成功', result)
        resolve(result)
      },
      fail: (error) => {
        console.log('请求失败', error)
        reject(error)
      }
    })
  })
}