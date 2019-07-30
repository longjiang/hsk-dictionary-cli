import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    savedWords: JSON.parse(localStorage.getItem('savedCEDICTWords')) || []
  },
  mutations: {
    ADD_SAVED_WORD(state, { traditional, pinyin }) {
      if (
        !state.savedWords.find(
          item => item.traditional === traditional && item.pinyin === pinyin
        )
      ) {
        state.savedWords.push([traditional, pinyin])
        localStorage.setItem(
          'savedCEDICTWords',
          JSON.stringify(state.savedWords)
        )
      }
    },
    REMOVE_SAVED_WORD(state, { traditional, pinyin }) {
      const keepers = state.savedWords.filter(function(savedCEDICTWord) {
        return (
          savedCEDICTWord[0] != traditional ||
          savedCEDICTWord[1].replace(/\s/g, '').toLowerCase() !=
            pinyin.replace(/\s/g, '').toLowerCase()
        )
      })
      state.savedWords = keepers
      localStorage.setItem('savedCEDICTWords', JSON.stringify(keepers))
    },
    REMOVE_ALL_SAVED_WORDS(state) {
      localStorage.removeItem('savedCEDICTWords')
      state.savedWords = []
    }
  },
  actions: {
    addSavedWord({ commit }, { traditional, pinyin }) {
      commit('ADD_SAVED_WORD', { traditional, pinyin })
    },
    removeSavedWord({ commit }, { traditional, pinyin }) {
      commit('REMOVE_SAVED_WORD', { traditional, pinyin })
    },
    removeAllSavedWords({ commit }) {
      commit('REMOVE_ALL_SAVED_WORDS')
    },
    blinkedSavedWordsButton() {
      $('.tab-saved-words').removeClass('blink')
      setTimeout(() => {
        $('.tab-saved-words').addClass('blink')
      }, 500)
    },
    updateSavedWordsDisplay() {
      $('.word-block[data-method][data-args]').each(function() {
        let method = $(this).attr('data-method')
        let args = JSON.parse(unescape($(this).attr('data-args')))
        if (this.$store.getters.hasSavedWord.includes(method, args)) {
          $(this).addClass('saved')
        } else {
          $(this).removeClass('saved')
        }
      })
      this.blinkedSavedWordsButton()
    }
  },
  getters: {
    hasSavedWord: state => ({ traditional, pinyin }) => {
      let yes = state.savedWords.find(item => {
        return (
          item[0] === traditional &&
          item[1].replace(/\s/g, '').toLowerCase() ===
            pinyin.replace(/\s/g, '').toLowerCase()
        )
      })
      return yes
    },
    savedWordCount: state => () => {
      return state.savedWords.length
    }
  }
})
