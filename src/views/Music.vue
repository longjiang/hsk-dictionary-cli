<template>
  <div class="music">
    <div class="container main mt-5 mb-5">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center mb-5">Chinese Music</h1>
          <Search
            placeholder="Lookup a song or artist"
            type="generic"
            :defaultURL="text => `#/music/search/${text}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import Search from '@/components/Search'
import $ from 'jquery'

export default {
  components: {
    Search
  },
  data() {
    return {
      entry: undefined,
      characters: [],
      character: {},
      unsplashSrcs: [],
      unsplashSearchTerm: '',
      entryKey: 0 // used to force re-render this component
    }
  },
  methods: {
    route() {
      $('#chinesezerotohero')[0].scrollIntoView()
      if (this.$route.params.method && this.$route.params.arg) {
        const method = this.$route.params.method
        const arg = this.$route.params.arg
        if (method === 'hsk') {
        } else {
        }
      }
    }
  },
  watch: {
    $route() {
      if (this.$route.name === 'dictionary') {
        this.route()
      }
    }
  },
  mounted() {
    if (this.$route.name === 'dictionary') {
      this.route()
    }
  }
}
</script>

<style></style>
