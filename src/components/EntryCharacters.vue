<template>
  <!-- ANCHOR img/anchors/character-example.png -->
  <!-- FIXME Handle homonyms (e.g. 称 in 称心如意 should be chèn not chēng) -->
  <div class="container" v-if="text" v-cloak>
    <div class="row character-example-wrapper mt-4" v-if="characters">
      <!-- ANCHOR img/anchors/character.png -->
      <div
        :class="`col-md-${Math.max(4, Math.floor(12 / text.length))}`"
        v-for="(character, index) in characters"
      >
        <!-- ANCHOR img/anchors/parts.png -->
        <div class="text-center">
          <div class="pinyin mb-2" v-if="pinyin">
            {{ pinyin ? pinyin.split(' ')[index] : '' }}
          </div>
          <StrokeOrder :char="character.character" />
        </div>

        <div class="parts mt-4">
          <div class="english mt-3 mb-4 text-center">
            <DefinitionsList
              class="mt-2"
              :definitions="character.definition.split(';')"
            ></DefinitionsList>
          </div>
          <div class="text-center">
            <Decomposition :char="character.character"></Decomposition>
          </div>
          <div class="part character-example" v-for="part in character.parts">
            <span class="part-part mr-2" v-if="part && part.character !== '？'">
              <b>{{ part.character }}</b> =</span
            >
            <span
              class="part-definition character-example-english"
              v-if="part.definition"
              >{{ part.definition }}</span
            >
            <ul
              class="part-examples"
              v-if="part.showExamples && part.hskCharacters"
            >
              <li>{{ part.hskCharacters.length }} characters:</li>
            </ul>
          </div>
          <div class="etymology mt-4 mb-4" v-if="character.etymology">
            <span v-if="character.etymology.type">
              <b>Origin:</b> A
              <em v-if="character.etymology">{{ character.etymology.type }}</em>
              character.
            </span>
            <span v-if="character.etymology.hint">
              <b>Mnemonic:</b>
              {{ character.etymology.hint }}.
            </span>
          </div>
        </div>
        <div v-for="examples in []">
          <WordList
            :words="examples"
            :highlight="character.character"
            collapse="4"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Decomposition from '@/components/Decomposition.vue'
import DefinitionsList from '@/components/DefinitionsList.vue'
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
    Decomposition,
    DefinitionsList
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
    },
    highlightCharacter(text, character, hsk) {
      if (text) {
        return text.replace(
          character,
          '<span data-hsk="' + hsk + '">' + character + '</span>'
        )
      }
    }
  },
  updated() {
    this.recalculateExampleColumns()
  }
}
</script>
