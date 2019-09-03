<template>
  <div v-if="html">
    <div class="speech-bar mb-4">
      <button>
        <font-awesome-icon icon="play" @click="play()" />
      </button>
    </div>
    <Annotate
      tag="div"
      v-for="line of html
        .trim()
        .replace(/<(div|p|li|h1|h2|h3|h4|h5|h6)/g, '\n<$1')
        .split('\n')"
      v-if="line.trim().length > 0"
      :copy="true"
    >
      <div v-html="line.trim()" />
    </Annotate>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import $ from 'jquery'

export default {
  props: {
    html: {
      type: String
    }
  },
  data() {
    return {
      sentences: [],
      current: 0
    }
  },
  mounted() {
    this.sentences = []
    for (let annotate of this.$children) {
      for (let sentence of $(annotate.$el).find('.sentence')) {
        this.sentences.push(sentence)
      }
    }
  },
  methods: {
    sentenceText(sentence) {
      let text = ''
      for (let block of $(sentence).find('.word-block, .word-block-text')) {
        if ($(block).is('.word-block-text')) {
          text += $(block).text()
        } else {
          text += $(block)
            .find('.word-block-simplified')
            .text()
        }
      }
      return text
    },
    play() {
      console.log(this.sentenceText(this.sentences[this.current]))
      this.current =
        this.current === this.sentences.length - 1 ? 0 : this.current + 1
    }
  }
}
</script>
