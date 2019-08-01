<template>
  <div id="questions-wrapper">
    <div v-if="!started" class="questions-prompt">
      <p>Get familiar with these words by engaging with them.</p>
      <button
        v-on:click="startClick()"
        class="btn"
        :data-bg-hsk="book"
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
          v-on:click="tryAnotherClick()"
          class="btn"
          :data-bg-hsk="book"
          id="another-set-btn"
        >
          Try Another Set
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import CollocationQuestion from '@/components/questions/CollocationQuestion.vue'
import DecompositionQuestion from '@/components/questions/DecompositionQuestion.vue'
import FillInTheBlankQuestion from '@/components/questions/FillInTheBlankQuestion.vue'
import MakeSentenceQuestion from '@/components/questions/MakeSentenceQuestion.vue'
import WordList from '@/components/WordList.vue'
export default {
  props: {
    words: Array,
    book: {
      type: String,
      default: 'outside'
    }
  },
  components: {
    CollocationQuestion,
    DecompositionQuestion,
    FillInTheBlankQuestion,
    WordList,
    MakeSentenceQuestion
  },
  data() {
    return {
      started: false,
      wordsKey: 0
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
    regenQuestions() {
      let words = this.words
      this.words = []
      this.wordsKey += 1
      this.words = words
      this.wordsKey += 1
    },
    tryAnotherClick() {
      this.regenQuestions()
      if (this.words.length > 0) {
        $([document.documentElement, document.body]).animate(
          {
            scrollTop: $('#questions-wrapper').offset().top
          },
          1000
        )
      }
    }
  }
}
</script>
