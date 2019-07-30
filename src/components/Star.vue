<template>
  <div class="toggle-saved-word">
    <button
      class="saved-words-item-star remove-word"
      v-if="saved()"
      v-on:click="removeWordClick"
      title="Remove word"
    >
      <i class="glyphicon glyphicon-star"></i>
    </button>
    <button
      class="saved-words-item-star add-word"
      v-if="!saved()"
      v-on:click="saveWordClick"
      title="Add word"
    >
      <i class="glyphicon glyphicon-star-empty"></i>
    </button>
  </div>
</template>

<script>
import SavedWords from '@/lib/saved-words'
import SavedHSKWords from '@/lib/saved-words'
import SavedCEDICTWords from '@/lib/saved-cedict-words'
import Helper from '@/lib/helper'

export default {
  props: ['method', 'args'],
  data() {
    return {
      id: Helper.uniqueId(),
      SavedWords,
      SavedHSKWords,
      SavedCEDICTWords,
      Helper
    }
  },
  methods: {
    saved() {
      return this.$store.getters.hasSavedWord({
        method: this.method,
        args: this.args
      })
    },
    saveWordClick() {
      this.$store.dispatch('addSavedWord', {
        method: this.method,
        args: this.args
      })
    },
    removeWordClick() {
      this.$store.dispatch('removeSavedWord', {
        method: this.method,
        args: this.args
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
