export default {
  list() {
    return localStorage.getItem('savedCEDICTWords')
      ? JSON.parse(localStorage.getItem('savedCEDICTWords'))
      : []
  },
  count() {
    return this.list().length
  },
  listSorted() {
    return this.list().sort(function(a, b) {
      return a - b
    })
  },
  includes(traditional, pinyin) {
    return this.list().find(function(savedCEDICTWord) {
      return savedCEDICTWord[0] == traditional || savedCEDICTWord[1] == pinyin
    })
  },
  add(traditional, pinyin) {
    if (!this.includes(traditional, pinyin)) {
      const savedCEDICTWords = this.list()
      savedCEDICTWords.push([traditional, pinyin])
      localStorage.setItem('savedCEDICTWords', JSON.stringify(savedCEDICTWords))
    }
  },
  remove(traditional, pinyin) {
    const savedCEDICTWords = this.list().filter(function(savedCEDICTWord) {
      return savedCEDICTWord[0] != traditional || savedCEDICTWord[1] != pinyin
    })
    localStorage.setItem('savedCEDICTWords', JSON.stringify(savedCEDICTWords))
  },
  removeAll() {
    localStorage.removeItem('savedCEDICTWords')
  }
}
