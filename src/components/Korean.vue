<template>
  <div class="korean">
    <div class="label song-label">Learning Korean?</div>
    <div class="jumbotron-fluid bg-light p-4">
      <div v-if="words">
        <div v-for="word in words">
          <div>
            The <em>hanja</em>
            <b class="ml-2" :data-hsk="hsk">{{ word.hanja }}</b> is read as
            <b>{{ word.hangul }}</b> in Korean, meaning
            <em>{{ word.english }}</em
            >.
          </div>
        </div>
      </div>
      <div v-if="words && words.length === 0">
        We could not find any Korean <em>hanja</em> words matching “{{ text }}.”
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
      words: undefined
    }
  },
  created() {
    $.getJSON(
      `${Config.wiki}items/hanjas?filter[hanja][eq]=${this.text}`,
      response => {
        this.words = response.data
      }
    )
  }
}
</script>

<style></style>
