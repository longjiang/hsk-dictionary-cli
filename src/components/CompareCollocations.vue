<template>
  <div
    class="container"
    :key="'collocations-' + collocationsKey"
    v-if="colDesc"
  >
    <div
      class="row mb-5"
      v-for="(description, name) in colDesc.a"
      v-bind:key="'collocation-' + name"
      v-if="
        (getGramrelsByName(a.sketch.Gramrels, name) &&
          getGramrelsByName(a.sketch.Gramrels, name).Words.length > 0) ||
          (getGramrelsByName(b.sketch.Gramrels, name) &&
            getGramrelsByName(b.sketch.Gramrels, name).Words.length > 0)
      "
    >
      <div class="col-sm-6">
        <Collocations
          v-if="a.sketch && a.sketch.Gramrels"
          :word="a.simplified"
          :level="a.book"
          :title="colDesc.a[name]"
          :type="name"
          :id="`collocation-a-${name}`"
          :collocation="getGramrelsByName(a.sketch.Gramrels, name)"
        ></Collocations>
      </div>
      <div class="col-sm-6">
        <Collocations
          v-if="b.sketch && b.sketch.Gramrels"
          :word="b.simplified"
          :level="b.book"
          :title="colDesc.b[name]"
          :type="name"
          :id="`collocation-a-${name}`"
          :collocation="getGramrelsByName(b.sketch.Gramrels, name)"
        ></Collocations>
      </div>
    </div>
  </div>
</template>

<script>
import Collocations from '@/components/Collocations.vue'
import SketchEngine from '@/lib/sketch-engine'

export default {
  props: ['a', 'b'],
  components: {
    Collocations
  },
  data() {
    return {
      colDesc: undefined,
      collocationsKey: 0
    }
  },
  methods: {
    getGramrelsByName(gramrels, name) {
      let gramrel = gramrels.find(gram => gram.name === name)
      console.log(gramrel)
      return gramrel
    }
  },
  mounted() {
    SketchEngine.wsketch(this.a.simplified, response => {
      this.a.sketch = response
      this.collocationsKey += 1
    })
    SketchEngine.wsketch(this.b.simplified, response => {
      this.b.sketch = response
      this.collocationsKey += 1
    })
    this.colDesc = {
      a: SketchEngine.collocationDescription(this.a.simplified),
      b: SketchEngine.collocationDescription(this.b.simplified)
    }
  }
}
</script>
