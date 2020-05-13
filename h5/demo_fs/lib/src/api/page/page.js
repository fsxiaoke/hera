class Page {
  onAppGetPageData (fn) {
    wx.onAppGetPageData(fn)
  }

  setPageData (params) {
    wx.setPageData(params)
  }
}

export default new Page()
