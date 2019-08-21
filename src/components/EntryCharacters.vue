<template>
  <!-- ANCHOR img/anchors/character-example.png -->
  <!-- FIXME Handle homonyms (e.g. 称 in 称心如意 should be chèn not chēng) -->
  <div class="container-fluid" v-if="text" v-cloak>
    <div class="row character-example-wrapper mt-4" v-if="characters">
      <!-- ANCHOR img/anchors/character.png -->
      <div
        :class="`col-md-${Math.max(4, Math.floor(12 / text.length))}`"
        v-for="(character, index) in characters"
      >
        <Character :character="character" />
      </div>
    </div>
  </div>
</template>

<script>
import Character from '@/components/Character'
import Helper from '@/lib/helper'
import $ from 'jquery'

export default {
  props: {
    text: {
      stype: String
    },
    pinyin: {
      default: ''
    }
  },
  components: {
    Character
  },
  data() {
    return {
      characters: []
    }
  },
  mounted() {
    Helper.loaded(
      (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
        this.characters = LoadedHanzi.getCharactersInWord(this.text)
        for (let character of this.characters) {
          this.lookupByCharacter(character)
        }
      }
    )
  },
  methods: {
    lookupByCharacter(character) {
      Helper.loaded((LoadedAnnotator, LoadedHSKCEDICT) => {
        LoadedHSKCEDICT.lookupByCharacter(words => (character.words = words), [
          character.character
        ])
      })
    },
    recalculateExampleColumns() {
      if (this.text) {
        let $div = $('.character-example-wrapper > div')
        let span = 12 / this.text.length
        $div.removeClass()
        $div.addClass('col-md-' + span)
      }
    }
  },
  updated() {
    this.recalculateExampleColumns()
  }
}
</script>
