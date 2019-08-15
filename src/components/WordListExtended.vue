<template>
  <div>
    <ul
      :key="listKey"
      :class="{
        'word-list-ext': true,
        collapsed: collapse > 0
      }"
      data-collapse-target
    >
      <WordCard
        tag="li"
        v-for="(word, index) in words"
        :word="word"
        :index="index"
      />
    </ul>
    <ShowMoreButton
      v-if="collapse > 0"
      :length="words.length"
      :min="collapse"
    />
  </div>
</template>
<script>
import WordCard from '@/components/WordCard'

export default {
  components: {
    WordCard
  },
  data() {
    return {
      listKey: 0
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
