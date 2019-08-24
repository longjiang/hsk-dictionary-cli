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

<style>
.word-list-ext {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.word-list-ext-item {
  margin: 2rem;
  width: 20rem;
  margin: 2rem 1rem;
  flex: 1 0 auto;
  background: #fafafa;
  border-radius: 0.3rem;
  overflow: hidden;
  box-shadow: 3px 3px 25px rgba(0, 0, 0, 0.2);
  position: relative;
}

.word-list-ext-image {
  height: 15rem;
  object-fit: cover;
  width: 100%;
}

.word-list-ext-item a {
  color: inherit;
}

.word-list-ext-item a:hover {
  text-decoration: none;
}

.word-list-ext-item-body {
  padding: 2rem;
}

.word-list-ext-compare-btn,
.word-list-ext-related-btn {
  position: absolute;
  top: 10.5rem;
  width: calc(50% - 2.4rem);
}

.word-list-ext-compare-btn {
  left: 2rem;
}

.word-list-ext-related-btn {
  right: 2rem;
}

.word-list-ext-item-word {
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1.2;
}

.word-list-ext-example.add-pinyin {
  line-height: 1.8;
}

.word-list-ext-example {
  font-weight: bold;
  font-size: 1.4rem;
}

.word-list-ext-item:not(:hover) .word-list-ext-cycle,
.word-list-ext-item:not(:hover) .word-list-ext-compare-btn,
.word-list-ext-item:not(:hover) .word-list-ext-related-btn {
  display: none;
}

.word-list-ext-cycle .previous {
  left: 0;
  top: 5rem;
}

.word-list-ext-cycle .next {
  right: 0;
  top: 5rem;
}

.word-list-ext-item-head {
  position: relative;
  height: 15rem;
  background-color: white;
}

.word-list-ext-cycle .paginate-button img {
  opacity: 0.5;
}

.word-list-ext-item-head .paginate-button.close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  opacity: 0.5;
}
</style>
