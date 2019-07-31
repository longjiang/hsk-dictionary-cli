<template>
  <div class="main mt-4 mb-4 container" v-cloak>
    <div class="row">
      <div class="col-sm-12">
        <h4 class="page-title mb-4" v-if="method === 'saved'">
          Learn the words you saved
        </h4>
        <h4 class="page-title mb-4" v-if="method === 'hsk'">
          <b :data-hsk="args[0]">HSK {{ args[0] }}</b>
          <b> Lesson {{ args[1] }}</b> (Part {{ args[2] }}) Vocabulary
        </h4>
        <WordList :words="words"></WordList>
        <Questions :words="words" :book="args[0]"></Questions>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import CEDICT from '@/lib/cedict'
import Normalizer from '@/lib/normalizer'
import WordList from '@/components/WordList.vue'
import Questions from '@/components/Questions.vue'
import HSK from '@/lib/hsk'

export default {
  components: {
    WordList,
    Questions
  },
  data() {
    return {
      Helper,
      started: false,
      words: [],
      method: '',
      args: [],
      questionTypes: [
        'fill-in-the-blank',
        'make-a-sentence',
        'collocation',
        'decomposition'
      ]
    }
  },
  methods: {
    beforeMount() {
      this.route()
    },
    route() {
      if (this.$route.params.method && this.$route.params.args) {
        this.method = this.$route.params.method
        this.args = this.$route.params.args.split(',')
        if (this.method == 'saved') {
          this.words = this.$store.state.savedWords.map(
            ([traditional, pinyin]) =>
              Normalizer.normalize(CEDICT.get(traditional, pinyin))
          )
          return
        } else if (this.method == 'hsk') {
          this.words = HSK.getByBookLessonDialog(
            this.args[0],
            this.args[1],
            this.args[2]
          ).map(word => Normalizer.normalize(word))
          return
        }
      }
      location.hash = '/learn/saved'
    }
  },
  watch: {
    $route() {
      if (this.$route.name === 'learn') {
        this.route()
      }
    }
  },
  mounted() {
    if (this.$route.name === 'learn') {
      this.route()
    }
  }
}
</script>
