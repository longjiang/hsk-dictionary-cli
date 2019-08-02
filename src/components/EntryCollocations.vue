<template>
  <div
    class="container"
    :key="'collocations-' + collocationsKey"
    v-if="colDesc"
  >
    <div class="row">
      <div
        class="col-sm-12 col-md-6 col-lg-4 mb-4"
        v-for="(description, name) in colDesc"
        v-bind:key="'collocation-' + name"
      >
        <Collocations
          v-if="entry.sketch && entry.sketch.Gramrels"
          :word="entry.simplified"
          :level="entry.book"
          :title="colDesc[name]"
          :type="name"
          :id="`collocation-${name}`"
          :collocation="getGramrelsByName(entry.sketch.Gramrels, name)"
        ></Collocations>
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
    }
  },
  data() {
    return {
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
