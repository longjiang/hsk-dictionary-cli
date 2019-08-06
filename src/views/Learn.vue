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
        <div v-if="words.length > 0">
          <Questions
            :words="words"
            :book="args[0] ? args[0] : words[0].hsk"
          ></Questions>
          <h5 class="mt-4 mb-2">Words to learn:</h5>
          <WordList :words="words" style="column-count: 2"></WordList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WordList from '@/components/WordList.vue'
import Questions from '@/components/Questions.vue'

export default {
  components: {
    WordList,
    Questions
  },
  data() {
    return {
      started: false,
      words: [],
      wordIds: [],
      method: false,
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
      $('#hsk-dictionary')[0].scrollIntoView()
      if (this.$route.params.method) {
        this.method = this.$route.params.method
        if (this.method == 'saved') {
          this.wordIds = this.$store.state.savedWords
          for (let item of this.wordIds) {
            let identifier = item.join(',').replace(/ /g, '_')
            HSKCEDICT.getByIdentifier(
              entry => {
                this.words.push(entry)
              },
              [identifier]
            )
          }
          return
        } else if (this.method == 'hsk' && this.$route.params.args) {
          this.args = this.$route.params.args.split(',')
          HSKCEDICT.getByBookLessonDialog(
            words => {
              this.words = words
            },
            [this.args[0], this.args[1], this.args[2]]
          )
          return
        }
      } else {
        if (this.method) return
        location.hash = '/learn/saved'
      }
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
    this.route()
  }
}
</script>
