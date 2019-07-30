<template>
  <div class="toggle-saved-word" :key="'savedWord' + id">
    <button
      class="saved-words-item-star remove-word"
      v-if="saved"
      v-on:click="removeWordClick"
      title="Remove word"
    >
      <i class="glyphicon glyphicon-star"></i>
    </button>
    <button
      class="saved-words-item-star add-word"
      v-if="!saved"
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
      saved: false,
      id: Helper.uniqueId(),
      SavedWords,
      SavedHSKWords,
      SavedCEDICTWords,
      Helper
    }
  },
  mounted() {
    if (this.method && this.args) {
      this.saved = SavedWords.includes(this.method, this.args)
    }
  },
  methods: {
    saveWordClick: () => {
      console.log('saving?')
      console.log(this)
      SavedWords.add(this.method, this.args)
    },
    removeWordClick: () => {
      console.log('removing?')
      console.log(this.method)
      SavedWords.remove(this.method, this.args)
    },
    update() {
      this.saved = SavedWords.includes(this.method, this.args)
      this.id = Helper.uniqueId()
      SavedWords.updateSavedWordsDisplay()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
