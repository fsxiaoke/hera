import pageEvent from '../pageEvent'

class Page {
  constructor () {
    wx.onAppGetPageEvent(function (params) {
      if (params) {
        if (params.event) {
          pageEvent.emit(params.event, params.data)
        }
      }
    })
  }

  addPageEvent (event, fn) {
    pageEvent.on(event, fn)
  }

  firePageEvent (event, data) {
    wx.firePageEvent({
      event: event,
      data: data
    })
  }
}

export default new Page()
