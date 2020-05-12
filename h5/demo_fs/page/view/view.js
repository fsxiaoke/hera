import api from '../../lib/src/api/index'

Page({
  onHttp: function (event) {
    var self = this
    api.http.post({
      url: '/FHE/EM1ANCRM/API/v1/object/object_ti13X__c/controller/NewDetail',
      data: {
        describeVersionMap: { object_ti13X__c: 210 },
        objectDataId: '5ea807346d3c320001d9d437',
        objectDescribeApiName: 'object_ti13X__c'
      },
      success: function (result) {
        self.setData({ text: `statusCode:${result.statusCode}` })
        // wx.showToast({
        //   title: '请求成功' + JSON.stringify(result),
        //   icon: 'success',
        //   mask: true,
        //   duration: 2000
        // })

        console.log('request success', result)
      },

      fail: function ({ errMsg }) {
        wx.showToast({
          title: '请求失败' + errMsg,
          icon: 'fail',
          mask: true,
          duration: 2000
        })
        console.log('request fail', errMsg)
      }
    })
  },

  navigateBack1: function (event) {
    wx.navigateBack({ delta: 1 })
  },
  navigateBack2: function (event) {
    wx.navigateBack({ delta: 2 })
    api.page.setPageData({ xxx: 'vvvvvvvvvvvvvv' })
  },
  data: {
    text: 'This is page data.'
  },
  onLoad: function (options) {
    // Do some initialize when page load.
  },
  onShow: function () {
    // Do something when page show.
  },
  onReady: function () {
    // var self = this
    // self.setData({ text: JSON.stringify(api.config.fsInfo)+"\n"+JSON.stringify(api.config.systemInfo) })
    // Do something when page ready.
  },
  onHide: function () {
    // Do something when page hide.
  },
  onUnload: function () {
    // Do something when page close.
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
  },
  onPageScroll: function () {
    // Do something when page scroll
  },
  onResize: function () {
    // Do something when page resize
  },
  onTabItemTap (item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // Event handler.
  viewTap: function () {
    this.setData(
      {
        text: 'Set some data for updating view.'
      },
      function () {
        // this is setData callback
      }
    )
  },
  customData: {
    hi: 'MINA'
  }
})
