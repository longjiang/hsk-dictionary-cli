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
import WordList from '@/components/WordList.vue'

export default {
  components: {
    WordList
  },
  props: ['entry'],
  mounted() {
    if (this.entry.simplified.length > 1) {
      this.getReverse()
      this.getHomonyms()
    } else {
      this.getOtherPronunciations()
    }
  },
  data() {
    return {
      similarWords: []
    }
  },
  methods: {
    getOtherPronunciations() {
      return HSKCEDICT.lookupSimplified(
        words => {
          for (let word of words) {
            if (word.identifier !== this.entry.identifier) {
              this.similarWords.push(word)
            }
          }
        },
        [this.entry.simplified]
      )
    },
    getReverse() {
      const reverse = this.entry.simplified
        .split('')
        .reverse()
        .join('')
      return HSKCEDICT.lookupSimplified(
        words => {
          for (let word of words) {
            this.words.push(word)
          }
        },
        [reverse]
      )
    },
    getHomonyms() {
      return HSKCEDICT.lookupPinyinFuzzy(
        words => {
          for (let word of words) {
            if (word.identifier !== this.entry.identifier) {
              this.words.push(word)
            }
          }
        },
        [this.entry.pinyin]
      )
    }
  }
}
</script>
