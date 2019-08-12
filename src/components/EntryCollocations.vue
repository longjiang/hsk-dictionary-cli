<template>
  <div :key="'collocations-' + collocationsKey" v-if="colDesc">
    <!-- <div class="row" v-if="!show">
      <div class="col-sm-12 text-center">
        <div class="label song-label">
          Collocations with “<span class="simplified">{{
            entry.simplified
          }}</span
          ><span class="traditional">{{ entry.traditional }}</span
          >”
        </div>
        <div class=" pt-4 pb-4 lyrics-bar">
          <button
            class="btn show-more"
            :data-bg-hsk="entry.hsk"
            @click="showClick"
          >
            Show Collocations
          </button>
        </div>
      </div>
    </div> -->
    <div>
      <div class="row">
        <div
          class="col-sm-12 col-md-6 col-lg-4"
          v-for="(description, name) in colDesc"
          v-if="
            entry.sketch &&
              entry.sketch.Gramrels &&
              getGramrelsByName(entry.sketch.Gramrels, name)
          "
          v-bind:key="'collocation-' + name"
        >
          <Collocations
            v-if="entry.sketch && entry.sketch.Gramrels"
            class="mb-4"
            :word="entry.simplified"
            :level="entry.hsk"
            :title="colDesc[name]"
            :type="name"
            :id="`collocation-${name}`"
            :collocation="getGramrelsByName(entry.sketch.Gramrels, name)"
          ></Collocations>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Collocations from '@/components/Collocations.vue'
import SketchEngine from '@/lib/sketch-engine'

export default {
  props: ['entry'],
  components: {
    Collocations
  },
  methods: {
    getGramrelsByName(gramrels, name) {
      return gramrels.find(gram => gram.name === name)
    },
    // showClick() {
    //   this.show = true
    // }
  },
  data() {
    return {
      // show: false,
      colDesc: undefined,
      collocationsKey: 0
    }
  },
  mounted() {
    SketchEngine.wsketch(this.entry.simplified, response => {
      this.entry.sketch = response
      this.collocationsKey += 1
    })
    this.colDesc = SketchEngine.collocationDescription(this.entry.simplified)
  }
}
</script>
