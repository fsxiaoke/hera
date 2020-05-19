// 1-15 绑定AppEnterForeground与AppEnterBackground

import pubsub from './bridge'
import EventEmitter2 from './EventEmitter2'
import configFlags from './configFlags'
import utils from './utils'

var eventEmitter = new EventEmitter2()
pubsub.onMethod('onAppEnterForeground', function () {
  var params =
    arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
  eventEmitter.emit('onAppEnterForeground', params)
})
pubsub.onMethod('onAppEnterBackground', function () {
  var params =
    arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
  eventEmitter.emit('onAppEnterBackground', params)
})
pubsub.onMethod('onAppRunningStatusChange', function () {
  var params =
    arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
  utils.defaultRunningStatus = params.status
  eventEmitter.emit('onAppRunningStatusChange', params)
})

pubsub.onMethod(
  'onAppGetPageEvent', // 用于页面间传递数据
  function () {
    var params =
      arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
    eventEmitter.emit('onAppGetPageEvent', params)
  }
)

var onAppEnterForeground = function (fn) {
  var self = this
  typeof fn === 'function' && setTimeout(fn, 0)
  eventEmitter.on('onAppEnterForeground', function (params) {
    pubsub.publish('onAppEnterForeground', params),
      (self.appStatus = configFlags.AppStatus.FORE_GROUND),
      typeof fn === 'function' && fn(params)
  })
}

var onAppEnterBackground = function (fn) {
  var self = this
  eventEmitter.on('onAppEnterBackground', function (params) {
    params = params || {}
    pubsub.publish('onAppEnterBackground', params)
    params.mode === 'hide'
      ? (self.appStatus = configFlags.AppStatus.LOCK)
      : (self.appStatus = configFlags.AppStatus.BACK_GROUND),
      params.mode === 'close'
        ? (self.hanged = !1)
        : params.mode === 'hang' && (self.hanged = !0),
      typeof fn === 'function' && fn(params)
  })
}
var onAppRunningStatusChange = function (fn) {
  eventEmitter.on('onAppRunningStatusChange', function (params) {
    typeof fn === 'function' && fn(params)
  })
}

var onAppGetPageEvent = function (fn) {
  eventEmitter.on('onAppGetPageEvent', function (params) {
    typeof fn === 'function' && fn(params)
  })
}

export default {
  onAppEnterForeground: onAppEnterForeground,
  onAppEnterBackground: onAppEnterBackground,
  onAppRunningStatusChange: onAppRunningStatusChange,
  onAppGetPageEvent: onAppGetPageEvent
}
