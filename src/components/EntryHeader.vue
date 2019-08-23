<template>
  <!-- ANCHOR img/anchors/entry.png  -->
  <div class="entry-head-wrapper text-center" v-if="entry">
    <div>
      <div v-if="entry.measureWords" style="display:inline-block">
        <div class="pinyin measure-word-pinyin">
          yī {{ entry.measureWords[0].pinyin }}
          <Speak class="ml-1" :text="'一' + entry.measureWords[0].simplified" />
        </div>
        <div class="word measure-word">
          一<span class="simplified">{{
            entry.measureWords[0].simplified
          }}</span
          ><span class="traditional">{{
            entry.measureWords[0].traditional
          }}</span>
        </div>
      </div>
      <div class="entry-word" style="display:inline-block">
        <div class="pinyin">
          <Star :word="entry"></Star>
          {{ entry.pinyin }}
          <Speak class="ml-1" :text="entry.simplified" />
        </div>
        <div class="word">
          <a :href="`#/view/cedict/${entry.identifier}`">
            <span v-bind:data-hsk="entry.hsk"
              ><span class="simplified">{{ entry.simplified }}</span
              ><span class="traditional">{{ entry.traditional }}</span></span
            >
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import DefinitionsList from '@/components/DefinitionsList.vue'
import Frequency from '@/components/Frequency.vue'

export default {
  props: {
    entry: {
      type: Object
    },
    minimal: {
      type: String,
      default: ''
    }
  },
  components: {
    DefinitionsList,
    Frequency
  },
  data() {
    return {
      Helper
    }
  }
}
</script>
