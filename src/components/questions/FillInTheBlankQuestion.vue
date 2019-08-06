<template>
  <div class="question" v-if="word" :id="id">
    <div class="question-fill-in-the-blank">
      <div class="question-slide-aspect">
        <div class="question-slide" :id="`${id}-slide-1`">
          <div class="question-prompt mb-4">
            How do you write this character?
          </div>
          <div class="text-center big-word-pinyin" :data-hsk="word.hsk">
            {{ word.pinyin }}
            <Speak :text="word.simplified"></Speak>
          </div>
          <div
            class="text-center big-word"
            :data-hsk="word.hsk"
            v-if="split"
            v-html="fillInTheBlankHTML()"
          ></div>
          <div class="text-center character-example-english mt-4">
            {{ word.definitions[0].text }}
          </div>
        </div>
      </div>
      <div class="question-slide-aspect">
        <div class="question-slide answer" :id="`${id}-slide-2`">
          <div class="text-center big-word-pinyin" :data-hsk="word.hsk">
            {{ word.pinyin }}
            <Speak :text="word.simplified"></Speak>
          </div>
          <div class="decomposition-word">
            <span
              v-if="split && split.before"
              class="decomposition-before"
              v-html="Helper.highlight(split.before, split.before, word.hsk)"
            ></span>
            <StrokeOrder v-if="split" :char="split.char" />
            <span
              v-if="split && split.after"
              class="decomposition-after"
              v-html="Helper.highlight(split.after, split.after, word.hsk)"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import Config from '@/lib/config'
import $ from 'jquery'

export default {
  props: ['id', 'word', 'type'],
  components: {},
  data() {
    return {
      Helper,
      Config,
      split: undefined
    }
  },
  beforeMount() {
    if (this.word) {
      this.split = this.randomChar(this.word.simplified)
    }
  },
  methods: {
    fillInTheBlankHTML() {
      return `${
        this.split.before
      }<span class="question-blank" contenteditable="true"></span>${
        this.split.after
      }`
    },
    randomChar(word) {
      const index = Math.floor(Math.random() * word.length)
      return {
        before: word.slice(0, index),
        char: word[index],
        after: word.slice(index + 1)
      }
    },
    replaceAtIndex(string, index, replacement) {
      return string.substr(0, index) + replacement + string.substr(index + 1)
    }
  }
}
</script>
