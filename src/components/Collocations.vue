<template>
  <div :key="'collocations-' + collocationsKey" v-if="colDesc">
    <div>
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
      return gramrels.find(gram => gram.name === name)
    }
  },
  data() {
    return {
      colDesc: undefined,
      sketch: undefined,
      collocationsKey: 0
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
