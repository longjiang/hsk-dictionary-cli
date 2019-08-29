<template>
  <div class="toggle-saved-word focus-exclude">
    <button
      class="star remove-word"
      v-if="saved()"
      v-on:click="removeWordClick"
      title="Remove word"
    >
      <i class="glyphicon glyphicon-star"></i>
    </button>
    <button
      class="star add-word"
      v-if="!saved()"
      v-on:click="saveWordClick"
      title="Add word"
    >
      <i class="glyphicon glyphicon-star-empty"></i>
    </button>
  </div>
</template>

<script>
import Helper from '@/lib/helper'

export default {
  props: ['word'],
  data() {
    return {
      id: Helper.uniqueId(),
      Helper
    }
  },
  methods: {
    saved() {
      return this.$store.getters.hasSavedWord(this.word.identifier)
    },
    saveWordClick() {
      this.$store.dispatch('addSavedWord', this.word.identifier)
    },
    removeWordClick() {
      this.$store.dispatch('removeSavedWord', this.word.identifier)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toggle-saved-word {
  display: inline-block;
  position: relative;
  bottom: -0.09em;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  color: #ffe597;
}

.star {
  background: none;
  border: none;
  color: #f8b61e;
  padding: 0;
}
</style>
