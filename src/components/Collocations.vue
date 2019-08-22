<template>
  <div :key="'collocations-' + collocationsKey">
    <div class="label song-label">Collocations with “{{ text }}”</div>
    <div class="jumbotron-fluid bg-light p-4">
      <div class="row">
        <div
          class="col-sm-12 col-md-6 col-lg-4"
          v-for="(description, name) in colDesc"
          v-if="
            sketch &&
              sketch.Gramrels &&
              getGramrelsByName(sketch.Gramrels, name)
          "
          v-bind:key="'collocation-' + name"
        >
          <Collocation
            v-if="sketch && sketch.Gramrels"
            class="mb-4"
            :word="text"
            :level="level"
            :title="colDesc[name]"
            :type="name"
            :id="`collocation-${name}`"
            :collocation="getGramrelsByName(sketch.Gramrels, name)"
          ></Collocation>
        </div>
      </div>
      <div v-if="sketch !== undefined && (sketch === false || !sketch.Gramrels)">Sorry, we could not find any collocations with “{{ text }}”</div>

      <div class="mt-2">
        Collocations provided by
        <a
          target="_blank"
          :href="`https://app.sketchengine.eu/#wordsketch?corpname=${encodeURIComponent(SketchEngine.corpname)}&tab=basic&lemma=${text}&showresults=1`"
        >
          <img src="img/logo-sketch-engine.png" alt="Sketch Engine" class="ml-2 logo-small" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Collocation from '@/components/Collocation.vue'
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
  components: {
    Collocation
  },
  methods: {
    getGramrelsByName(gramrels, name) {
      return gramrels.find(gram => gram.name === name && gram.Words && gram.Words.length > 0)
    }
  },
  data() {
    return {
      colDesc: undefined,
      sketch: undefined,
      collocationsKey: 0,
      SketchEngine
    }
  },
  mounted() {
    SketchEngine.wsketch(this.text, response => {
      this.sketch = response
      this.collocationsKey += 1
    })
    this.colDesc = SketchEngine.collocationDescription(this.text)
  }
}
</script>
