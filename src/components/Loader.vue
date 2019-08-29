<template>
  <div id="loader" v-if="test()" class="d-inline-block text-center">
    <div class="heartbeat-loader mb-4"></div>
    <div>
      <slot>Loading</slot>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
export default {
  props: {
    sticky: {
      default: false
    }
  },
  methods: {
    test() {
      if (this.sticky) {
        return true
      } else {
        return (
          !this.LoadedAnnotator ||
          !this.LoadedHSKCEDICT ||
          !this.loadedGrammar ||
          !this.LoadedHanzi
        )
      }
    }
  },
  data() {
    return {
      LoadedAnnotator: undefined,
      LoadedHSKCEDICT: undefined,
      loadedGrammar: undefined,
      LoadedHanzi: undefined
    }
  },
  mounted() {
    Helper.loaded(
      (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
        this.LoadedAnnotator = LoadedAnnotator
        this.LoadedHSKCEDICT = LoadedHSKCEDICT
        this.loadedGrammar = loadedGrammar
        this.LoadedHanzi = LoadedHanzi
      }
    )
  }
}
</script>
<style>
</style>
