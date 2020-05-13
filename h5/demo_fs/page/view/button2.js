Page({
  ontap: function (e) {
    console.log('tap')

    wx.navigateTo({
      url: './view',
      success: result => {},
      fail: () => {},
      complete: () => {}
    })
  }
})
