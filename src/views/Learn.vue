<template>
  <div class="main mt-4 mb-4 container" v-cloak>
    <div class="row">
      <div class="col-sm-12">
        <h4 class="page-title mb-4" v-if="method === 'saved'">
          Learn the words you saved
        </h4>
        <h4 class="page-title mb-4" v-if="method === 'hsk'">
          Learn the words in HSK {{ args[0] }} Lesson {{ args[1] }} Part
          {{ args[2] }}
        </h4>
        <div id="questions-wrapper">
          <div v-if="!started" class="questions-prompt">
            <p>Get familiar with words by engaging with them.</p>
            <button
              v-on:click="startClick()"
              class="btn btn-success"
              :data-bg-hsk="args[0]"
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
    randomQuestionType() {
      return this.questionTypes[
        Math.floor(Math.random() * this.questionTypes.length)
      ]
    },
    startClick() {
      this.started = true
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
