<template>
  <div class="character">
    <!-- ANCHOR img/anchors/parts.png -->
    <div class="text-center">
      <div class="pinyin mb-2" v-if="pinyin">
        {{ pinyin }}
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
        <!-- component example lookup works but can't seem to get the list to update -->
        <!-- <button
          v-if="!part.characters"
          class="btn btn-small"
          @click="getPartExamples(part)"
        >
          Characters
        </button>
        <span v-if="part.getting">Looking up characters...</span>
        {{ character.examples ? character.examples.length : '' }}
        <div
          v-for="character in part.characters"
          :key="`${character.character}-${charKey}`"
        >
          {{ character.examples }}
          <WordList
            v-if="character.examples"
            :words="character.examples"
            :highlight="character.character"
          />
        </div> -->
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
    <WordList :words="examples" :highlight="character.character" collapse="4" />
  </div>
</template>

<script>
import Decomposition from '@/components/Decomposition.vue'
import DefinitionsList from '@/components/DefinitionsList.vue'
import Vue from 'vue'
import Helper from '@/lib/helper'

export default {
  props: {
    character: {
      stype: Object
    },
    pinyin: {
      default: ''
    }
  },
  data() {
    return {
      examples: [],
      charKey: 0
    }
  },
  components: {
    Decomposition,
    DefinitionsList
  },
  mounted() {
    this.getExamples()
  },
  methods: {
    getExamples() {
      Helper.loaded(
        (LoadedAnnotator, LoadedHSKCEDICT, LoadedGrammar, LoadedHanzi) => {
          LoadedHSKCEDICT.lookupByCharacter(
            words =>
              (this.examples = words.filter(word => word.hsk !== 'outside')),
            [this.character.character]
          )
        }
      )
    },
    getPartExamples(part) {
      part.getting = true
      Helper.loaded(
        (LoadedAnnotator, LoadedHSKCEDICT, LoadedGrammar, LoadedHanzi) => {
          part.characters = LoadedHanzi.searchByRadical(part.character)
          for (let character of part.characters.slice(0, 1)) {
            character.examples = []
            LoadedHSKCEDICT.lookupByCharacter(
              words => {
                part.getting = false
                character.examples = words.filter(
                  word => word.hsk !== 'outside'
                )
                this.charKey++
              },
              [character.character]
            )
          }
        }
      )
    },
    highlightCharacter(text, character, hsk) {
      if (text) {
        return text.replace(
          character,
          '<span data-hsk="' + hsk + '">' + character + '</span>'
        )
      }
    }
  }
}
</script>

<style></style>
