<template>
  <div class="container mt-5 mb-5 main">
    <div class="row">
      <div class="col-sm-12 text-center" v-if="grammar">
        <h3 class="mb-4">Grammar Note {{ grammar.code }}</h3>
        <button @click="prevClick" class="btn btn-medium bg-light mr-2">
          <font-awesome-icon icon="chevron-left" title="previous" />
        </button>
        <button @click="nextClick" class="btn btn-medium bg-light">
          <font-awesome-icon icon="chevron-right" title="next" />
        </button>
        <GrammarPoint
          :grammar="grammar"
          class="shadow rounded p-5 mt-4 mb-5"
          :key="id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import GrammarPoint from '@/components/GrammarPoint'
import Grammar from '@/lib/grammar'

export default {
  components: {
    GrammarPoint
  },
  props: {
    id: {
      type: String
    }
  },
  methods: {
    loadGrammar() {
      Helper.loaded(
        (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
          this.grammar = loadedGrammar._grammarData.find(
            row => row.id === this.id
          )
        }
      )
    },
    prevClick() {
      location.hash = '#/grammar/view/' + Math.max(0, parseInt(this.id) - 1)
    },
    nextClick() {
      location.hash =
        '#/grammar/view/' +
        Math.min(Grammar._grammarData.length - 1, parseInt(this.id) + 1)
    }
  },
  data() {
    return {
      grammar: undefined
    }
  },
  mounted() {
    this.loadGrammar()
  },
  watch: {
    id() {
      this.loadGrammar()
    }
  }
}
</script>

<style></style>
