<template>
  <component
    :is="tag"
    v-observe-visibility="visibilityChanged"
    :class="{ 'add-pinyin': started, 'show-definition': showDefOn }"
  >
    <slot></slot>
    <span
      class="annotator-copy ml-1 focus-exclude"
      @click="copyClick"
      v-if="copy"
    >
      <font-awesome-icon icon="copy" />
    </span>
    <span
      class="annotator-show-def ml-2 focus-exclude"
      @click="showDefClick"
      v-if="showDef"
    >
      <font-awesome-icon icon="language" />
    </span>
    <textarea class="form-control mb-2" rows="3" v-if="pinyin.length > 0">{{
      `${pinyin.trim()}\n${simplified}\n${traditional}`
    }}</textarea>
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
    copy: {
      default: true
    },
    showDef: {
      default: true
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
      showDefOn: false,
      pinyin: '',
      simplified: '',
      traditional: ''
    }
  },
  methods: {
    showDefClick() {
      this.showDefOn = !this.showDefOn
    },
    copyClick() {
      if (this.pinyin === '') {
        let that = this
        $(this.$el)
          .find('.word-block, .word-block-text')
          .each(function() {
            if ($(this).is('.word-block-text')) {
              that.simplified += $(this).text()
              that.traditional += $(this).text()
            }
            that.simplified += $(this)
              .find('.word-block-simplified')
              .text()
            that.traditional += $(this)
              .find('.word-block-traditional')
              .text()
            that.pinyin +=
              ' ' +
              $(this)
                .find('.word-block-pinyin')
                .text()
          })
      } else {
        this.pinyin = ''
      }
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
                    Helper.tooltipTemplateFilter()
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
.show-definition .annotator-show-def {
  display: none;
}
.annotator-copy,
.annotator-show-def {
  cursor: pointer;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
}
</style>
