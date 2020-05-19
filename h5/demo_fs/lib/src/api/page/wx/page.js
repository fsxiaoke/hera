import pageEvent from '../pageEvent'

class Page {
  addPageEvent (event, data) {
    pageEvent.on(event, data)
  }

  firePageEvent (event, data) {
    if (event) {
      pageEvent.emit(event, data)
    }
  }
}

export default new Page()
