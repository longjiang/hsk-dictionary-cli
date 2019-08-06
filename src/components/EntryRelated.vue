<template>
  <div class="container" :key="'related-' + relatedKey">
    <div class="row mt-5" v-if="words && words.length > 0">
      <div class="col-sm-12">
        <div class="label song-label mb-2">
          Words related to “{{ entry.simplified }}”
        </div>
        <WordList
          :words="words"
          class="related"
          :compareWith="entry"
          collapse="10"
        />
      </div>
    </div>
  </div>
</template>
<script>
import SketchEngine from '@/lib/sketch-engine'
import Helper from '@/lib/helper'

export default {
  props: ['entry'],
  data() {
    return {
      Helper,
      words: [],
      relatedKey: 0
    }
  },
  mounted() {
    SketchEngine.thesaurus(this.entry.simplified, response => {
      this.words = []
      if (response) {
        for (let Word of response.Words) {
          HSKCEDICT.lookupSimplified(
            words => {
              if (words.length > 0) {
                let word = words[0]
                this.words.push(word)
              }
            },
            [Word.word]
          )
        }
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
