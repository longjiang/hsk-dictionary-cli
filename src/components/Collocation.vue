<template>
  <div :id="id || `collocation-${type}`">
    <h6>{{ title }}</h6>
    <hr class="mt-0 mb-2">
    <div v-if="collocation">
      <ul class="collapsed gramrel pl-0" data-collapse-target>
        <Annotate
          v-for="Word in collocation.Words"
          v-if="Word.cm"
          class="gramrel-item list-unstyled"
          :speak="true"
          :copy="true"
          :showDef="true"
          :fullscreen="true"
          tag="li"
        >
          <span
            v-html="Helper.highlight(Word.cm.replace(/ /gi, ''), word, level)"
          ></span>
        </Annotate>
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
