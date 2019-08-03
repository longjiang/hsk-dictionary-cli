<template>
  <div>
    <ul
      :class="{
        'saved-words': true,
        collapsed: collapse > 0
      }"
      data-collapse-target
    >
      <li class="saved-words-item character-example" v-for="word in words">
        <Star :word="word"></Star>
        <a
          v-if="compareWith"
          :href="
            `#/compare/cedict/${compareWith.identifier},${word.identifier}`
          "
          class="btn btn-small mr-2"
          >Compare</a
        >
        <a :href="`#/view/cedict/${word.identifier}`">
          <span
            class="character-example-word"
            :data-hsk="word.book"
            v-if="!highlight"
            >{{ word.simplified }}</span
          >
          <span
            class="character-example-word"
            v-if="highlight"
            v-html="Helper.highlight(word.simplified, highlight, word.book)"
          ></span>
          <span class="character-example-word" v-if="traditional === true"
            >({{ word.traditional }})</span
          >
          &nbsp;
          <span class="character-example-pinyin">{{ word.pinyin }}</span
          >&nbsp;
          <span v-if="word.definitions" class="character-example-english">
            {{ word.definitions[0].text }}
          </span>
        </a>
      </li>
    </ul>
    <ShowMoreButton
      v-if="collapse > 0"
      :length="words.length"
      :min="collapse"
    />
  </div>
</template>
<script>
import Helper from '@/lib/helper'
export default {
  data() {
    return {
      Helper
    }
  },
  props: {
    words: {
      type: Array
    },
    compareWith: {
      default: false
    },
    traditional: {
      default: false
    },
    highlight: {
      default: false
    },
    collapse: {
      default: 0
    }
  }
}
</script>
