<template>
  <div :key="'concordance-' + concordanceKey">
    <div class="label song-label">Sentences with “{{ text }}”</div>
    <div v-if="examples && examples.length > 0" class="mt-4">
      <PinyinButton class="mt-3" />
      <ul class="collapsed" data-collapse-target>
        <li v-for="example in examples">
          <span v-html="Helper.highlight(example, text, 'outside')"></span>
        </li>
      </ul>
      <ShowMoreButton :length="examples.length" :min="4" data-bg-hsk="outside" />
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import SketchEngine from '@/lib/sketch-engine'

export default {
  props: ['text'],
  data() {
    return {
      Helper,
      examples: [],
      // show: false,
      concordanceKey: 0
    }
  },
  mounted() {
    SketchEngine.concordance(this.text, response => {
      this.examples = response
      this.concordanceKey += 1
    })
  }
}
</script>