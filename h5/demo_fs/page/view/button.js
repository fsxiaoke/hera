Page({
  ontap: function (e) {
    console.log('tap')

    wx.navigateTo({
      url: './button2',
      success: result => {},
      fail: () => {},
      complete: () => {}
    })
  }
})
