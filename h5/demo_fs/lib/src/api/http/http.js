import config from '../config/index'
import { isNeedApiPrefix } from '../utils.js'

class Http {
  get (params) {
    params.method = 'GET'
    this.request(params)
  }

  post (params) {
    params.method = 'POST'
    this.request(params)
  }
  request (params) {
    const _params = JSON.parse(JSON.stringify(params))
    if (isNeedApiPrefix(_params.url)) {
      _params.url = `${config.host}${_params.url}`
    }
    _params.header = {
      'accept-language': this.getAcceptLang(),
      cookie: config.cookie,
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      ...(_params.header || {})
    }

    wx.request(_params)
  }

  getAcceptLang () {
    let locale = config.locale
    switch (locale) {
      case 'zh-CN':
        return 'zh-CN,zh-TW;0.9,en;0.8'
        break
      case 'en':
        return 'en,zh-CN;0.9,zh-TW;0.8'
        break
      case 'zh-TW':
        return 'zh-TW,zh-CN;0.9,en;0.8'
        break
      default:
        return 'zh-CN,zh-TW;0.9,en;0.8'
    }
  }
}

export default new Http()
