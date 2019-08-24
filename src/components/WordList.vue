<template>
  <div>
    <ul
      :class="{
        wordlist: true,
        collapsed: collapse > 0
      }"
      data-collapse-target
    >
      <li class="wordlist-item" v-for="word in words">
        <Star v-if="word && star === true" :word="word" class="mr-1"></Star>
        <a
          v-if="compareWith"
          :href="
            `#/compare/cedict/${compareWith.identifier},${word.identifier}`
          "
          class="btn btn-small mr-2"
          >Compare</a
        >
        <a
          v-if="word"
          :href="
            hsk
              ? `#/view/hsk/${word.hskId}`
              : `#/view/cedict/${word.identifier}`
          "
        >
          <span
            class="wordlist-item-word"
            :data-hsk="word.hsk"
            v-if="!highlight"
            ><span class="simplified">{{ word.simplified }}</span
            ><span class="traditional">{{ word.traditional }}</span></span
          ><span
            class="wordlist-item-word"
            v-if="highlight"
            v-html="Helper.highlight(word.simplified, highlight, word.hsk)"
          ></span
          ><span class="wordlist-item-word" v-if="traditional === true"
            >(<span class="traditional">{{ word.simplified }}</span
            ><span class="simplified">{{ word.traditional }}</span
            >)</span
          ><span class="wordlist-item-pinyin ml-1">{{ word.pinyin }}</span
          >&nbsp;
          <span v-if="word.definitions" class="wordlist-item-english">
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
    },
    star: {
      default: true
    },
    hsk: {
      default: false
    }
  }
}
</script>

<style>
.wordlist-item a {
  color: inherit;
}

.wordlist-item a:hover {
  text-decoration: none;
}

.wordlist-item-word {
  font-weight: bold;
  font-size: 1.4em;
}

.wordlist-item-english {
  font-style: italic;
  color: #aaa;
}
</style>
