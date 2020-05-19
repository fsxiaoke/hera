import api from '../../lib/src/api/index'

Page({
  ontap: function (e) {
    console.log('tap')

    wx.navigateTo({
      url: './button2',
      success: result => {},
      fail: () => {},
      complete: () => {}
    })
  },

  onLoad: function (options) {
    api.page.addPageEvent('event1', this.onAppGetPageEvent)
  },

  onAppGetPageEvent: function (params) {
    wx.showToast({
      title: JSON.stringify(params)
    })
  }
})
