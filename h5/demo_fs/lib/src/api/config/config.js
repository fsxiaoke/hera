class Config {
  init () {
    return this.getFsInfo().then(() => {
      return this.getSystemInfo()
    })
  }

  getFsInfo () {
    return new Promise(resolve => {
      var self = this
      wx.getFsInfo({
        success (res) {
          self.fsInfo = res || ''
          resolve(res)
        }
      })
    })
  }

  getSystemInfo () {
    return new Promise(resolve => {
      var self = this
      wx.getSystemInfo({
        success (res) {
          self.systemInfo = res || ''
          resolve(res)
        }
      })
    })
  }
}

export default new Config()
