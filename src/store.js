import Vue from 'vue'
import Vuex from 'vuex'
import SavedWords from '@/lib/saved-words'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    savedWords: SavedWords
  },
  mutations: {
    ADD_SAVED_WORD(state, { method, args }) {
      console.log('adding', method, args)
      state.savedWords.add(method, args)
    },
    REMOVE_SAVED_WORD(state, { method, args }) {
      console.log('removing', method, args)
      state.savedWords.remove(method, args)
    }
  },
  actions: {
    addSavedWord({ commit }, { method, args }) {
      commit('ADD_SAVED_WORD', { method, args })
    },
    removeSavedWord({ commit }, { method, args }) {
      commit('REMOVE_SAVED_WORD', { method, args })
    }
  },
  getters: {
    hasSavedWord: state => ({ method, args }) => {
      return state.savedWords.includes(method, args)
    },
    savedWordCount: state => () => {
      return state.savedWords.count()
    }
  }
})
