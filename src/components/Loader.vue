<template>
  <div id="loader" class="text-center mb-5" v-if="test()">
    <div class="heartbeat-loader mb-4"></div>
    <div>Loading</div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
export default {
  props: {
    sticky: {
      default: 'false'
    }
  },
  methods: {
    test() {
      if (this.sticky === 'true') {
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
