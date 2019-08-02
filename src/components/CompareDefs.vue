<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 text-center definitions">
        <Merge direction="top" class="h-half" />
        <DefinitionsList :definitions="defCommon" nodef="VS"></DefinitionsList>
        <Merge direction="bottom" class="h-half" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-sm-6 text-center">
        <DefinitionsList :definitions="defDistinct.a"></DefinitionsList>
      </div>
      <div class="col-sm-6 text-center">
        <DefinitionsList :definitions="defDistinct.b"></DefinitionsList>
      </div>
    </div>
  </div>
</template>

<script>
import DefinitionsList from '@/components/DefinitionsList.vue'

export default {
  components: {
    DefinitionsList
  },
  props: ['a', 'b'],
  data() {
    return {
      defCommon: [],
      defDistinct: {
        a: [],
        b: []
      }
    }
  },
  mounted() {
    this.common(this.a, this.b)
  },
  methods: {
    defListIncludes(defList, def) {
      return defList.find(d => def.text.includes(d.text))
    },
    common(a, b) {
      for (let adef of a.definitions) {
        for (let bdef of b.definitions) {
          if (bdef.text.includes(adef.text)) {
            this.defCommon.push(bdef)
          } else if (adef.text.includes(bdef.text)) {
            this.defCommon.push(adef)
          }
        }
      }
      for (let adef of a.definitions) {
        if (!this.defListIncludes(this.defCommon, adef))
          this.defDistinct.a.push(adef)
      }
      for (let adef of b.definitions) {
        if (!this.defListIncludes(this.defCommon, adef))
          this.defDistinct.b.push(adef)
      }
      // not in this.defCommon
    }
  }
}
</script>
