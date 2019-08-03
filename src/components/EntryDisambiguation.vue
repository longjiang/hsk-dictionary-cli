<template>
  <div v-if="similarWords.length > 0">
    <h5>Disambiguation</h5>
    <WordList :words="similarWords"></WordList>
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
      return this.getReverse().concat(this.getHomonyms())
    }
  },
  methods: {
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
