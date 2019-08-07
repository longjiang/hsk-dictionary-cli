<template>
  <div class="main mt-4 mb-4">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div v-if="!arg">
            <h4>Explore Related Words</h4>
            <p>Search for a word, and see words associated with it.</p>
            <Loader class="mt-5" />
            <Search :hrefFunc="hrefFunc" />
          </div>
          <div v-if="arg">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import WordListExended from '@/components/WordListExended.vue'
import DefinitionsList from '@/components/DefinitionsList.vue'
import Search from '@/components/Search.vue'
import $ from 'jquery'

export default {
  components: {
    WordListExended,
    DefinitionsList,
    Search
  },
  beforeMount() {
    this.route()
  },
  methods: {
    route() {
      $('#hsk-dictionary')[0].scrollIntoView()
      if (this.$route.params.arg) {
        this.arg = this.$route.params.arg
      } else {
        this.arg = ''
        Helper.loaded(
          (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {}
        )
      }
    }
  },
  watch: {
    $route() {
      this.route()
    }
  },
  data() {
    return {
      Helper,
      root: undefined,
      arg: undefined,
      hrefFunc: entry => `#/explore/related/${entry.identifier}`
    }
  }
}
</script>
