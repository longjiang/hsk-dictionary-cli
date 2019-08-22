<template>
  <div :id="id || `collocation-${type}`">
    <div class="label song-label mb-3">{{ title }}</div>
    <div v-if="collocation">
      <PinyinButton class="mt-3 mb-3" />
      <ul class="collapsed gramrel pl-0" data-collapse-target>
        <li
          v-for="Word in collocation.Words"
          v-if="Word.cm"
          class="gramrel-item list-unstyled"
        >
          <span
            v-html="Helper.highlight(Word.cm.replace(/ /gi, ''), word, level)"
          ></span>
        </li>
      </ul>
      <ShowMoreButton
        :data-bg-hsk="level"
        :length="collocation.Words.length"
        :min="4"
      />
    </div>
    <div v-else>No collocation.</div>
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
  beforeMount() {
    if (this.collocation && this.collocation.Words) {
      this.collocation.Words = this.collocation.Words
      .sort(
        (a, b) => a.cm.length - b.cm.length
      )
        .filter(Word => !Word.cm.match(/(。|？)/))
        .slice(0, 20)
    }
  },
  data() {
    return {
      Helper
    }
  }
}
</script>
