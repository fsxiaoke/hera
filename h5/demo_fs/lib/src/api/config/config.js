class Config {
  init () {
    return this.getHost().then(() => {
      return this.getCookies()
    })
  }

  getHost () {
    return new Promise(resolve => {
      wx.getHost({
        success (res) {
          this.host = res.url || ''
          resolve(res.url)
        }
      })
    })
  }

  getCookies () {
    return new Promise(resolve => {
      wx.getCookies({
        success (res) {
          this.cookies = res.cookies || ''
          resolve(res.cookies)
        }
      })
    })
  }
}

export default new Config()
