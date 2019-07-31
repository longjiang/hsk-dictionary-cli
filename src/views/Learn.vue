<template>
  <div class="main mt-4 mb-4 container" v-cloak>
    <div class="row">
      <div class="col-sm-12">
        <div id="questions-wrapper">
          <div v-if="!started" class="questions-prompt">
            <h4 class="page-title">Learn The Words You Saved</h4>
            <p>Get familiar with words by engaging with them.</p>
            <button
              v-on:click="showSet()"
              class="btn btn-success"
              id="another-set-btn"
            >
              Start Learning
            </button>
          </div>
          <div v-if="started" id="questions" :key="wordsKey">
            <div class="questions-prompt">
              <div class="prompt">
                <b>Keep scrolling down</b> for questions and answers
              </div>
              <i class="glyphicon glyphicon-arrow-down scroll-down-arrow"></i>
            </div>
            <div v-for="(word, index) in words">
              <DecompositionQuestion
                :word="word"
                :id="`word-${index}-decomposition-1`"
              ></DecompositionQuestion>
              <FillInTheBlankQuestion
                :word="word"
                :id="`word-${index}-fill-in-the-blank`"
              ></FillInTheBlankQuestion>
              <CollocationQuestion
                :word="word"
                :id="`word-${index}-collocation`"
              ></CollocationQuestion>
              <MakeSentenceQuestion
                :word="word"
                :id="`word-${index}-make-sentence`"
              ></MakeSentenceQuestion>
            </div>
            <div class="questions-prompt">
              <div class="prompt">
                <img src="img/trophy.svg" class="trophy" />
                <p class="mt-4 mb-4">The End!</p>
              </div>
              <button
                v-on:click="showSet()"
                class="btn btn-success"
                id="another-set-btn"
              >
                Try Another Set
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Helper from '@/lib/helper'
import CEDICT from '@/lib/cedict'
import Normalizer from '@/lib/normalizer'
import CollocationQuestion from '@/components/questions/CollocationQuestion.vue'
import DecompositionQuestion from '@/components/questions/DecompositionQuestion.vue'
import FillInTheBlankQuestion from '@/components/questions/FillInTheBlankQuestion.vue'
import MakeSentenceQuestion from '@/components/questions/MakeSentenceQuestion.vue'
import HSK from '@/lib/hsk'

export default {
  template: '#learn-template',
  components: {
    CollocationQuestion,
    DecompositionQuestion,
    FillInTheBlankQuestion,
    MakeSentenceQuestion
  },
  data() {
    return {
      Helper,
      started: false,
      words: [],
      wordsKey: 0,
      questionTypes: [
        'fill-in-the-blank',
        'make-a-sentence',
        'collocation',
        'decomposition'
      ]
    }
  },
  methods: {
    randomQuestionType() {
      return this.questionTypes[
        Math.floor(Math.random() * this.questionTypes.length)
      ]
    },
    learnWords(words) {
      this.words = words
      this.wordsKey += 1
      if (words.length > 0) {
        this.started = true
        $([document.documentElement, document.body]).animate(
          {
            scrollTop: $('#questions-wrapper').offset().top
          },
          1000
        )
      }
    },
    route() {
      if (this.$route.params.method && this.$route.params.args) {
        const method = this.$route.params.method
        const args = this.$route.params.args.split(',')
        if (method == 'saved') {
          const words = this.$store.state.savedWords.map(
            ([traditional, pinyin]) =>
              Normalizer.normalize(CEDICT.get(traditional, pinyin))
          )
          this.learnWords(words)
        } else if (method == 'hsk') {
          const lesson = args[0]
          const dialog = args[1]
          const words = HSK.getByLessonDialog(args[0], args[1]).map(word =>
            Normalizer.normalize(word)
          )
          this.learnWords(words)
        }
      }
      location.hash = '/learn/saved'
    }
  }
}
</script>
