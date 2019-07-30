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
import Helper from '@/lib/helper'
import Normalizer from '@/lib/normalizer'

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
      return this.$store.getters.hasSavedWord({
        traditional: this.word.traditional,
        pinyin: this.word.pinyin
      })
    },
    saveWordClick() {
      this.word = Normalizer.normalize(this.word)
      this.$store.dispatch('addSavedWord', {
        traditional: this.word.traditional,
        pinyin: this.word.pinyin
      })
    },
    removeWordClick() {
      this.word = Normalizer.normalize(this.word)
      this.$store.dispatch('removeSavedWord', {
        traditional: this.word.traditional,
        pinyin: this.word.pinyin
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
