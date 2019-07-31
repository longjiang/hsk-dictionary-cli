import Loader from './loader'
import Helper from './helper'
import Hanzi from './hanzi'
import Papa from 'papaparse'

export default {
  hanzi: undefined, // The Hanzi library, loaded async in the constructor
  _standardCourseData: [],
  _standardCourseCSV: 'data/hsk.csv',
  _standardCourseCSVFields: {
    id: 'Id',
    word: 'Word',
    pinyin: 'Pinyin',
    english: 'English',
    book: 'Book',
    lesson: 'Lesson',
    dialog: 'Dialog',
    nw: 'NW',
    examplePinyin: 'Example Pinyin',
    example: 'Example',
    exampleTranslation: 'Translation',
    oofc: 'OofC',
    pn: 'PN',
    songLyrics: 'Song Lyrics',
    songYouTube: 'Song YouTube'
  },

  /**
   * Loads the data and returns this via a callback.
   * @param {function} callback A callback function that takes the HSK library object as an argument.
   */
  load: function(callback) {
    var hsk = this
    const loader = new Loader(['hanzi.json', 'hsk.csv'], function() {
      callback(hsk)
    })
    Hanzi.load(function(hanzi) {
      hsk.hanzi = hanzi
      loader.loaded('hanzi.json')
      Helper.loaderMessage('Hanzi library ready.')
    })
    Papa.parse(hsk._standardCourseCSV, {
      download: true,
      header: true,
      complete: function(results) {
        Helper.loaderMessage('HSK library ready.')
        results.data.forEach(function(row) {
          var result = {}
          for (var index in hsk._standardCourseCSVFields) {
            result[index] = row[hsk._standardCourseCSVFields[index]]
          }
          hsk._standardCourseData.push(result)
        })
        Helper.loaderMessage('HSK library ready.')
        loader.loaded('hsk.csv')
      }
    })
  },

  /**
   * Get a word by id
   * @param {int} id The id of the word
   */

  get: function(id) {
    var word = this._standardCourseData.find(function(row) {
      return parseInt(row.id) === parseInt(id)
    })
    return word
  },

  getByIds(ids) {
    let words = []
    for (let id of ids) {
      let word = this.get(id)
      if (word) {
        words.push(word)
      }
    }
    return words
  },

  getByBookLessonDialog(book, lesson, dialog) {
    return this._standardCourseData.filter(
      row =>
        parseInt(row.book) === parseInt(book) &&
        parseInt(row.lesson) === parseInt(lesson) &&
        row.dialog.toString() === dialog.toString()
    )
  },

  count: function() {
    return this._standardCourseData.length
  },

  lookup: function(word, pinyin = false) {
    return this._standardCourseData.filter(function(row) {
      if (row.word == word && !row.oofc) {
        if (
          !pinyin ||
          row.pinyin.replace(/[\s']/g, '').toLowerCase() ===
            pinyin.replace(/[\s']/g, '').toLowerCase()
        ) {
          return true
        }
      }
    })
  },

  removeToneMarks: function(pinyin) {
    // See https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
    return pinyin.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  },

  lookupFuzzy: function(word) {
    var results = []
    word = word.toLowerCase()
    var hsk = this
    this._standardCourseData.forEach(function(row) {
      if (
        row.word.includes(word) ||
        hsk
          .removeToneMarks(row.pinyin)
          .toLowerCase()
          .includes(word) ||
        row.english.toLowerCase().includes(word)
      ) {
        if (!row.oofc) {
          results.push(row)
        }
      }
    })
    return results
  },

  getFirstHSKWordWithCharacter: function(char) {
    var words = this._standardCourseData.filter(function(row) {
      return row.word.includes(char) && row.oofc == '' && row.pn == ''
    })
    if (words[0]) {
      return words[0]
    }
  },

  getHSKCharactersByRadical: function(radical) {
    var hsk = this
    var characters = this.hanzi.searchByRadical(radical)
    var hskCharacters = []
    characters.forEach(function(character) {
      var firstWord = hsk.getFirstHSKWordWithCharacter(character.character)
      if (firstWord) {
        character.firstHSKWord = firstWord
        hskCharacters.push(character)
      }
    })
    return hskCharacters.sort(function(a, b) {
      return a.firstHSKWord.book - b.firstHSKWord.book
    })
  },

  simplifyEnglish: function(english) {
    return english
      .replace('/', ', ')
      .replace(/, .*/, '')
      .replace(/\(.*\)/, '')
      .replace('to ', '')
      .replace('.', '')
  },

  list: function() {
    var hsk = this
    return hsk._standardCourseData
  },

  listWhere: function(filterFunction) {
    return this._standardCourseData.filter(filterFunction)
  },

  listByBook: function(book) {
    var getFilterFunction = function(book) {
      return function(row) {
        return row.book == book
      }
    }
    return this.listWhere(getFilterFunction(book))
  },

  listByBookLesson: function(book, lesson) {
    var getFilterFunction = function(book, lesson) {
      return function(row) {
        return row.book == book && row.lesson == lesson
      }
    }
    return this.listWhere(getFilterFunction(book, lesson))
  },

  listBookLessonDialog: function(book, lesson, dialog) {
    var getFilterFunction = function(book, lesson, dialog) {
      return function(row) {
        return row.book == book && row.lesson == lesson && row.dialog == dialog
      }
    }
    return this.listWhere(getFilterFunction(book, lesson, dialog))
  },

  first: function() {
    const min = Math.min(
      ...this._standardCourseData.map(function(word) {
        return word.id
      })
    )
    return min
  },

  last: function() {
    const max = Math.max(
      ...this._standardCourseData.map(function(word) {
        return word.id
      })
    )
    return max
  },

  hasPrevious: function(id) {
    return id > this.first()
  },

  hasNext: function(id) {
    return id < this.last()
  },

  compileBooks: function() {
    // https://www.consolelog.io/group-by-in-javascript/
    Array.prototype.groupBy = function(prop) {
      return this.reduce(function(groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
      }, {})
    }
    var books = this._standardCourseData.groupBy('book')
    for (var book in books) {
      books[book] = books[book].groupBy('lesson')
      for (var lesson in books[book]) {
        books[book][lesson] = books[book][lesson].groupBy('dialog')
      }
    }
    return books
  }
}
