import Papa from 'papaparse'
import $ from 'jquery'

export default {
  _cedictData: [],
  _hskData: [],
  _cedictFile: 'data/cedict_ts.u8.txt',
  _hskCSV: 'data/HSK 1-6 Vocabulary/HSK Standard Course 1-6-Table 1.csv',
  _hskFields: {
    hskId: 'Id',
    simplified: 'Word',
    pinyin: 'Pinyin',
    definitions: 'English',
    book: 'Book',
    hsk: 'HSK',
    lesson: 'Lesson',
    dialog: 'Dialog',
    nw: 'NW',
    example: 'Example',
    exampleTranslation: 'Translation',
    oofc: 'OofC',
    pn: 'PN'
  },
  f() {
    // CEDICT.parsePinyinInCEDICTFIle(function(parsed) {
    //   console.log(parsed)
    //   window.parsed = parsed
    // })
  },
  loadHSK(callback) {
    Papa.parse(this._hskCSV, {
      download: true,
      header: true,
      complete: results => {
        for (let row of results.data) {
          var result = {}
          for (var index in this._hskFields) {
            result[index] = row[this._hskFields[index]]
          }
          this._hskData.push(result)
        }
        callback()
      }
    })
  },
  parsePinyin(pinyin) {
    return pinyinify(pinyin.replace(/u:/gi, 'ü')) // use the pinyinify library to parse tones
      .replace(/\d/g, '') // pinyinify does not handle 'r5', we remove all digits
  },
  loadCEDICT(callback) {
    let xhttp = new XMLHttpRequest()
    let that = this
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        that.loadCEDICTData(this.responseText, callback)
      }
    }
    xhttp.open('GET', this._cedictFile, true) // Use .txt extension so gzip will work with it
    xhttp.setRequestHeader('Cache-Control', 'max-age=3600')
    xhttp.send()
  },
  loadCEDICTData(cedictText, callback) {
    let same = {
      traditional: undefined,
      pinyin: undefined
    }
    for (let line of cedictText.split('\n')) {
      if (!line.startsWith('#')) {
        line = line.replace(/\[.+?\]/g, m => this.parsePinyin(m))
        const matches = line.match(/^([^\s]+) ([^\s]+) \[(.+)\] \/(.*)\//)
        if (matches) {
          let row = {
            simplified: matches[2],
            traditional: matches[1],
            pinyin: matches[3],
            definitions: matches[4],
            index: 0 // for homonyms
          }
          if (
            row.traditional === same.traditional &&
            row.pinyin === same.pinyin
          ) {
            row.index++
          } else {
            same = {
              traditional: row.traditional,
              pinyin: row.pinyin
            }
          }
          row.identifier = `${row.traditional},${row.pinyin},${
            row.index
          }`.replace(/ /g, '_')
          Object.freeze(row)
          if (row) this._cedictData.push(row)
        }
      }
    }
    this._cedictData = this._cedictData.sort(function(a, b) {
      return b.simplified.length - a.simplified.length
    })
    callback()
  },
  getHSK(simplified, pinyin) {
    return this._hskData.filter(function(row) {
      return (
        row.simplified === simplified &&
        row.pinyin.toLowerCase() === pinyin.toLowerCase()
      )
    })
  },
  assignHSK(cedictWord) {
    const hskWords = this.getHSK(cedictWord.simplified, cedictWord.pinyin)
    if (hskWords.length > 0) {
      const result = Object.assign(hskWords[0], cedictWord)
      return result
    } else {
      let emptyHSKWord = {}
      for (let field in this._hskFields) {
        emptyHSKWord[field] = ''
      }
      emptyHSKWord.hsk = 'outside'
      const result = Object.assign(emptyHSKWord, cedictWord)
      return result
    }
  },
  download(filename, text) {
    var element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    )
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  },
  merge() {
    this.loadCEDICT(() => {
      this.loadHSK(() => {
        console.log('Data loaded, merging...')
        let normalized = []
        for (let row of this._cedictData) {
          normalized.push(this.assignHSK(row))
        }
        console.log(normalized.filter(row => row.hskId))
        window.csv = Papa.unparse(normalized)
        console.log(
          'CSV ready. Type `copy(csv)` in the console to copy to clipboard.'
        )
      })
    })
  }
}
