<template>
  <div class="container concordance" :key="'concordance-' + concordanceKey">
    <div class="row mb-5" v-if="entry.examples && entry.examples.length > 0">
      <div class="col-sm-12">
        <div class="label song-label mb-2">
          Sentences with “{{ entry.simplified }}”
        </div>
        <PinyinButton class="mt-1" keep="true" :selector="`#examples`" />
        <ul
          class="character-examples collapsed"
          id="examples"
          data-collapse-target
        >
          <li
            class="character-example"
            v-for="example in entry.examples.slice(0, 100)"
          >
            <span
              class="character-example-word"
              v-html="Helper.highlight(example, entry.simplified, entry.book)"
            ></span>
          </li>
        </ul>
        <button
          v-if="entry.examples.length > 4"
          class="show-more collapsed"
          v-on:click="Helper.showMoreClick"
          title="Show all examples"
          :data-bg-hsk="entry.book"
        >
          <span class="label-expand"
            >Show {{ Math.min(entry.examples.length, 100) - 4 }} more</span
          >
          <span class="label-collapse">Collapse</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import SketchEngine from '@/lib/sketch-engine'

export default {
  props: ['entry'],
  data() {
    return {
      Helper,
      concordanceKey: 0
    }
  },
  mounted() {
    SketchEngine.concordance(this.entry.simplified, response => {
      this.entry.examples = response.slice(0, 25)
      this.concordanceKey += 1
    })
  }
}
</script>
