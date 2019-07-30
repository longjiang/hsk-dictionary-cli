export default class {
  constructor(items) {
    this._items = items
    this._current = 0
  }
  current() {
    return this._items[this._current]
  }
  setCurrent(findFunction) {
    this._current = this._items.findIndex(findFunction)
  }
  hasNext() {
    return this._current < this._items.length - 1
  }
  hasPrevious() {
    return this._current > 0
  }
  next() {
    if (this.hasNext()) {
      this._current += 1
      return this._items[this._current]
    }
  }
  previous() {
    if (this.hasPrevious()) {
      this._current -= 1
      return this._items[this._current]
    }
  }
}
