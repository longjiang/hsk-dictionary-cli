<template>
  <!-- ANCHOR img/anchors/character-example.png -->
  <!-- FIXME Handle homonyms (e.g. 称 in 称心如意 should be chèn not chēng) -->
  <div class="container" v-if="entry.simplified" v-cloak>
    <div class="row character-example-wrapper mt-4">
      <!-- ANCHOR img/anchors/character.png -->
      <div
        :class="
          `col-md-${Math.max(4, Math.floor(12 / entry.simplified.length))}`
        "
        v-for="(character, index) in characters"
      >
        <!-- ANCHOR img/anchors/parts.png -->
        <div class="text-center">
          <div class="pinyin mb-2" v-if="entry.pinyin">
            {{ entry.pinyin.split(' ')[index] }}
          </div>
          <StrokeOrder :char="character.character" />
        </div>

        <div class="parts mt-4">
          <div class="text-center">
            <Decomposition :char="character.character"></Decomposition>
          </div>
          <div class="english mt-3 mb-3 text-center">
            {{ character.definition.split(';')[0] }}
          </div>
          <div class="part character-example" v-for="part in character.parts">
            <span class="part-part" v-if="part">
              <b>{{ part.character }}</b>
            </span>
            <a
              class="stroke btn-small ml-2 mr-2"
              :href="animatedSvgUrl(part.character)"
              target="_blank"
              title="Show stroke order animation"
            >
              <img src="img/stroke.svg" />
            </a>
            <span
              class="part-definition character-example-english"
              v-if="part.definition"
              >{{ part.definition }}</span
            >
            <span
              class="part-pinyin character-example-english"
              v-if="part.character == '？'"
              >Other elements</span
            >
            <ul
              class="part-examples"
              v-if="part.showExamples && part.hskCharacters"
            >
              <li>{{ part.hskCharacters.length }} characters:</li>
              <li class="part-example" v-for="row in part.hskCharacters">
                <a
                  :href="'#view/hsk/' + row.firstHSKWord.id"
                  v-html="
                    highlightCharacter(
                      row.firstHSKWord.simplified,
                      row.character,
                      row.firstHSKWord.hsk
                    )
                  "
                ></a>
                <span
                  class="part-pinyin character-example-pinyin"
                  v-if="part.pinyin"
                >
                  {{ row.firstHSKWord.pinyin }}
                  <i
                    class="speak glyphicon glyphicon-volume-up"
                    v-bind:data-speak="row.firstHSKWord.simplified"
                  ></i>
                </span>
                <span
                  class="part-definition character-example-english"
                  v-if="part.definition"
                  >{{ row.firstHSKWord.english }}</span
                >
              </li>
            </ul>
          </div>
          <div class="etymology mb-4" v-if="character.etymology">
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
import Hanzi from '@/lib/hanzi'
import $ from 'jquery'

export default {
  props: ['entry'],
  components: {
    Decomposition
  },
  data() {
    return {
      characters: Hanzi.getCharactersInWord(this.entry.simplified)
    }
  },
  mounted() {
    for (let character of this.characters) {
      this.lookupByCharacter(character)
    }
  },
  methods: {
    animatedSvgUrl: Hanzi.animatedSvgUrl,
    lookupByCharacter(character) {
      HSKCEDICT.lookupByCharacter(words => (character.words = words), [
        character.character
      ])
    },
    recalculateExampleColumns() {
      if (this.entry.simplified) {
        let $div = $('.character-example-wrapper > div')
        let span = 12 / this.entry.simplified.length
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
