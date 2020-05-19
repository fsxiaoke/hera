class PageEvent {
  constructor () {
    this._events = {}
  }

  on (type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function')
    }

    if (!this._events[type]) {
      this._events[type] = listener
    } else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]]
      }

      this._events[type].push(listener)
    }

    return this
  }

  emit (type, data) {
    var handler = this._events[type]
    if (typeof handler === 'function') {
      handler.call(this, data)
      return true
    }

    if (handler && handler.length) {
      for (i = 0, l = handler.length; i < l; i++) {
        handler[i].call(this, data)
      }
      return true
    }
    return false
  }
}

export default new PageEvent()
