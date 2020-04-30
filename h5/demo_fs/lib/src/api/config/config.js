class Config {
  init () {
    return this.getHost().then(() => {
      return this.getCookie().then(() => {
        return this.getCurrentLang()
      })
    })
  }

  getHost () {
    return new Promise(resolve => {
      var self = this
      wx.getHost({
        success (res) {
          self.host = res.url || ''
          resolve(res.url)
        }
      })
    })
  }

  getCookie () {
    return new Promise(resolve => {
      var self = this
      wx.getCookie({
        success (res) {
          self.cookie = res.cookie || ''
          resolve(res.cookie)
        }
      })
    })
  }

  getCurrentLang () {
    return new Promise(resolve => {
      var self = this
      wx.getCurrentLang({
        success (res) {
          self.locale = res.locale || ''
          resolve(res.locale)
        }
      })
    })
  }
}

export default new Config()
