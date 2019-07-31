import Helper from './helper'

export default {
  _data: [],
  load(callback) {
    const cedict = this
    Helper.loaderMessage('Loading CC-CEDICT library (3.4MB).')
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        Helper.loaderMessage('CC-CEDICT data loaded.')
        cedict.loadData(this.responseText, callback)
      }
    }
    xhttp.open('GET', 'data/cedict_ts.u8.txt', true) // Use .txt extension so gzip will work with it
    xhttp.setRequestHeader('Cache-Control', 'max-age=3600')
    xhttp.send()
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
  loadData(cedictText, callback) {
    for (let line of cedictText.split('\n')) {
      if (!line.startsWith('#')) {
        const matches = line.match(/^([^\s]+) ([^\s]+) \[(.+)\] \/(.*)\//)
        if (matches) {
          const row = {
            simplified: matches[2],
            traditional: matches[1],
            pinyin: this.parsePinyin(matches[3]),
            definitions: matches[4].split('/'),
            search:
              matches[1] +
              ' ' +
              matches[2] +
              ' ' +
              matches[3].toLowerCase().replace(/[\s\d]/gi, '') +
              ' ' +
              matches[4]
          }
          Object.freeze(row)
          if (row) this._data.push(row)
        }
      }
    }
    this._data = this._data.sort(function(a, b) {
      return b.simplified.length - a.simplified.length
    })
    Helper.loaderMessage('CC-CEDICT library ready.')
    callback(this)
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
  /* Returns the longest word in the dictionary that is inside `text` */
  longest(text) {
    let first = false
    let matches = this._data
      .filter(function(row) {
        if (first) {
          return row.simplified === first
        } else {
          if (text.includes(row.simplified)) {
            first = row.simplified
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
      text: matches && matches.length > 0 ? matches[0].simplified : ''
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
  get(traditional, pinyin) {
    const row = this._data.find(function(row) {
      return (
        row.traditional === traditional &&
        row.pinyin.replace(/[\s']/g, '').toLowerCase() ===
          pinyin.replace(/[\s']/g, '').toLowerCase()
      )
    })
    return this.augment(row)
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
          pinyinMatch =
            row.pinyin.replace(/[\s']/g, '').toLowerCase() ===
            pinyin.replace(/[\s']/g, '').toLowerCase()
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
          pinyinMatch =
            row.pinyin.replace(/[\s']/g, '').toLowerCase() ===
            pinyin.replace(/[\s']/g, '').toLowerCase()
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
  lookupFuzzy(text) {
    text = text.toLowerCase().replace(' ', '')
    return this._data
      .filter(row => {
        return row.search.includes(text)
      })
      .sort((a, b) => {
        return a.simplified.length - b.simplified.length
      })
      .map(row => {
        return this.augment(row)
      })
  }
}
