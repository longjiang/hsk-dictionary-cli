<template>
  <div :key="'grammar-' + grammarKey">
    <div
      class="text-center"
      v-if="entry.grammarPoints && entry.grammarPoints.length > 0"
    >
      <div class="label song-label mb-2">Grammar notes</div>
      <div class="grammar-notes" id="grammar">
        <GrammarPoint v-for="grammar in entry.grammarPoints" :grammar="grammar" />
      </div>
    </div>
  </div>
</template>
<script>
import Helper from '@/lib/helper'
import Grammar from '@/lib/grammar'
import GrammarPoint from '@/components/GrammarPoint'

export default {
  props: ['entry'],
  components: {
    GrammarPoint,
  },
  data() {
    return {
      Helper,
      grammarKey: 0
    }
  },
  mounted() {
    this.entry.grammarPoints = Grammar.lookupFuzzy(this.entry.simplified)
    this.grammarKey += 1
  }
}
</script>
