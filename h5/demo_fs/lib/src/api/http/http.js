const duration = 2000
// import config from '../config'
class Http {
  request (config) {
    wx.request({
      url: `https://httpbin.org/post`,
      method: 'POST',
      data: {
        noncestr: 'config.host'
      },
      success: function (result) {
        wx.showToast({
          title: '请求成功',
          icon: 'success',
          mask: true,
          duration: duration
        })

        console.log('request success', result)
      },

      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)
      }
    })
  }
}

export default new Http()
