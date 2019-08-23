<template>
  <!-- ANCHOR img/anchors/entry.png  -->
  <div class="entry-head-wrapper" v-if="entry">
    <div>
      <div v-if="entry.measureWords" style="display:inline-block">
        <div class="entry-pinyin measure-word-pinyin">
          yī {{ entry.measureWords[0].pinyin }}
          <Speak class="ml-1" :text="'一' + entry.measureWords[0].simplified" />
        </div>
        <div class="entry-word measure-word">
          一<span class="simplified">{{
            entry.measureWords[0].simplified
          }}</span
          ><span class="traditional">{{
            entry.measureWords[0].traditional
          }}</span>
        </div>
      </div>
      <div class="entry-word-wrapper" style="display:inline-block">
        <div class="entry-pinyin">
          <Star :word="entry"></Star>
          {{ entry.pinyin }}
          <Speak class="ml-1" :text="entry.simplified" />
        </div>
        <div class="entry-word">
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

<style lang="scss">

.entry-pinyin {
  font-size: 1.1rem;
}

.entry-word {
  font-size: 3rem;
  font-weight: bold;
  line-height: 1;
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .entry-word {
    font-size: 3rem;
  }
}

.entry-word img {
  width: 4.8rem;
  border: 1px solid #ccc;
}

.entry-word a {
  color: inherit;
  text-decoration: inherit;
}

.entry-head-wrapper {
  position: relative;
}

.entry-head-wrapper .toggle-saved-word {
  padding: 0;
  background: none;
  border: none;
  margin: 0;
  color: #ffe597;
  position: relative;
  bottom: -0.09em;
}
  
</style>
