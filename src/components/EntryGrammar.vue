<template>
  <div class="container" :key="'grammar-' + grammarKey">
    <div
      class="row mt-5 mb-5"
      v-if="entry.grammarPoints && entry.grammarPoints.length > 0"
    >
      <div class="col-sm-12 text-center">
        <div class="label song-label mb-2">Grammar notes</div>
        <button
          class="show-more mt-4"
          v-on:click="Helper.showPinyinClick"
          data-target-selector="#grammar .grammar-structure, #grammar .grammar-example"
        >
          Show Pinyin
        </button>
        <div class="grammar-notes" id="grammar">
          <div
            v-for="grammar in entry.grammarPoints"
            class="grammar-notes-item"
          >
            <div class="character-example-header-word grammar-structure">
              <b
                v-html="
                  Helper.highlight(
                    grammar.structure,
                    entry.simplified,
                    grammar.book
                  )
                "
              ></b>
            </div>
            <div class="example-sentence-english grammar-english">
              {{ grammar.english }}
            </div>
            <div
              class="example-sentence-word grammar-example"
              v-html="
                Helper.highlight(
                  grammar.example,
                  entry.simplified,
                  grammar.book
                )
              "
            ></div>
            <div class="character-example-english grammar-example-english">
              {{ grammar.exampleTranslation }}
            </div>
            <a
              v-if="grammar.url !== ''"
              :href="grammar.url"
              :data-bg-hsk="grammar.book"
              class="show-more mt-3"
              target="_blank"
            >
              <i class="glyphicon glyphicon-facetime-video"></i>
              <b>Grammar Lesson</b>
              (HSK {{ grammar.book }} Lesson {{ grammar.lesson }} Grammar Note
              {{ grammar.number }} )
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Helper from '@/lib/helper'
import Grammar from '@/lib/grammar'

export default {
  props: ['entry'],
  data() {
    return {
      Helper,
      grammarKey: 0
    }
  },
  mounted() {
    this.entry.grammarPoints = Grammar.lookupFuzzy(this.entry.simplified)
    this.grammarKey += 1
  }
}
</script>
