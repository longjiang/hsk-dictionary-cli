<template>
  <div v-cloak :key="browseKey"></div>
</template>

<script>
import $ from 'jquery'
import Helper from '@/lib/helper'
import Dewey from '@/lib/dewey'

export default {
  data() {
    return {
      books: undefined,
      browseKey: 0
    }
  },
  mounted() {
    Helper.loaded(
      (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
        Dewey.load().then(() => {
          window.Dewey = Dewey
          console.log(Dewey.get('009'))
        })
      }
    )
  },
  methods: {}
}
</script>
