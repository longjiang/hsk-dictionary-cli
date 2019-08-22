<template>
  <div :key="'concordance-' + concordanceKey">
    <div class="label song-label">
      Sentences with “{{ text }}”
    </div>
    <div v-if="examples && examples.length > 0" class="mt-4">
      <ul v-if="examples" class="collapsed" data-collapse-target>
        <Annotate tag="li" v-for="example in examples">
          <span v-html="Helper.highlight(example, text, level)"></span>
        </Annotate>
      </ul>
      <ShowMoreButton :length="examples.length" :min="4" :data-bg-hsk="level" />
    </div>
    <div v-if="examples && examples.length === 0" class="jumbotron-fluid bg-light text-center p-4">
      Sorry, we could not find any examples of “{{ text }}”
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import SketchEngine from '@/lib/sketch-engine'

export default {
  props: {
    text: {
      type: String
    },
    level: {
      default: 'outside'
    }
  },
  data() {
    return {
      Helper,
      examples: undefined,
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
