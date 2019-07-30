<template>
  <div class="main mt-4 mb-4 container" v-cloak>
    <div class="row">
      <div class="col-sm-12">
        <div id="questions-wrapper">
          <div v-if="!started" class="questions-prompt">
            <h4 class="page-title">Learn Words</h4>
            <p>Get familiar with words by engaging with them.</p>
            <button
              v-on:click="showSet()"
              class="btn btn-success"
              id="another-set-btn"
            >
              Start Learning
            </button>
          </div>
          <div v-if="started" id="questions">
            <div class="questions-prompt">
              <div class="prompt">
                <b>Keep scrolling down</b> for questions and answers
              </div>
              <i class="glyphicon glyphicon-arrow-down scroll-down-arrow"></i>
            </div>
            <Question
              :type="randomQuestionType()"
              v-for="(word, index) in words"
              :id="`question-${Helper.uniqueId()}`"
              :word="word"
            ></Question>
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
import Question from '@/components/Question.vue'
import SketchEngine from '@/lib/sketch-engine'
import Loader from '@/lib/loader'
import Helper from '@/lib/helper'
import CEDICT from '@/lib/cedict'
import Normalizer from '@/lib/normalizer'

export default {
  template: '#learn-template',
  components: {
    Question
  },
  data() {
    return {
      Helper,
      started: false,
      words: [],
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
    showSet() {
      const words = this.$store.state.savedWords.map(([traditional, pinyin]) =>
        Normalizer.normalize(CEDICT.get(traditional, pinyin))
      )
      this.words = []
      if (words.length > 0) {
        this.started = true
        this.words = words
        $([document.documentElement, document.body]).animate(
          {
            scrollTop: $('#questions-wrapper').offset().top
          },
          1000
        )
      }
    },
    loadWordSketches(words, callback) {
      let goals = []
      for (let word of words) {
        if (!word.sketch) {
          const goal = goals.length
          goals.push(goal)
          SketchEngine.wsketch(word.simplified, function(response) {
            loader.loaded(goal)
            word.sketch = response
          })
        }
      }
      const loader = new Loader(goals, () => {
        callback(words)
      })
    }
  }
}
</script>
