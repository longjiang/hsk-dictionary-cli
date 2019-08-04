<template>
  <div class="container" :key="'related-' + relatedKey">
    <div class="row mt-5" v-if="entry.related && entry.related.length > 0">
      <div class="col-sm-12">
        <div class="label song-label mb-2">
          Words related to “{{ entry.simplified }}”
        </div>
        <WordList
          :words="entry.related"
          class="related"
          :compareWith="entry"
          collapse="10"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CEDICT from '@/lib/cedict'
import SketchEngine from '@/lib/sketch-engine'
import Helper from '@/lib/helper'
import Normalizer from '@/lib/normalizer'

export default {
  props: ['entry'],
  data() {
    return {
      Helper,
      relatedKey: 0
    }
  },
  mounted() {
    SketchEngine.thesaurus(this.entry.simplified, response => {
      this.entry.related = []
      if (response) {
        for (let Word of response.Words) {
          let word = CEDICT.lookupSimplified(Word.word)[0]
          if (word) {
            word = Normalizer.normalize(word)
            this.entry.related.push(word)
          }
        }
        this.relatedKey += 1
      }
    })
  }
}
</script>

<style>
.related .saved-words.collapsed li {
  display: block;
}

.related .saved-words.collapsed li:nth-child(n + 11) {
  display: none;
}
</style>
