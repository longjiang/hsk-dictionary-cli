<template>
  <div class="korean">
    <div class="widget-title">Learning Korean?</div>
    <div class="jumbotron-fluid bg-light p-4">
      <div v-if="words">
        <div v-for="word in words">
          <div>
            The Korean word <b>{{ word.hangul }}</b> [<b :data-hsk="hsk" class="bigger">{{
              word.hanja
            }}</b
            >] means <em>{{ word.english }}</em
            >.
          </div>
        </div>
      </div>
      <div v-if="words.length === 0">
        We could not find any Korean words with the <em>hanja</em> “{{ text }}.”
      </div>
    </div>
  </div>
</template>

<script>
import Config from '@/lib/config'
import Helper from '@/lib/helper'

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
      words: []
    }
  },
  created() {
    Helper.loaded(
      (
        LoadedAnnotator,
        LoadedHSKCEDICT,
        loadedGrammar,
        LoadedHanzi,
        LoadedUnihan
      ) => {
        let variants = LoadedUnihan.variants(this.text)
        for (let variant of variants) {
          // $.getJSON(
          //   `${Config.wiki}items/hanjas?filter[hanja][eq]=${variant}`,
          //   response => {
          //     this.words = this.words.concat(response.data)
          //   }
          // )
          $.getJSON(
            `${Config.wiki}items/kengdic?filter[hanja][eq]=${variant}`,
            response => {
              this.words = this.words.concat(response.data)
            }
          )
        }
      }
    )
  }
}
</script>

<style></style>
