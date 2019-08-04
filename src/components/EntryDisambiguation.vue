<template>
  <div class="container" v-if="similarWords.length > 0">
    <div class="row">
      <div class="col-sm-12">
        <div>
          <div class="label song-label">
            Compare with
          </div>
          <WordList
            class="mt-2"
            :words="similarWords"
            :compareWith="entry"
            :traditional="entry.simplified.length === 1"
          ></WordList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CEDICT from '@/lib/cedict'
import Normalizer from '@/lib/normalizer'
import WordList from '@/components/WordList.vue'

export default {
  components: {
    WordList
  },
  props: ['entry'],
  data() {
    return {}
  },
  computed: {
    similarWords() {
      if (this.entry.simplified.length > 1) {
        return this.getReverse().concat(this.getHomonyms())
      } else {
        return this.getOtherPronunciations()
      }
    }
  },
  methods: {
    getOtherPronunciations() {
      return CEDICT.lookupSimplified(this.entry.simplified)
        .map(word => Normalizer.normalize(word))
        .filter(word => word.identifier !== this.entry.identifier)
    },
    getReverse() {
      const reverse = this.entry.simplified
        .split('')
        .reverse()
        .join('')
      return CEDICT.lookupSimplified(reverse).map(word =>
        Normalizer.normalize(word)
      )
    },
    getHomonyms() {
      const words = CEDICT.lookupPinyinFuzzy(this.entry.pinyin)
      return words
        .map(word => Normalizer.normalize(word))
        .filter(word => word.identifier !== this.entry.identifier)
    }
  }
}
</script>
