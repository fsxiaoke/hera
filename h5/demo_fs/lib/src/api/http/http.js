import config from '../config/index'
import { isNeedApiPrefix, uuid } from '../utils.js'

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
    const _params = params
    _params.url = this.changeUpEaUrl(_params.url) // 上游企业改变url
    if (isNeedApiPrefix(_params.url)) {
      _params.url = `${config.fsInfo.host}${_params.url}`
      _params.url = `${_params.url}/${config.systemInfo.platform}.${config
        .fsInfo.versionCode}?_pid=${uuid()}&traceId=E-${config.fsInfo
        .enterpriseAccount}.${config.fsInfo.employeeID}-${uuid()}&_vn=${config
        .fsInfo.versionCode}&versionName=${config.fsInfo
        .versionName}&_postid=${uuid()}`
    }
    _params.header = {
      'accept-language': this.getAcceptLang(),
      cookie: this.getCookie(),
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      ...(_params.header || {})
    }

    wx.request(_params)
  }

  getCookie () {
    var cookie = config.fsInfo.cookie
    if (config.fsInfo.upEaInfo && config.fsInfo.upEaInfo.isUpEa) {
      var upCookie = config.fsInfo.upEaInfo.cookie
      cookie = cookie + upCookie
    }
    return cookie
  }

  changeUpEaUrl (url) {
    if (config.fsInfo.upEaInfo && config.fsInfo.upEaInfo.isUpEa) {
      return url.replace('/EM1', '/EM6')
    }
    return url
  }

  getAcceptLang () {
    let locale = config.fsInfo.language
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
