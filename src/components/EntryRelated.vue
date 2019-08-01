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
              :href="`#view/cedict/${word.traditional},${word.pinyin}`"
            >
              <span data-hsk="outside">{{ word.word }}</span>
            </a>
            <span class="character-example-pinyin">
              {{ word.pinyin }}
              <Speak :text="word.word" />
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
import CEDICT from '@/lib/cedict'
import SketchEngine from '@/lib/sketch-engine'
import Helper from '@/lib/helper'
import Normalizer from '@/lib/normalizer'

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
        const word = Normalizer.normalize(CEDICT.lookupSimplified(Word.word)[0])
        this.entry.related.push(word)
      }
      this.relatedKey += 1
    })
  }
}
</script>
