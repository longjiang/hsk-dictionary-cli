<template>
  <div class="search-compare-wrapper" v-if="loaded">
    <Search ref="search" random="true" :entry="searchEntry"></Search>
    <Search
      :class="{ 'ml-2': true, hidden: !compare }"
      :entry="compareEntry"
      ref="compare"
      placeholder="Compare with..."
      :hrefFunc="compareHrefFunc"
    ></Search>
    <button class="btn btn-compare ml-2" @click="compareClick">
      <span v-if="compare"><i class="glyphicon glyphicon-remove-sign"></i></span
      ><span v-if="!compare"
        ><i class="glyphicon glyphicon-adjust"></i>
        <span class="compare-btn-text ml-1">Compare</span></span
      >
    </button>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import Search from '@/components/Search'

export default {
  props: {
    searchEntry: {
      default: undefined
    },
    compareEntry: {
      default: undefined
    }
  },
  components: {
    Search
  },
  data() {
    return {
      Helper,
      Search,
      compare: false,
      loaded: false,
      compareHrefFunc: compareEntry => {
        const entry = this.$refs.search.entry || this.entry
        return `#/compare/cedict/${entry.identifier},${compareEntry.identifier}`
      }
    }
  },
  mounted() {
    Helper.loaded(() => {
      this.loaded = true
    })
  },
  methods: {
    compareClick() {
      this.compare = this.compare ? false : true
    },
    random() {
      Helper.loaded((LoadedAnnotator, LoadedHSKCEDICT) => {
        LoadedHSKCEDICT.random(
          entry => (location.hash = `/view/cedict/${entry.identifier}`)
        )
      })
    }
  }
}
</script>

<style></style>
