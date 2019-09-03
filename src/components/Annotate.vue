<template>
  <component
    :is="tag"
    v-observe-visibility="visibilityChanged"
    style="clear: both"
    :class="{
      'add-pinyin': started,
      'show-definition': showDefOn,
      fullscreen: fullscreenMode
    }"
  >
    <div class="annotator-buttons" v-if="!empty()">
      <Speak
        v-if="speak"
        :text="text()"
        style="position: relative; top: 0.08rem; position: relative;"
      />
      <span class="annotator-copy ml-1 focus-exclude" @click="copyClick" v-if="copy">
        <font-awesome-icon icon="copy" />
      </span>
      <span class="annotator-show-def ml-2 focus-exclude" @click="showDefClick" v-if="showDef">
        <font-awesome-icon icon="language" />
      </span>
      <span
        class="annotator-fullscreen ml-2 focus-exclude"
        @click="fullscreenClick"
        v-if="fullscreen"
      >
        <font-awesome-icon icon="expand" />
      </span>
    </div>
    <span
      class="annotator-close ml-2 focus-exclude"
      @click="fullscreenClick"
      v-if="fullscreen && fullscreenMode"
    >
      <font-awesome-icon icon="times" />
    </span>
    <span v-if="content" v-html="content" />
    <slot></slot>
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
    speak: {
      default: false
    },
    copy: {
      default: false
    },
    showDef: {
      default: false
    },
    fullscreen: {
      default: false
    },
    content: {
      default: false
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
      fullscreenMode: false,
      pinyin: '',
      simplified: '',
      traditional: '',
      sentences: []
    }
  },
  mounted() {
    this.recursive(this.$slots.default[0].elm)
  },
  methods: {
    breakSentences(text) {
      text = text.replace(/([。！？：])/g, '$1SENTENCEENDING!!!')
      let sentences = text.split('SENTENCEENDING!!!')
      return sentences
    },
    recursive(node) {
      if (node.nodeType === 3) {
        // textNode
        // break setnences
        let sentences = this.breakSentences(node.nodeValue)
        for (let sentence of sentences) {
          let span = $(`<span class="sentence">${sentence}</span>`)
          $(node).before(span)
        }
        $(node).remove()
      } else {
        // work with child nodes
        let nodes = []
        for (let n of node.childNodes) {
          nodes.push(n)
        }
        for (let n of nodes) {
          this.recursive(n)
        }
      }
    },
    empty() {
      return (
        $(this.$el)
          .text()
          .trim() === ''
      )
    },
    fullscreenClick() {
      this.fullscreenMode = !this.fullscreenMode
    },
    text() {
      return $(this.$slots.default[0].elm).text()
    },
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
.add-pinyin.fullscreen {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: scroll;
  font-size: 3rem;
  padding: 3rem;
  .speak,
  .annotator-copy,
  .annotator-show-def,
  .annotator-fullscreen {
    display: none;
  }
  .annotator-close {
    opacity: 0;
    position: absolute;
    top: 0.75rem;
    right: 2.5rem;
    transition: 0.5s all ease-in-out;
  }
  .annotator-close:hover {
    opacity: 1;
  }
}

#chinesezerotohero.show-definition .annotator-show-def {
  display: none;
}

.annotator-buttons {
  float: right;
  padding: 0 0 0.5rem 0.5rem;
}

.annotator-buttons > *:not(.speak) {
  cursor: pointer;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
}
</style>
