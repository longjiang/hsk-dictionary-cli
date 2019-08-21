<template>
  <div class="character">
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
</template>

<script>

import Decomposition from '@/components/Decomposition.vue'
import DefinitionsList from '@/components/DefinitionsList.vue'

export default {
  props: {
    character: {
      stype: Object
    }
  },
  components: {
    Decomposition,
    DefinitionsList
  },
  methods: {
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
