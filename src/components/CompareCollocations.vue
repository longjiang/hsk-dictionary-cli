<template>
  <div class="container" :key="'collocations-' + collocationsKey">
    <div class="label song-label">Collocations with “{{ a.simplified }}” and “{{ b.simplified }}”</div>
    <div class="jumbotron-fluid bg-light p-4">
      <div
        class="row mb-5"
        v-for="(description, name) in colDesc.a"
        v-bind:key="'collocation-' + name"
        v-if="
        (a.sketch &&
          getGramrelsByName(a.sketch.Gramrels, name) &&
          getGramrelsByName(a.sketch.Gramrels, name).Words.length > 0) ||
          (b.sketch &&
            getGramrelsByName(b.sketch.Gramrels, name) &&
            getGramrelsByName(b.sketch.Gramrels, name).Words.length > 0)
      "
      >
        <div class="col-sm-6">
          <Collocation
            v-if="a.sketch && a.sketch.Gramrels"
            :word="a.simplified"
            :level="a.hsk"
            :title="colDesc.a[name]"
            :type="name"
            :id="`collocation-a-${name}`"
            :collocation="getGramrelsByName(a.sketch.Gramrels, name)"
          ></Collocation>
        </div>
        <div class="col-sm-6">
          <Collocation
            v-if="b.sketch && b.sketch.Gramrels"
            :word="b.simplified"
            :level="b.hsk"
            :title="colDesc.b[name]"
            :type="name"
            :id="`collocation-a-${name}`"
            :collocation="getGramrelsByName(b.sketch.Gramrels, name)"
          ></Collocation>
        </div>
      </div>
      <div class="mt-2">
        Collocations provided by
        <a
          target="_blank"
          :href="`https://app.sketchengine.eu/#wordsketch?corpname=${encodeURIComponent(SketchEngine.corpname)}&tab=basic&lemma=${a.simplified}&showresults=1`"
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
  props: ['a', 'b'],
  components: {
    Collocation
  },
  data() {
    return {
      SketchEngine,
      colDesc: undefined,
      collocationsKey: 0
    }
  },
  methods: {
    getGramrelsByName(gramrels, name) {
      return gramrels.find(gram => gram.name === name && gram.Words && gram.Words.length > 0)
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
