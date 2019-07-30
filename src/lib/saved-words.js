import HSK from './hsk'
import CEDICT from './cedict'
import SavedHSKWords from './saved-hsk-words'
import SavedCEDICTWords from './saved-cedict-words'
import SavedWords from './saved-words'
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
  augment(method, args) {
    if (method === 'hsk') {
      let hskWord = HSK.get(args[0])
      if (hskWord) {
        hskWord.method = method
        hskWord.args = args
        const cedictWords = CEDICT.lookupSimplified(hskWord.word)
        if (cedictWords && cedictWords.length > 0) {
          hskWord = Object.assign(hskWord, cedictWords[0])
        } else {
          hskWord.simplified = hskWord.word
          hskWord.definitions = [
            {
              type: 'definition',
              definition: hskWord.english
            }
          ]
        }
        return hskWord
      }
    } else if (method === 'cedict') {
      const cedictWord = Object.assign(
        { method: 'cedict' },
        CEDICT.get(...args)
      )
      if (cedictWord) {
        cedictWord.method = method
        cedictWord.args = args
        cedictWord.book = 'outside'
        return cedictWord
      }
    }
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
