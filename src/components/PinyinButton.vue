<template>
  <div class="pinyin-button-wrapper">
    <button class="show-more" v-if="!annotated" v-on:click="annotate">
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
    selector: {
      type: String,
      default: undefined
    },
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
      $target: undefined,
      annotated: false,
      shown: false,
      Helper
    }
  },
  mounted() {
    this.buttonText = this.$el.innerText
    this.$target = this.selector ? $(this.selector) : $(this.$el).next()
  },
  methods: {
    showPinyin() {
      this.$target.addClass('show-pinyin')
      this.shown = true
    },
    hidePinyin() {
      this.$target.removeClass('show-pinyin')
      this.shown = false
    },
    annotate() {
      if (this.$target.find('.word-block').length === 0) {
        this.$target.addClass('add-pinyin show-pinyin show-simplified') // Soo it will have the pinyin looks
        this.state = 'annotating'
        // eslint-disable-next-line no-undef
        for (let node of this.$target.get()) {
          new Annotator().annotateIteratively(node, () => {
            this.state = 'idle'
            if (this.sticky === 'false') {
              this.annotated = true
              this.shown = true
            }
            Helper.augmentAnnotatedBlocks(this.$target.get())
          })
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
