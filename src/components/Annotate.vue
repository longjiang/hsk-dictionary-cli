<template>
  <component
    :is="tag"
    v-observe-visibility="visibilityChanged"
    :class="{ 'add-pinyin': started }"
    ><slot></slot
  ></component>
</template>

<script>
import Helper from '@/lib/helper'
import Annotator from '@/lib/annotator'
import $ from 'jquery'

export default {
  props: {
    tag: {
      default: 'span'
    },
    augmentFunction: {
      type: Function,
      default: Helper.augmentAnnotatedBlocks
    }
  },
  data() {
    return {
      started: false,
      annotated: false
    }
  },
  methods: {
    visibilityChanged(isVisible) {
      if (isVisible && !this.annotated) {
        this.annotate()
      }
    },
    annotate() {
      if (this.annotated === false) {
        // annotate only once
        this.started = true // Soo we'll add the 'add-pinyin' class, so it will have the pinyin looks
        Helper.loaded(
          (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
            LoadedAnnotator.annotateIteratively(this.$el, node => {
              this.annotated = true
              // this.augmentFunction(node)
            })
          }
        )
      }
    }
  }
}
</script>
