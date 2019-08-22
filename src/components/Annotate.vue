<template>
  <component :is="tag" v-observe-visibility="visibilityChanged" :class="{ 'add-pinyin': started }">
    <slot></slot>
    <span class="annotator-copy ml-1" @click="copyClick">
      <font-awesome-icon icon="copy" />
    </span>
    <textarea class="form-control mb-2" rows="2" v-if="pinyin.length > 0">{{ `${pinyin.trim()}\n${simplified}` }}</textarea>
  </component>
</template>

<script>
import Helper from '@/lib/helper'
import $ from 'jquery'

export default {
  props: {
    tag: {
      default: 'span'
    },
    wordBlockTemplateFilter: {
      type: Function,
      default: Helper.wordBlockTemplateFilter
    }
  },
  data() {
    return {
      started: false,
      annotated: false,
      pinyin: '',
      simplified: ''
    }
  },
  methods: {
    copyClick() {
      let that = this
      $(this.$el)
        .find('.word-block')
        .each(function() {
          that.simplified += $(this)
            .find('.word-block-simplified')
            .text()
          that.pinyin +=
            ' ' +
            $(this)
              .find('.word-block-pinyin')
              .text()
        })
    },
    visibilityChanged(isVisible) {
      if (isVisible && !this.annotated) {
        this.annotate()
      }
    },
    annotate() {
      if (this.annotated === false) {
        // annotate only once
        Helper.loaded(
          (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
            LoadedHSKCEDICT.isChinese(
              isChinese => {
                if (isChinese) {
                  this.started = true // Soo we'll add the 'add-pinyin' class, so it will have the pinyin looks
                  LoadedAnnotator.annotateIteratively(
                    this.$el,
                    node => {},
                    this.wordBlockTemplateFilter,
                    Helper.tooltipTemplateFilter
                  )
                  this.annotated = true
                }
              },
              [$(this.$el).text()]
            )
          }
        )
      }
    }
  }
}
</script>

<style lang="scss">
.annotator-copy {
  cursor: pointer;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
}
</style>