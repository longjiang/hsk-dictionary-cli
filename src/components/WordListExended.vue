<template>
  <div>
    <ul
      :class="{
        'word-list-ext': true,
        collapsed: collapse > 0
      }"
      data-collapse-target
    >
      <li :class="`word-list-ext-item text-center ${compareWith ? 'compare' : ''}`" v-for="word in words">
        <a v-if="word" :href="`#/view/cedict/${word.identifier}`">
          <div class="word-list-ext-item-head">
            <img
              :src="`${Config.imageUrl}${word.hskId}-${word.simplified}.jpg`"
              class="word-list-ext-image"
            />
          </div>
          <div class="word-list-ext-item-body">
            <div class="character-example-pinyin">
              <Star
                class="word-list-ext-item-head-star"
                v-if="word && star === true"
                :word="word"
              ></Star>
              {{ word.pinyin }}
              <Speak :text="word.simplified" />
            </div>
            <div
              :data-hsk="word.hsk"
              class="word-list-ext-item-word simplified"
            >
              {{ word.simplified }}
            </div>
            <div class="word-list-ext-item-word traditional">
              {{ word.traditional }}
            </div>

            <div v-if="word.definitions" class="character-example-english mb-2">
              {{ word.definitions[0].text }}
            </div>
            <PinyinButton />
            <div
              v-html="Helper.highlight(word.example, word.simplified, word.hsk)"
              class="word-list-ext-example"
            ></div>
            <div class="character-example-english mt-1">
              {{ word.exampleTranslation }}
            </div>
            <a
              v-if="compareWith"
              :href="
                `#/compare/cedict/${compareWith.identifier},${word.identifier}`
              "
              class="btn show-more word-list-ext-compare-btn mt-3"
              :data-bg-hsk="word.hsk"
              >Compare: <span class="simplified">{{compareWith.simplified}} vs {{word.simplified}}</span>
              <span class="traditional">{{compareWith.traditional}} vs {{word.traditional}}</span></a
            >
          </div>
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
import Config from '@/lib/config'

export default {
  data() {
    return {
      Helper,
      Config
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
