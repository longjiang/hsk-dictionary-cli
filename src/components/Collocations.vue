<template>
  <div v-if="collocation" :id="id || `collocation-${type}`">
    <div class="label song-label mb-2">{{ title }}</div>
    <PinyinButton class="mt-3 mb-3" />
    <ul class="character-examples collapsed gramrel" data-collapse-target>
      <li
        v-for="Word in collocation.Words"
        v-if="Word.cm"
        class="character-example gramrel-item"
      >
        <span
          v-html="Helper.highlight(Word.cm.replace(/ /gi, ''), word, level)"
          class="character-example-word"
        ></span>
      </li>
    </ul>
    <ShowMoreButton
      :data-bg-hsk="level"
      :length="collocation.Words.length"
      :min="4"
    />
  </div>
</template>

<script>
import Helper from '@/lib/helper'

export default {
  props: {
    word: {
      type: String
    },
    level: {
      type: String
    },
    type: {
      type: String
    },
    title: {
      type: String
    },
    collocation: {
      type: Object
    },
    id: {
      default: undefined
    }
  },
  data() {
    return {
      Helper
    }
  }
}
</script>
