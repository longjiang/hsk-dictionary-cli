<template>
  <div class="question" :id="id">
    <div class="question-fill-in-the-blank" v-if="type === 'fill-in-the-blank'">
      <div class="question-slide-aspect">
        <div class="question-slide" :id="`${id}-slide-1`">
          <div class="question-prompt mb-4">
            How do you write this character?
          </div>
          <div class="text-center big-word-pinyin" :data-hsk="word.book">
            {{ word.pinyin }}
          </div>
          <div
            class="text-center big-word"
            :data-hsk="word.book"
            v-html="fillInTheBlankHTML(word.simplified)"
          ></div>
          <div class="text-center character-example-english mt-4">
            {{ word.definitions[0].text }}
          </div>
        </div>
      </div>
      <div class="question-slide-aspect">
        <div class="question-slide answer" :id="`${id}-slide-2`">
          <div class="text-center big-word-pinyin" :data-hsk="word.book">
            {{ word.pinyin }}
          </div>
          <div class="text-center big-word" :data-hsk="word.book">
            {{ word.simplified }}
          </div>
          <div class="text-center character-example-english mt-4">
            {{ word.definitions[0].text }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="question-make-sentence"
      v-if="word.example && type === 'make-a-sentence'"
    >
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
    <div class="question-decomposition" v-if="type === 'decomposition'">
      <div
        class="question-slide-aspect"
        v-for="rc in [randomChar(word.simplified)]"
      >
        <div class="question-slide" :id="`question-${id}-slide-1`">
          <div :data-hsk="word.book" class="text-center big-word-pinyin mb-4">
            {{ word.pinyin }}
          </div>
          <div class="decomposition-word">
            <span
              v-if="rc.before !== ''"
              class="decomposition-before"
              v-html="Helper.highlight(rc.before, rc.before, word.book)"
            ></span>
            <decomposition :char="rc.char"></decomposition>
            <span
              class="decomposition-after"
              v-if="rc.after !== ''"
              v-html="Helper.highlight(rc.after, rc.after, word.book)"
            ></span>
          </div>
          <div class="text-center character-example-english mt-4">
            {{ word.definitions[0].text }}
          </div>
        </div>
      </div>
      <div
        class="question-slide-aspect"
        v-for="rc in [randomChar(word.simplified)]"
      >
        <div class="question-slide" :id="`question-${id}-slide-2`">
          <div :data-hsk="word.book" class="text-center big-word-pinyin">
            {{ word.pinyin }}
          </div>
          <div class="big-word" :data-hsk="word.book">
            {{ word.simplified }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="question-collocation"
      v-if="
        type === 'collocation' &&
          word.sketch &&
          gramrel(word.sketch.Gramrels, 'SentObject_of')
      "
    >
      <div class="question-slide-aspect">
        <div class="question-slide" :id="`question-${id}-slide-1`">
          <div class="question-prompt mb-4">What do you think this means?</div>
          <div>
            <button
              class="show-more mb-1"
              v-on:click="Helper.showPinyinClick"
              :data-target-selector="`#${id}-slide-1 .big-word`"
            >
              Show Pinyin
            </button>
          </div>
          <div
            class="text-center big-word"
            v-html="
              Helper.highlight(
                gramrel(word.sketch.Gramrels, 'SentObject_of').Words[0].cm,
                word.simplified,
                word.book
              )
            "
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Decomposition from './Decomposition.vue'
import Helper from '@/lib/helper'
import Config from '@/lib/config'
import $ from 'jquery'

export default {
  props: ['id', 'word', 'type'],
  components: {
    decomposition: Decomposition
  },
  data() {
    return {
      Helper,
      Config
    }
  },
  mounted() {
    $(`#${this.id} .decomposition`).each(function() {
      let $characters = $(this).find('.part-character')
      let character =
        $characters[Math.floor(Math.random() * $characters.length)]
      $(character)
        .parent()
        .addClass('hide')
      $(this).click(function() {
        if ($(this).is('.decomposition')) {
          $(this).toggleClass('show-answer')
        } else {
          $(this)
            .parents('.decomposition')
            .toggleClass('show-answer')
        }
      })
    })
  },
  methods: {
    fillInTheBlankHTML(word) {
      const index = Math.floor(Math.random() * word.length)
      return this.replaceAtIndex(
        word,
        index,
        '<span class="question-blank" contenteditable="true"></span>'
      )
    },
    replaceAtIndex(string, index, replacement) {
      return string.substr(0, index) + replacement + string.substr(index + 1)
    },
    gramrel(Gramrels, name) {
      if (Gramrels) {
        return Gramrels.find(function(Gramrel) {
          return Gramrel.name === name
        })
      }
    },
    randomChar(word) {
      const index = Math.floor(Math.random() * word.length)
      return {
        before: word.slice(0, index),
        char: word[index],
        after: word.slice(index + 1)
      }
    }
  }
}
</script>
