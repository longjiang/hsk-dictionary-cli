<template>
  <div class="japanese">
    <div class="label song-label">Learning Japanese?</div>
    <div class="jumbotron-fluid bg-light p-4">
      <div v-if="words">
        <div v-for="word in words">
          <div>
            The Japanese word
            <b :data-hsk="hsk">{{ word.kanji }}</b> (read as
            <b>{{ word.kana }}</b
            >) means <em>{{ word.english }}</em
            >.
          </div>
        </div>
      </div>
      <div v-if="!words || words.length === 0">
        We could not find any Japanese words with the <em>kanji</em> “{{
          shinjitai
        }}.”
      </div>
    </div>
  </div>
</template>

<script>
import Config from '@/lib/config'

export default {
  props: {
    text: {
      type: String
    },
    hsk: {
      default: 'outside'
    }
  },
  data() {
    return {
      words: undefined,
      shinjitai: undefined
    }
  },
  created() {
    let kyujitai = new Kyujitai(error => {
      this.shinjitai = kyujitai.decode(this.text)
      if (this.shinjitai) {
        $.getJSON(
          `${Config.wiki}items/edict?filter[kanji][eq]=${this.shinjitai}`,
          response => {
            this.words = response.data
          }
        )
      }
    })
  }
}
</script>

<style></style>
