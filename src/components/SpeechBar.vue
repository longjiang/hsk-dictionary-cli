<template>
  <div v-if="html" id="speech-container">
    <div class="speech-bar mb-4 sticky bg-white pt-2 pb-2">
      <b-button-group class="d-flex">
        <b-button @click="previous()">
          <font-awesome-icon icon="chevron-left" />
        </b-button>
        <b-button v-if="!speaking" @click="play()">
          <font-awesome-icon icon="play" />
        </b-button>
        <b-button v-if="speaking" @click="pause()">
          <font-awesome-icon icon="pause" />
        </b-button>
        <b-button @click="next()">
          <font-awesome-icon icon="chevron-right" />
        </b-button>
        <b-dropdown right text="Switch Voice" style="flex: 1">
          <b-dropdown-item v-for="(voice, index) in voices" @click="setvoice(index)">{{ voice.name }}</b-dropdown-item>
        </b-dropdown>
      </b-button-group>
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
      current: 0,
      speechSynthesis,
      voice: 0,
      utterance: undefined,
      speaking: false
    }
  },
  computed: {
    voices() {
      return speechSynthesis.getVoices().filter(voice => voice.lang.startsWith('zh'))
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
    setvoice(index) {
      this.voice = index
    },
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
    update() {
      for (let sentence of this.sentences) {
        $(sentence).removeClass('current')
      }
      const sentence = this.sentences[this.current]
      $(sentence).addClass('current')
    },
    speak(text) {
      this.utterance = new SpeechSynthesisUtterance(text)
      this.utterance.voice = this.voices[this.voice]
      speechSynthesis.speak(this.utterance)
    },
    scroll(sentence) {
      if (sentence.offsetHeight > 0) {
        sentence.scrollIntoView()
        window.scrollBy(
          0,
          document.documentElement.clientHeight / -2 +
            (sentence.offsetHeight || 0) / 2
        )
      }
    },
    play() {
      this.update()
      this.speaking = true
      const sentence = this.sentences[this.current]
      this.speak(this.sentenceText(sentence))
      this.utterance.onend = () => {
        this.next()
      }
    },
    pause() {
      speechSynthesis.cancel()
      this.utterance.onend = undefined
      this.speaking = false
    },
    previous() {
      this.current = Math.max(0, this.current - 1)
      this.update()
      if (this.speaking) {
        this.pause()
        this.play()
      }
    },
    next() {
      this.current = Math.min(this.sentences.length - 1, this.current + 1)
      this.update()
      if (this.speaking) {
        this.pause()
        this.play()
      }
    }
  }
}
</script>

<style lang="scss">
.sentence.current {
  background-color: rgba(212, 212, 255, 0.5);
}
</style>
