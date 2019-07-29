import Papa from 'papaparse'
import Helper from './helper'

export default {
  _grammarData: [],
  _grammarCSV: 'data/grammar.csv',
  _grammarCSVFields: {
    id: 'ID',
    code: 'Code',
    url: 'URL',
    structure: 'Structure',
    english: 'English Equivalent',
    example: 'Example',
    exampleTranslation: 'Example Translation'
  },

  load(callback) {
    var grammar = this
    Papa.parse(grammar._grammarCSV, {
      download: true,
      header: true,
      complete(results) {
        results.data.forEach(function(row) {
          var result = {}
          for (var index in grammar._grammarCSVFields) {
            result[index] = row[grammar._grammarCSVFields[index]]
          }
          result.book = parseInt(result.code.replace(/^(\d).*/, '$1'))
          result.lesson = parseInt(result.code.replace(/^(\d)\.(\d+).*/, '$2'))
          result.number = parseInt(
            result.code.replace(/^(\d)\.(\d+)\.(\d+).*/, '$3')
          )
          grammar._grammarData.push(result)
        })
        Helper.loaderMessage('Grammar library ready.')
        callback(grammar)
      }
    })
  },

  get(id) {
    return this._grammarData.find(function(row) {
      return parseInt(row.id) === parseInt(id)
    })
  },

  count() {
    return this._grammarData.length
  },

  lookup(code) {
    return this._grammarData.filter(function(row) {
      return row.code === code
    })
  },

  lookupFuzzy(term) {
    term = term.toLowerCase()
    return this._grammarData.filter(function(row) {
      return (
        row.code.includes(term) ||
        row.structure.includes(term) ||
        row.english.includes(term)
      )
    })
  },

  list() {
    return this._grammarData
  },

  listWhere(filterFunction) {
    return this._grammarData.filter(filterFunction)
  },

  listByBook(book) {
    var getFilterFunction = function(book) {
      return function(row) {
        return row.book === parseInt(book)
      }
    }
    return this.listWhere(getFilterFunction(book))
  },

  listByBookLesson(book, lesson) {
    var getFilterFunction = function(book, lesson) {
      return function(row) {
        return row.book === parseInt(book) && row.lesson === parseInt(lesson)
      }
    }
    return this.listWhere(getFilterFunction(book, lesson))
  },

  firstId() {
    const min = Math.min(
      ...this._grammarData.map(function(row) {
        return row.id
      })
    )
    return min
  },

  lastId() {
    const max = Math.max(
      ...this._grammarData.map(function(row) {
        return row.id
      })
    )
    return max
  },

  hasPrevious(id) {
    return id > this.first()
  },

  hasNext(id) {
    return id < this.last()
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
    var books = this._grammarData.groupBy('book')
    for (var book in books) {
      books[book] = books[book].groupBy('lesson')
    }
    return books
  }
}