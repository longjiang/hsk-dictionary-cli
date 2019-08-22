<template>
  <div class="music">
    <div class="container main mt-5 mb-5">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="text-center mb-3">Lookup phrases not in the dictionary</h2>
          <p class="text-center mb-5">and see how they are used in real contexts.</p>
          <Search
            placeholder="Lookup a word or phrase"
            type="generic"
            :term="args"
            :defaultURL="text => `#/phrase/search/${text}`"
          />
          <Concordance v-if="args" :text="args" class="mt-5" />
          <Mistakes v-if="args" :text="args" class="mt-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Concordance from '@/components/Concordance'
import Mistakes from '@/components/Mistakes'
import Search from '@/components/Search'

export default {
  components: {
    Search,
    Mistakes,
    Concordance
  },
  props: {
    method: {
      type: String
    },
    args: {
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
  },
  watch: {
  },
  mounted() {

  }
}
</script>

<style></style>
