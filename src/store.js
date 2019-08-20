import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    savedWords: JSON.parse(localStorage.getItem('savedCEDICTWords')) || []
  },
  mutations: {
    ADD_SAVED_WORD(state, identifier) {
      if (
        !state.savedWords.find(
          item => item.join(',').replace(/ /g, '_') === identifier
        )
      ) {
        state.savedWords.push(identifier.replace(/_/g, ' ').split(','))
        localStorage.setItem(
          'savedCEDICTWords',
          JSON.stringify(state.savedWords)
        )
      }
    },
    REMOVE_SAVED_WORD(state, identifier) {
      const keepers = state.savedWords.filter(
        savedCEDICTWord =>
          savedCEDICTWord.join(',').replace(/ /g, '_') !== identifier
      )
      state.savedWords = keepers
      localStorage.setItem('savedCEDICTWords', JSON.stringify(keepers))
    },
    REMOVE_ALL_SAVED_WORDS(state) {
      localStorage.removeItem('savedCEDICTWords')
      state.savedWords = []
    }
  },
  actions: {
    addSavedWord({ commit, dispatch }, identifier) {
      // identifier = 'traditional,pinyin,index'
      commit('ADD_SAVED_WORD', identifier)
      dispatch('updateSavedWordsDisplay')
    },
    removeSavedWord({ commit, dispatch }, identifier) {
      commit('REMOVE_SAVED_WORD', identifier)
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
      $('.word-block[data-identifiers]').each(function() {
        let identifiers = JSON.parse(unescape($(this).attr('data-identifiers')))
        $(this).removeClass('saved')
        for (let identifier of identifiers) {
          if (getters.hasSavedWord(identifier)) {
            $(this).addClass('saved')
          }
        }
      })
      dispatch('blinkedSavedWordsButton')
    }
  },
  getters: {
    hasSavedWord: state => identifier => {
      let yes = state.savedWords.find(item => {
        return item.join(',').replace(/ /g, '_') === identifier
      })
      return yes
    },
    savedWordCount: state => () => {
      return state.savedWords.length
    }
  }
})
