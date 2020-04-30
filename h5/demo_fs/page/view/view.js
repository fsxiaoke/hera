import api from '../../lib/src/api/index'

Page({
  tapName: function (event) {
    api.http.post({
      url:
        '/FHE/EM1ANCRM/API/v1/object/object_ti13X__c/controller/NewDetail/Android.710000?_pid=bb7382e91aaa4c5e92f8999cdbb35c77&traceId=E-obj0509.1000-52783967e7f945449d6bc94045961811&_vn=710000&_ov=9&channelID=unknown&versionName=7.1.0&_postid=3cf180daa8324f87afd25d2ee95219f4',
      data: {
        describeVersionMap: { object_ti13X__c: 210 },
        objectDataId: '5ea807346d3c320001d9d437',
        objectDescribeApiName: 'object_ti13X__c'
      },
      success: function (result) {
        wx.showToast({
          title: '请求成功' + JSON.stringify(result),
          icon: 'success',
          mask: true,
          duration: 2000
        })

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
    var self = this
    self.setData({ text: api.config.host })
    // wx.getHost({
    //   success (res) {
    //     self.setData({ text: res.url })
    //   }
    // })

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
