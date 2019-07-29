export default {
  getIds() {
    return localStorage.getItem('savedWordIds')
      ? JSON.parse(localStorage.getItem('savedWordIds'))
      : []
  },
  count() {
    return this.getIds().length
  },
  getIdsSorted() {
    return this.getIds().sort(function(a, b) {
      return parseInt(a) - parseInt(b)
    })
  },
  includes(id) {
    return this.getIds().includes(id)
  },
  add(id) {
    if (!this.includes(id)) {
      const savedWordIds = this.getIds()
      savedWordIds.push(id)
      localStorage.setItem('savedWordIds', JSON.stringify(savedWordIds))
    }
  },
  remove(id) {
    const savedWordIds = this.getIds().filter(function(savedWordId) {
      return id != savedWordId
    })
    localStorage.setItem('savedWordIds', JSON.stringify(savedWordIds))
  },
  removeAll() {
    localStorage.removeItem('savedWordIds')
  }
}
