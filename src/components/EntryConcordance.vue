<template>
  <div :key="'concordance-' + concordanceKey">
    <div class="label song-label">
      Sentences with “
      <span class="simplified">{{ entry.simplified }}</span>
      <span class="traditional">{{ entry.traditional }}</span
      >”
    </div>
    <!-- <div v-if="!show" class="text-center pt-4 pb-4 lyrics-bar">
      <button class="btn show-more" :data-bg-hsk="entry.hsk" @click="showClick">
        Show Sentences
      </button>
    </div> -->

    <div
      v-if="entry.examples && entry.examples.length > 0"
      class="mt-4"
    >
      <PinyinButton class="mt-3" />
      <ul class="character-examples collapsed examples" data-collapse-target>
        <li
          class="character-example"
          v-for="example in entry.examples.slice(0, 100)"
        >
          <span
            class="character-example-word"
            v-html="Helper.highlight(example, entry.simplified, entry.hsk)"
          ></span>
        </li>
      </ul>
      <ShowMoreButton
        :length="entry.examples.length"
        :min="4"
        :data-bg-hsk="entry.hsk"
      />
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
      // show: false,
      concordanceKey: 0
    }
  },
  methods: {
    showClick() {
      this.show = true
    }
  },
  mounted() {
    SketchEngine.concordance(this.entry.simplified, response => {
      this.entry.examples = response.slice(0, 10)
      this.concordanceKey += 1
    })
  }
}
</script>
