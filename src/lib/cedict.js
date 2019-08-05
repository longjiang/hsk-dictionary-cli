import Helper from './helper'
import $ from 'jquery'

export default {
  _data: [],
  load(callback) {
    Helper.loaderMessage('Loading CC-CEDICT library (3.4MB).')
    $.getJSON('data/cedict.json', data => {
      this._data = data
      Helper.loaderMessage('CC-CEDICT data loaded.')
      callback(this)
    })
  },
  subdict(data) {
    let newDict = Object.assign({}, this)
    return Object.assign(newDict, { _data: data })
  },
  subdictFromText(text) {
    return this.subdict(
      this._data.filter(function(row) {
        return text.includes(row.simplified) || text.includes(row.traditional)
      })
    )
  },
  augment(row) {
    let CEDICT = this
    let augmented = Object.assign({}, row)
    if (row && row.definitions) {
      row.definitions.forEach((definition, index) => {
        if (typeof definition === 'string') {
          let definitionObj = {
            type: 'definition',
            text: definition
              .replace(/\[(.*)\]/, function(match, p1) {
                return ' (' + CEDICT.parsePinyin(p1) + ')'
              })
              .replace(/([^\s]+)\|([^\s]+)/, '$2')
          }
          var m = definition.match(/variant of (.*)/)
          if (m) {
            definitionObj.type = 'variant'
            definitionObj.variant = CEDICT.parseWord(m[1])
            definitionObj.text = `variant of ${
              definitionObj.variant.simplified
            } (${definitionObj.variant.pinyin})`
          }
          m = definition.match(/see (.*)/)
          if (m) {
            definitionObj.type = 'reference'
            definitionObj.variant = CEDICT.parseWord(m[1])
            definitionObj.text = `see ${definitionObj.variant.simplified} (${
              definitionObj.variant.pinyin
            })`
          }
          m = definition.match(/CL:(.*)/)
          if (m) {
            let measureWords = []
            for (let item of m[1].split(',')) {
              const mw = CEDICT.parseWord(item)
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
  isTraditional(text) {
    let matchedSimplified = 0
    let matchedTraditional = 0
    for (let row of this._data) {
      if (text.includes(row.simplified)) matchedSimplified++
      if (text.includes(row.traditional)) matchedTraditional++
    }
    return matchedTraditional > matchedSimplified
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
      .map(row => {
        return this.augment(row)
      })
    return {
      matches: matches,
      text: matches && matches.length > 0 ? matches[0][tradOrSimp] : ''
    }
  },
  parsePinyin(pinyin) {
    return pinyinify(pinyin.replace(/u:/gi, 'ü')) // use the pinyinify library to parse tones
      .replace(/\d/g, '') // pinyinify does not handle 'r5', we remove all digits
  },
  // text = 涎[xian2]
  // text = 協|协[xie2]
  parseWord(text) {
    var m = text.match(/(.*)\[(.*)\]/)
    if (!m) {
      m = [text, text, '']
    }
    const c = m[1].split('|')
    const cedict = this
    return {
      simplified: c.length > 1 ? c[1] : c[0], // 涎, 协
      traditional: c[0], // 涎, 協
      pinyin: cedict.parsePinyin(m[2])
    }
  },
  random() {
    return Helper.randomArrayItem(this._data)
  },
  get(identifier) {
    const candidate = this._data.find(row => row.identifier === identifier)
    return this.augment(candidate)
  },
  getByList(array) {
    let words = []
    for (let item of array) {
      let word = this.get(item[0], item[1])
      if (word) words.push(word)
    }
    return words
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
      .map(row => {
        return this.augment(row)
      })
    return candidates
  },
  lookupTraditional(traditional, pinyin = false) {
    const candidates = this._data
      .filter(row => {
        let pinyinMatch = true
        if (pinyin.length > 0) {
          pinyinMatch = row.pinyin === pinyin
        }
        return pinyinMatch && row.traditional === traditional
      })
      .sort((a, b) => {
        return b.definitions.length - a.definitions.length // More definitions = longer definition = likely more common word
      })
      .map(row => {
        return this.augment(row)
      })
    return candidates
  },
  lookupPinyinFuzzy(pinyin) {
    const pinyinFuzzy = this.removeTones(pinyin)
    return this._data
      .filter(row => row.pinyinFuzzy === pinyinFuzzy)
      .sort((a, b) => {
        return b.definitions.length - a.definitions.length // More definitions = longer definition = likely more common word
      })
      .map(row => {
        return this.augment(row)
      })
  },
  lookupPinyin(pinyin) {
    return this._data
      .filter(row => row.pinyin === pinyin)
      .sort((a, b) => {
        return b.definitions.length - a.definitions.length // More definitions = longer definition = likely more common word
      })
      .map(row => {
        return this.augment(row)
      })
  },
  removeTones(pinyin) {
    return pinyin.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  },
  isChinese(text) {
    return text.match(
      // eslint-disable-next-line no-irregular-whitespace
      /[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B‌​\u3400-\u4DB5\u4E00-\u9FCC\uF900-\uFA6D\uFA70-\uFAD9]+/g
    )
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
        return row.search.includes(text)
      })
    }
    if (results) {
      results = results.sort(
        (a, b) => a.simplified.length - b.simplified.length
      )
      if (limit) {
        results = results.slice(0, limit)
      }
      return results.map(row => {
        return this.augment(row)
      })
    }
  }
}
