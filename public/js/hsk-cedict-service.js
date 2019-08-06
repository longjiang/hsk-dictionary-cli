const HSKCEDICT = {
  _csv: '../data/hsk_cedict.csv.txt',
  _data: [],
  load() {
    return new Promise(resolve => {
      Papa.parse(this._csv, {
        download: true,
        header: true,
        complete: results => {
          this._data = results.data.map(row => this.augment(row))
          resolve()
        }
      })
    })
  },
  getByHSKId(hskId) {
    return this._data.find(row => row.hskId === hskId)
  },
  getByIdentifier(identifier) {
    return this._data.find(row => row.identifier === identifier)
  },
  getByBookLessonDialog(book, lesson, dialog) {
    return this._data.filter(
      row =>
        parseInt(row.book) === parseInt(book) &&
        parseInt(row.lesson) === parseInt(lesson) &&
        row.dialog.toString() === dialog.toString()
    )
  },
  compileBooks() {
    // https://www.consolelog.io/group-by-in-javascript/
    Array.prototype.groupBy = function(prop) {
      return this.reduce(function(groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
      }, {})
    }
    var books = this._data.filter(row => row.book).groupBy('book')
    for (var book in books) {
      books[book] = books[book].groupBy('lesson')
      for (var lesson in books[book]) {
        books[book][lesson] = books[book][lesson].groupBy('dialog')
      }
    }
    return books
  },
  isChinese(text) {
    return text.match(
      // eslint-disable-next-line no-irregular-whitespace
      /[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B‌​\u3400-\u4DB5\u4E00-\u9FCC\uF900-\uFA6D\uFA70-\uFAD9]+/g
    )
  },
  removeTones(pinyin) {
    return pinyin.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  },
  lookupFuzzy(text, limit = false) {
    let results = []
    if (this.isChinese(text)) {
      results = this._data.filter(
        row => row.simplified.includes(text) || row.traditional.includes(text)
      )
    } else {
      text = text.toLowerCase().replace(/ /g, '')
      results = this._data.filter(row => {
        return (
          this.removeTones(row.pinyin.replace(/ /g, '')).includes(text) ||
          row.definitions[0].text.includes(text)
        )
      })
    }
    if (results) {
      results = results.sort(
        (a, b) => a.simplified.length - b.simplified.length
      )
      if (limit) {
        results = results.slice(0, limit)
      }
      return results
    }
  },
  lookupByCharacter(char) {
    return this._data.filter(row => row.simplified.includes(char))
  },
  lookupByDefinition(definition) {
    return this._data.filter(row => row.search.split('/').includes(definition))
  },
  lookupPinyinFuzzy(pinyin) {
    return this._data.filter(
      row =>
        this.removeTones(row.pinyin).replace(/ /g, '') ===
        this.removeTones(pinyin).replace(/ /g, '')
    )
  },
  randomArrayItem(array, start = 0, length = false) {
    length = length || array.length
    array = array.slice(start, length)
    let index = Math.floor(Math.random() * array.length)
    return array[index]
  },
  random() {
    return this.randomArrayItem(this._data)
  },
  lookupSimplified(simplified, pinyin = false) {
    const candidates = this._data
      .filter(row => {
        let pinyinMatch = true
        if (pinyin.length > 0) {
          pinyinMatch = row.pinyin === pinyin
        }
        return pinyinMatch && row.simplified === simplified
      })
      .sort((a, b) => {
        return b.definitions.length - a.definitions.length // More definitions = longer definition = likely more common word
      })
    return candidates
  },
  augment(row) {
    let hskCEDICT = this
    let augmented = Object.assign({}, row)
    augmented.search = augmented.definitions
    augmented.definitions = augmented.definitions.split('/')
    if (augmented && augmented.definitions) {
      augmented.definitions.forEach((definition, index) => {
        if (typeof definition === 'string') {
          let definitionObj = {
            type: 'definition',
            text: definition
              .replace(/\[(.*)\]/, function(match, p1) {
                return ' (' + p1 + ')'
              })
              .replace(/([^\s]+)\|([^\s]+)/, '$2')
          }
          var m = definition.match(/variant of (.*)/)
          if (m) {
            definitionObj.type = 'variant'
            definitionObj.variant = hskCEDICT.parseWord(m[1])
            definitionObj.text = `variant of ${
              definitionObj.variant.simplified
            } (${definitionObj.variant.pinyin})`
          }
          m = definition.match(/see (.*)/)
          if (m) {
            definitionObj.type = 'reference'
            definitionObj.variant = hskCEDICT.parseWord(m[1])
            definitionObj.text = `see ${definitionObj.variant.simplified} (${
              definitionObj.variant.pinyin
            })`
          }
          m = definition.match(/CL:(.*)/)
          if (m) {
            let measureWords = []
            for (let item of m[1].split(',')) {
              const mw = hskCEDICT.parseWord(item)
              if (mw.simplified !== '个') {
                measureWords.push(mw)
              }
            }
            if (measureWords.length > 0) {
              augmented.measureWords = measureWords
            }
            augmented.definitions.splice(index, 1) // Remove CL:  definition
          } else {
            augmented.definitions[index] = definitionObj
          }
        }
      })
    }
    return augmented
  },
  /* Returns the longest word in the dictionary that is inside `text` */
  longest(text, traditional = false) {
    // Only return the *first* seen word and those the same as it
    let first = false
    const tradOrSimp = traditional ? 'traditional' : 'simplified'
    let matches = this._data
      .filter(function(row) {
        if (first) {
          return row[tradOrSimp] === first
        } else {
          if (text.includes(row[tradOrSimp])) {
            first = row[tradOrSimp]
            return true
          }
        }
      })
      .sort((a, b) => {
        return b.definitions.length - a.definitions.length // More definitions = longer definition = likely more common word
      })
    return {
      matches: matches,
      text: matches && matches.length > 0 ? matches[0][tradOrSimp] : ''
    }
  },
  // text = 涎[xian2]
  // text = 協|协[xie2]
  parseWord(text) {
    var m = text.match(/(.*)\[(.*)\]/)
    if (!m) {
      m = [text, text, '']
    }
    const c = m[1].split('|')
    return {
      simplified: c.length > 1 ? c[1] : c[0], // 涎, 协
      traditional: c[0], // 涎, 協
      pinyin: m[2]
    }
  },
  subdict(data) {
    let newDict = Object.assign({}, this)
    return Object.assign(newDict, { _data: data })
  },
  isTraditional(text) {
    let matchedSimplified = 0
    let matchedTraditional = 0
    for (let row of this._data) {
      if (text.includes(row.simplified)) matchedSimplified++
      if (text.includes(row.traditional)) matchedTraditional++
    }
    return matchedTraditional > matchedSimplified
  },
  subdictFromText(text) {
    return this.subdict(
      this._data.filter(function(row) {
        return text.includes(row.simplified) || text.includes(row.traditional)
      })
    )
  }
}
