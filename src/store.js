import Vue from 'vue'
import Vuex from 'vuex'
import SavedWords from '@/lib/saved-words'
import Word from '@/lib/word'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    savedWords: SavedWords.listShallow()
  },
  mutations: {
    ADD_SAVED_WORD(state, { method, args }) {
      SavedWords.add(method, args)
      state.savedWords = SavedWords.listShallow()
    },
    REMOVE_SAVED_WORD(state, { method, args }) {
      SavedWords.remove(method, args)
      state.savedWords = SavedWords.listShallow()
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
      let yes = state.savedWords.find(item => {
        for (let [index, arg] of item.args.entries()) {
          if (arg !== args[index]) return false
        }
        return item.method === method
      })
      return yes
    },
    savedWordCount: state => () => {
      return state.savedWords.length
    },
    savedWords: state => () => {
      return state.savedWords.map(({ method, args }) => new Word(method, args))
    }
  }
})
