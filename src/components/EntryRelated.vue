<template>
  <div class="container" :key="'related-' + relatedKey">
    <div class="row mt-5" v-if="entry.related && entry.related.length > 0">
      <div class="col-sm-12">
        <div class="label song-label mb-2">
          Words related to “{{ entry.simplified }}”
        </div>
        <ul class="related collapsed" id="related" data-collapse-target>
          <li
            v-for="word in entry.related"
            class="related-item character-example"
          >
            <a
              class="character-example-word"
              v-if="word.hskCandidates && word.hskCandidates.length > 0"
              :href="`#view/hsk/${word.hskCandidates[0].id}`"
            >
              <span :data-hsk="word.hskCandidates[0].book">
                {{ word.word }}
              </span>
            </a>
            <a
              class="character-example-word"
              v-if="
                word.hskCandidates.length < 1 &&
                  word.cedictCandidates &&
                  word.cedictCandidates.length > 0
              "
              :href="
                `#view/cedict/${word.cedictCandidates[0].traditional},${
                  word.cedictCandidates[0].pinyin
                }`
              "
            >
              <span data-hsk="outside">{{ word.word }}</span>
            </a>
            <span
              class="character-example-pinyin"
              v-if="word.cedictCandidates && word.cedictCandidates.length > 0"
            >
              {{ word.cedictCandidates[0].pinyin }}
              <i
                :data-speak="word.word"
                class="speak glyphicon glyphicon-volume-up"
              ></i>
            </span>
            <ul
              class="character-example-english inline-list"
              v-if="word.cedictCandidates && word.cedictCandidates.length > 0"
            >
              <li v-for="definition in word.cedictCandidates[0].definitions">
                {{ definition.text }}
              </li>
            </ul>
          </li>
        </ul>
        <button
          v-if="entry.related.length > 12"
          class="show-more collapsed"
          v-on:click="Helper.showMoreClick"
          title="Show all related words"
          :data-bg-hsk="entry.book"
        >
          <span class="label-expand"
            >Show {{ entry.related.length - 12 }} more</span
          >
          <span class="label-collapse">Collapse</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import HSK from '@/lib/hsk'
import CEDICT from '@/lib/cedict'
import SketchEngine from '@/lib/sketch-engine'
import Helper from '@/lib/helper'

export default {
  props: ['entry'],
  data() {
    return {
      Helper,
      relatedKey: 0
    }
  },
  mounted() {
    SketchEngine.thesaurus(this.entry.simplified, response => {
      this.entry.related = []
      for (let Word of response.Words) {
        Word.hskCandidates = HSK.lookup(Word.word)
        Word.cedictCandidates = CEDICT.lookupSimplified(Word.word)
        this.entry.related.push(Word)
      }
      this.relatedKey += 1
    })
  }
}
</script>
