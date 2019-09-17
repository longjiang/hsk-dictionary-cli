<template>
  <!-- ANCHOR img/anchors/entry.png  -->
  <div class="entry-head-wrapper" v-if="entry">
    <div>
      <div class="mb-2 text-center">
        <div class="frequency-level d-inline-block pl-4 pr-4" v-bind:data-bg-hsk="entry.hsk">
          <strong>{{ entry.hsk === 'outside' ? 'Non-HSK' : 'HSK ' + entry.hsk }}</strong>
        </div>
      </div>
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
  

.measure-word {
  font-weight: normal;
  color: #ccc;
}
</style>
