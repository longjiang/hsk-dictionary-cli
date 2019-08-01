<template>
  <button class="show-more" v-if="enabled" v-on:click="annotate(selector)">
    <slot>Show Pinyin</slot>
  </button>
</template>

<script>
import Helper from '@/lib/helper'
import Annotator from '@/vendor/annotator-js/js/annotator'
import $ from 'jquery'

export default {
  props: {
    selector: String,
    keep: {
      type: String,
      default: 'false'
    }
  },
  data() {
    return {
      buttonText: undefined,
      enabled: true,
      Helper
    }
  },
  mounted() {
    this.buttonText = this.$el.innerText
  },
  methods: {
    annotate(selector) {
      if ($(selector).find('.word-block').length === 0) {
        $(selector).addClass('add-pinyin show-pinyin show-simplified') // Soo it will have the pinyin looks
        this.$el.innerText = 'Adding...'
        // eslint-disable-next-line no-undef
        new Annotator(CEDICT).annotateBySelector(`${selector}`, () => {
          if (this.keep === 'false') {
            this.enabled = 'false'
          } else {
            this.$el.innerText = this.buttonText
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
