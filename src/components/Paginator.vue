<template>
  <div>
    <button
      class="paginate-button previous"
      v-on:click="previousClick"
      title="Previous word"
      v-if="!minimal && hasPrevious"
    >
      <img src="img/angle-left.svg" alt />
    </button>
    <button
      class="paginate-button next"
      v-on:click="nextClick"
      title="Next word"
      v-if="!minimal && hasNext"
    >
      <img src="img/angle-right.svg" alt />
    </button>
  </div>
</template>

<script>
import List from '@/lib/list'
export default {
  props: {
    entry: {
      type: Object
    }
  },
  computed: {
    hasPrevious: function() {
      const list = this.list()
      if (list) {
        return list.hasPrevious()
      } else {
        return false
      }
    },
    hasNext: function() {
      const list = this.list()
      if (list) {
        return list.hasNext()
      } else {
        return false
      }
    }
  },
  methods: {
    findCurrentFunction(entry) {
      return function(item) {
        return item.join(',').replace(/ /g, '_') === entry.identifier
      }
    },
    list() {
      const savedWords = this.$store.state.savedWords
      if (savedWords.length > 0) {
        const list = new List(savedWords)
        list.setCurrent(this.findCurrentFunction(this.entry))
        return list
      }
    },
    previousClick() {
      let list = this.list()
      if (list.hasPrevious()) {
        const identifier = list
          .previous()
          .join(',')
          .replace(/ /g, '_')
        location.hash = `/view/cedict/${identifier}`
      }
    },
    nextClick() {
      let list = this.list()
      if (list.hasNext()) {
        const identifier = list
          .next()
          .join(',')
          .replace(/ /g, '_')
        location.hash = `/view/cedict/${identifier}`
      }
    }
  }
}
</script>

<style></style>
