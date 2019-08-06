<template>
  <div
    id="loader"
    v-if="
      !LoadedAnnotator || !LoadedHSKCEDICT || !loadedGrammar || !LoadedHanzi
    "
  >
    <div class="heartbeat-loader mb-4"></div>
    <div v-if="LoadedAnnotator">
      <i class="glyphicon glyphicon-check"></i> Annotator Loaded
    </div>
    <div v-if="!LoadedAnnotator">
      <i class="glyphicon glyphicon-unchecked"></i> Annotator Loading...
    </div>
    <div v-if="LoadedHSKCEDICT">
      <i class="glyphicon glyphicon-check"></i> HSK+CEDICT Dictionary Loaded
    </div>
    <div v-if="!LoadedHSKCEDICT">
      <i class="glyphicon glyphicon-unchecked"></i> HSK+CEDICT Dictionary
      Loading (~5MB)...
    </div>
    <div v-if="loadedGrammar">
      <i class="glyphicon glyphicon-check"></i> Grammar Library Loaded
    </div>
    <div v-if="!loadedGrammar">
      <i class="glyphicon glyphicon-unchecked"></i> Grammar Library Loading...
    </div>
    <div v-if="LoadedHanzi">
      <i class="glyphicon glyphicon-check"></i> "Make Me a Hanzi" Library Loaded
    </div>
    <div v-if="!LoadedHanzi">
      <i class="glyphicon glyphicon-unchecked"></i> "Make Me a Hanzi" library
      Loading...
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
export default {
  watch: {},
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
