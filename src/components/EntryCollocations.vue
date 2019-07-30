<template>
  <div class="container collocations" :key="'collocations-' + collocationsKey">
    <div class="row mt-5" v-if="entry.sketch && entry.sketch.Gramrels">
      <Collocations
        v-for="(collocation, index) in entry.sketch.Gramrels"
        v-if="
          collocation.name === 'SentObject_of' && collocation.Words.length > 0
        "
        :title="`Adjective/Verb + ${entry.simplified}`"
        :word="entry.simplified"
        :level="entry.book"
        :type="collocation.name"
        :collocation="collocation"
        v-bind:key="'collocation-' + index"
      ></Collocations>
      <Collocations
        v-for="(collocation, index) in entry.sketch.Gramrels"
        v-if="collocation.name === 'Modifier' && collocation.Words.length > 0"
        :title="`Adverb + ${entry.simplified}`"
        :word="entry.simplified"
        :level="entry.book"
        :type="collocation.name"
        :collocation="collocation"
        v-bind:key="'collocation-' + index"
      ></Collocations>
      <Collocations
        v-for="(collocation, index) in entry.sketch.Gramrels"
        v-if="collocation.name === 'A_Modifier' && collocation.Words.length > 0"
        :title="`Adjective + 的${entry.simplified}`"
        :word="entry.simplified"
        :level="entry.book"
        :type="collocation.name"
        :collocation="collocation"
        v-bind:key="'collocation-' + index"
      ></Collocations>
      <Collocations
        v-for="(collocation, index) in entry.sketch.Gramrels"
        v-if="collocation.name === 'Object_of' && collocation.Words.length > 0"
        :title="`Verb + ${entry.simplified}`"
        :word="entry.simplified"
        :level="entry.book"
        :type="collocation.name"
        :collocation="collocation"
        v-bind:key="'collocation-' + index"
      ></Collocations>
      <Collocations
        v-for="(collocation, index) in entry.sketch.Gramrels"
        v-if="collocation.name === 'Measure' && collocation.Words.length > 0"
        :title="`Measure Word + ${entry.simplified}`"
        :word="entry.simplified"
        :level="entry.book"
        :type="collocation.name"
        :collocation="collocation"
        v-bind:key="'collocation-' + index"
      ></Collocations>
      <Collocations
        v-for="(collocation, index) in entry.sketch.Gramrels"
        v-if="collocation.name === 'N_Modifier' && collocation.Words.length > 0"
        :title="`Noun + ${entry.simplified}`"
        :word="entry.simplified"
        :level="entry.book"
        :type="collocation.name"
        :collocation="collocation"
        v-bind:key="'collocation-' + index"
      ></Collocations>
      <Collocations
        v-for="(collocation, index) in entry.sketch.Gramrels"
        v-if="collocation.name === 'Possessor' && collocation.Words.length > 0"
        :title="`Noun + 的${entry.simplified}`"
        :word="entry.simplified"
        :level="entry.book"
        :type="collocation.name"
        :collocation="collocation"
        v-bind:key="'collocation-' + index"
      ></Collocations>
      <Collocations
        v-for="(collocation, index) in entry.sketch.Gramrels"
        v-if="collocation.name === 'Possession' && collocation.Words.length > 0"
        :title="`${entry.simplified}的 + Noun`"
        :word="entry.simplified"
        :level="entry.book"
        :type="collocation.name"
        :collocation="collocation"
        v-bind:key="'collocation-' + index"
      ></Collocations>
      <Collocations
        v-for="(collocation, index) in entry.sketch.Gramrels"
        v-if="collocation.name === 'Modifies' && collocation.Words.length > 0"
        :title="`${entry.simplified} (的) + Noun`"
        :word="entry.simplified"
        :level="entry.book"
        :type="collocation.name"
        :collocation="collocation"
        v-bind:key="'collocation-' + index"
      ></Collocations>
      <Collocations
        v-for="(collocation, index) in entry.sketch.Gramrels"
        v-if="collocation.name === 'Object' && collocation.Words.length > 0"
        :title="`${entry.simplified} + Noun`"
        :word="entry.simplified"
        :level="entry.book"
        :type="collocation.name"
        :collocation="collocation"
        v-bind:key="'collocation-' + index"
      ></Collocations>
      <Collocations
        v-for="(collocation, index) in entry.sketch.Gramrels"
        v-if="collocation.name === 'SentObject' && collocation.Words.length > 0"
        :title="`${entry.simplified} + Complement`"
        :word="entry.simplified"
        :level="entry.book"
        :type="collocation.name"
        :collocation="collocation"
        v-bind:key="'collocation-' + index"
      ></Collocations>
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
  data() {
    return {
      collocationsKey: 0
    }
  },
  mounted() {
    SketchEngine.wsketch(this.entry.simplified, response => {
      this.entry.sketch = response
      this.collocationsKey += 1
    })
  }
}
</script>
