export default class {
  constructor(goal, callback) {
    if (goal.length === 0) callback()
    this._loaded = []
    this._goal = goal
    this._complete = callback
  }

  loaded(item) {
    let loader = this
    this._loaded.push(item)
    if (
      this._goal.filter(function(item) {
        return !loader._loaded.includes(item)
      }).length === 0
    )
      this._complete()
  }
}
