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
  list() {
    const hskWords = SavedHSKWords.getIds().map(function(id) {
      let hskWord = HSK.get(id)
      hskWord.method = 'hsk'
      const cedictWords = CEDICT.lookupSimplified(hskWord.word)
      if (cedictWords && cedictWords.length > 0) {
        hskWord = Object.assign(hskWord, cedictWords[0])
      } else {
        hskWord.simplified = hskWord.word
      }
      return hskWord
    })
    const cedictWords = SavedCEDICTWords.list().map(function(item) {
      const cedictWord = Object.assign(
        { method: 'cedict' },
        CEDICT.get(item[0], item[1])
      )
      cedictWord.book = 'outside'
      return cedictWord
    })
    return hskWords.concat(cedictWords)
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
  updateSavedWordsDisplay() {
    try {
      this.$root.savedWordsKey += 1
      if (window.hskDictionaryApp.$refs.entry) {
        window.hskDictionaryApp.$refs.entry.savedWordsKey += 1
      }
      if (window.hskDictionaryApp.$refs.browse) {
        window.hskDictionaryApp.$refs.browse.savedWordsKey += 1
      }
      if (window.hskDictionaryApp.$refs.savedWords) {
        window.hskDictionaryApp.$refs.savedWords.savedWordsKey += 1
      }
    } catch {
      console.log('Error in SavedWords.updateSavedWordsDisplay()')
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
  },
  blinkedSavedWordsButton() {
    $('.tab-saved-words').removeClass('blink')
    setTimeout(() => {
      $('.tab-saved-words').addClass('blink')
    }, 500)
  },
  saveWordClick: function(e) {
    var $target = $(e.target)
    if (e.target.tagName.toLowerCase() === 'i') {
      $target = $target.parent()
    }
    SavedWords.add(
      $target.attr('data-method'),
      JSON.parse($target.attr('data-args'))
    )
    SavedWords.updateSavedWordsDisplay()
  },
  removeWordClick: function(e) {
    var $target = $(e.target)
    if (e.target.tagName.toLowerCase() === 'i') {
      $target = $target.parent()
    }
    SavedWords.remove(
      $target.attr('data-method'),
      JSON.parse($target.attr('data-args'))
    )
    SavedWords.updateSavedWordsDisplay()
  }
}
