<template>
  <div class="main mt-4 mb-4 container" v-cloak>
    <div class="row">
      <div class="col-sm-12" :key="learnKey">
        <p
          v-if="started && words.length === 0"
          class="alert alert-warning no-saved-words"
        >
          You don't have any words saved yet. First, save some words by clicking
          on the
          <i class="glyphicon glyphicon-star-empty"></i> next to it. Then come
          back and click the button again.
        </p>
        <div id="questions-wrapper">
          <div v-if="!shown" class="questions-prompt">
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
          <div v-if="shown" id="questions">
            <div class="questions-prompt">
              <div class="prompt">
                <b>Keep scrolling down</b> for questions and answers
              </div>
              <i class="glyphicon glyphicon-arrow-down scroll-down-arrow"></i>
            </div>
            <question
              :type="randomQuestionType()"
              v-for="(word, index) in words"
              :word="word"
              :id="`question-${Helper.uniqueId()}`"
            ></question>
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
import SavedWords from '@/lib/saved-words'
import SketchEngine from '@/lib/sketch-engine'
import Loader from '@/lib/loader'

export default {
  template: '#learn-template',
  components: {
    Question
  },
  data() {
    return {
      learnKey: 0, // used to force re-render this component
      savedWordsKey: 0,
      started: false,
      shown: false,
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
      const words = SavedWords.list()
      this.started = true
      this.learnKey += 1
      if (words.length > 0) {
        this.words = []
        this.loadWordSketches(words, words => {
          this.words = words
          this.shown = true
          this.learnKey += 1
          $([document.documentElement, document.body]).animate(
            {
              scrollTop: $('#questions-wrapper').offset().top
            },
            1000
          )
        })
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
