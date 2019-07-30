import HSK from './hsk'
import CEDICT from './cedict'
import SavedHSKWords from './saved-hsk-words'
import SavedCEDICTWords from './saved-cedict-words'
import SavedWords from './saved-words'
import Word from './word'
import $ from 'jquery'

export default {
  includes(method, args) {
    if (method === 'hsk') {
      return SavedHSKWords.includes(args[0])
    } else if (method === 'cedict') {
      return SavedCEDICTWords.includes(...args)
    }
  },
  count() {
    return SavedHSKWords.count() + SavedCEDICTWords.count()
  },
  list() {
    return this.listShallow().map(function({ method, args }) {
      return this.augment(method, args)
    })
  },
  listShallow() {
    return SavedHSKWords.getIds()
      .map(id => {
        return { method: 'hsk', args: [id] }
      })
      .concat(
        SavedCEDICTWords.list().map(function(args) {
          return { method: 'cedict', args: args }
        })
      )
  },
  add(method, args) {
    if (method === 'hsk') {
      SavedHSKWords.add(args[0])
    } else if (method === 'cedict') {
      SavedCEDICTWords.add(...args)
    }
  },
  remove(method, args) {
    if (method === 'hsk') {
      SavedHSKWords.remove(args[0])
    } else if (method === 'cedict') {
      SavedCEDICTWords.remove(...args)
    }
  },
  removeAll() {
    SavedHSKWords.removeAll()
    SavedCEDICTWords.removeAll()
  },
  blinkedSavedWordsButton() {
    $('.tab-saved-words').removeClass('blink')
    setTimeout(() => {
      $('.tab-saved-words').addClass('blink')
    }, 500)
  },
  updateSavedWordsDisplay() {
    try {
      window.hskDictionaryApp.savedWordsKey += 1
      if (window.hskDictionaryApp.$refs.entry) {
        window.hskDictionaryApp.$refs.entry.savedWordsKey += 1
      }
      if (window.hskDictionaryApp.$refs.browse) {
        window.hskDictionaryApp.$refs.browse.savedWordsKey += 1
      }
      if (window.hskDictionaryApp.$refs.savedWords) {
        window.hskDictionaryApp.$refs.savedWords.savedWordsKey += 1
      }
    } catch (err) {
      console.log('Error in SavedWords.updateSavedWordsDisplay()')
      console.log(err)
    }
    $('.word-block[data-method][data-args]').each(function() {
      let method = $(this).attr('data-method')
      let args = JSON.parse(unescape($(this).attr('data-args')))
      if (SavedWords.includes(method, args)) {
        $(this).addClass('saved')
      } else {
        $(this).removeClass('saved')
      }
    })
    this.blinkedSavedWordsButton()
  }
}
