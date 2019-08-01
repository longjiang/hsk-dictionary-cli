<template>
  <div class="pinyin-button-wrapper">
    <button class="show-more" v-if="!annotated" v-on:click="annotate(selector)">
      <span v-if="state == 'idle'">{{ this.buttonText }}</span>
      <span v-if="state == 'annotating'">Adding...</span>
    </button>
    <button
      class="show-more"
      v-if="annotated && !shown"
      v-on:click="showPinyin()"
    >
      Show Pinyin
    </button>
    <button
      class="show-more"
      v-if="annotated && shown"
      v-on:click="hidePinyin()"
    >
      Hide Pinyin
    </button>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import Annotator from '@/vendor/annotator-js/js/annotator'
import $ from 'jquery'

export default {
  props: {
    selector: String,
    sticky: {
      // Do not change button face or function on click (useful when the annotation target changes)
      type: String,
      default: 'false'
    }
  },
  data() {
    return {
      buttonText: 'Add Pinyin',
      state: 'idle',
      annotated: false,
      shown: false,
      Helper
    }
  },
  mounted() {
    this.buttonText = this.$el.innerText
  },
  methods: {
    showPinyin() {
      $(this.selector).addClass('show-pinyin')
      this.shown = true
    },
    hidePinyin() {
      $(this.selector).removeClass('show-pinyin')
      this.shown = false
    },
    annotate(selector) {
      if ($(selector).find('.word-block').length === 0) {
        $(selector).addClass('add-pinyin show-pinyin show-simplified') // Soo it will have the pinyin looks
        this.state = 'annotating'
        // eslint-disable-next-line no-undef
        new Annotator().annotateBySelector(`${selector}`, () => {
          this.state = 'idle'
          if (this.sticky === 'false') {
            this.annotated = true
            this.shown = true
          }
          Helper.augmentAnnotatedBlocks(selector)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
