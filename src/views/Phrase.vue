<template>
  <div class="music">
    <div class="container main mt-5 mb-5">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="text-center mb-3">Lookup phrases not in the dictionary</h2>
          <p class="text-center mb-5">and see how they are used in real contexts.</p>
          <div class="search-compare-wrapper">
            <Search
              placeholder="Lookup a word or phrase"
              type="generic"
              :term="args"
              :defaultURL="text => `#/phrase/search/${text}`"
            />
          </div>
          <div :key="args">
            <WebImages v-if="args" :text="args" limit="10" class="mt-5" />
            <Grammar v-if="args" :text="args" limit="10" class="mt-5" />
            <Collocations v-if="args" :text="args" class="mt-5" />
            <Concordance v-if="args" :text="args" class="mt-5" />
            <Mistakes v-if="args" :text="args" class="mt-5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Concordance from '@/components/Concordance'
import Grammar from '@/components/Grammar'
import Mistakes from '@/components/Mistakes'
import Collocations from '@/components/Collocations'
import Search from '@/components/Search'
import WebImages from '@/components/WebImages'

export default {
  components: {
    Grammar,
    Search,
    Mistakes,
    Collocations,
    WebImages,
    Concordance
  },
  props: {
    method: {
      type: String
    },
    args: {
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    route() {
      $('#chinesezerotohero')[0].scrollIntoView()
    }
  },
  watch: {
    args() {
      if (this.$route.name === 'dictionary') {
        this.route()
      }
    }
  },
  mounted() {
    if (this.$route.name === 'phrase') {
      this.route()
    }
  }
}
</script>

<style></style>
