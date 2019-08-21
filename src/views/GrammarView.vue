<template>
  <div class="container mt-5 mb-5 main">
    <div class="row">
      <div class="col-sm-12 text-center">
        <h3 class="mb-5">Grammar Note {{ grammar.code }}</h3>
        <GrammarPoint v-if="grammar" :grammar="grammar" class="shadow rounded p-5 mb-5" />
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import GrammarPoint from '@/components/GrammarPoint'
import ChineseZeroToHeroVue from '../ChineseZeroToHero.vue'

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
      $('#chinesezerotohero')[0].scrollIntoView()
      Helper.loaded(
        (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
          this.grammar = loadedGrammar._grammarData.find(
            row => row.id === this.id
          )
        }
      )
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
