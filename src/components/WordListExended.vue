<template>
  <div>
    <ul
      :class="{
        'word-list-ext': true,
        collapsed: collapse > 0
      }"
      data-collapse-target
    >
      <li class="word-list-ext-item text-center" v-for="word in words">
        <div>
          <div class="character-example-pinyin">
            <Star v-if="word && star === true" :word="word"></Star>
            {{ word.pinyin }}
            <Speak :text="word.simplified" />
          </div>
          <a
            v-if="word"
            :data-hsk="word.hsk"
            :href="`#/view/cedict/${word.identifier}`"
          >
            <div class="word-list-ext-item-word simplified">
              {{ word.simplified }}
            </div>
            <div class="word-list-ext-item-word traditional">
              {{ word.traditional }}
            </div>

          <div v-if="word.definitions" class="character-example-english">
            {{ word.definitions[0].text }}
          </div>
          </a>
        </div>
        <div class="word-list-ext-item-desc mt-2">
          <PinyinButton/>
          <div v-html="Helper.highlight(word.example, word.simplified, word.hsk)" class="word-list-ext-example"></div>
          <div class="character-example-english mt-1">{{ word.exampleTranslation}}</div>
        </div>
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
