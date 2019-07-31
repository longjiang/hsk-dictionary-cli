<template>
  <div class="question-make-sentence" v-if="word.example" :id="id">
    <div class="question-slide-aspect">
      <div class="question-slide" :id="`${id}-slide-1`">
        <div class="question-prompt mb-4">
          How do you use this word in a sentence?
        </div>
        <div>
          <button
            class="show-more mb-1"
            v-on:click="Helper.showPinyinClick"
            :data-target-selector="`#${id}-slide-1 .big-word`"
          >
            Show Pinyin
          </button>
          <Speak :text="word.simplified" class="ml-2"></Speak>
        </div>
        <div class="text-center big-word" :data-hsk="word.book">
          {{ word.simplified }}
        </div>
        <div class="text-center character-example-english mt-4">
          {{ word.definitions[0].text }}
        </div>
        <div
          class="text-center mt-4 question-blank-sentence"
          contenteditable="true"
        ></div>
      </div>
    </div>
    <div class="question-slide-aspect">
      <div class="question-slide answer" :id="`${id}-slide-2`">
        <div>
          <img
            :src="`${Config.imageUrl}${word.id}-${word.simplified}.jpg`"
            class="question-image mb-4"
          />
        </div>
        <div>
          <button
            class="show-more mb-4"
            v-on:click="Helper.showPinyinClick"
            :data-target-selector="`#${id}-slide-2 .example-sentence-word`"
          >
            Show Pinyin
          </button>
          <Speak :text="word.example" class="ml-2"></Speak>
        </div>
        <div
          class="text-center example-sentence-word mb-4"
          v-html="Helper.highlight(word.example, word.simplified, word.book)"
        >
          {{ word.example }}
        </div>
        <div class="text-center character-example-english">
          {{ word.exampleTranslation }}
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
      Config
    }
  },
  mounted() {},
  methods: {}
}
</script>
