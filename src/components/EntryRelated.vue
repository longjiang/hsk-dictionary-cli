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
              class="btn btn-small mr-2"
              :href="
                `#/compare/cedict/${entry.traditional},${entry.pinyin},${
                  entry.index
                },${word.traditional},${word.pinyin},${word.index}`
              "
              >Compare</a
            >
            <a
              class="character-example-word"
              :href="
                `#/view/cedict/${word.traditional},${word.pinyin},${word.index}`
              "
            >
              <span :data-hsk="word.book">{{ word.simplified }}</span>
            </a>
            <span class="character-example-pinyin">
              {{ word.pinyin }}
              <Speak :text="word.simplified" />
            </span>
            <ul class="character-example-english inline-list">
              <li v-for="definition in word.definitions">
                {{ definition.text }}
              </li>
            </ul>
          </li>
        </ul>
        <ShowMoreButton
          :data-bg-hsk="entry.book"
          :length="entry.related.length"
          :min="12"
        />
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
      if (response) {
        for (let Word of response.Words) {
          let word = CEDICT.lookupSimplified(Word.word)[0]
          if (word) {
            word = Normalizer.normalize(word)
            this.entry.related.push(word)
          }
        }
        this.relatedKey += 1
      }
    })
  }
}
</script>
