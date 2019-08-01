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
        return savedCEDICTWord[0] != traditional || savedCEDICTWord[1] != pinyin
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
    addSavedWord({ commit, dispatch }, { traditional, pinyin }) {
      commit('ADD_SAVED_WORD', { traditional, pinyin })
      dispatch('updateSavedWordsDisplay')
    },
    removeSavedWord({ commit, dispatch }, { traditional, pinyin }) {
      commit('REMOVE_SAVED_WORD', { traditional, pinyin })
      dispatch('updateSavedWordsDisplay')
    },
    removeAllSavedWords({ commit, dispatch }) {
      commit('REMOVE_ALL_SAVED_WORDS')
      dispatch('updateSavedWordsDisplay')
    },
    blinkedSavedWordsButton() {
      $('.tab-saved-words').removeClass('blink')
      setTimeout(() => {
        $('.tab-saved-words').addClass('blink')
      }, 500)
    },
    updateSavedWordsDisplay({ dispatch, getters }) {
      $('.word-block[data-candidates]').each(function() {
        let candidates = JSON.parse(unescape($(this).attr('data-candidates')))
        $(this).removeClass('saved')
        for (let candidate of candidates) {
          if (
            getters.hasSavedWord({
              traditional: candidate.traditional,
              pinyin: candidate.pinyin
            })
          ) {
            $(this).addClass('saved')
          }
        }
      })
      dispatch('blinkedSavedWordsButton')
    }
  },
  getters: {
    hasSavedWord: state => ({ traditional, pinyin }) => {
      let yes = state.savedWords.find(item => {
        return item[0] === traditional && item[1] === pinyin
      })
      return yes
    },
    savedWordCount: state => () => {
      return state.savedWords.length
    }
  }
})
