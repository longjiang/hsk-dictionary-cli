<template>
  <div :key="'grammar-' + grammarKey">
    <div
      class="text-center"
      v-if="entry.grammarPoints && entry.grammarPoints.length > 0"
    >
      <div class="label song-label mb-2">Grammar notes</div>
      <div class="grammar-notes" id="grammar">
        <div v-for="grammar in entry.grammarPoints" class="grammar-notes-item">
          <PinyinButton
            class="mb-4"
            :selector="`#grammar .grammar-structure, #grammar .grammar-example`"
          />
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
              Helper.highlight(grammar.example, entry.simplified, grammar.book)
            "
          ></div>
          <div class="character-example-english grammar-example-english">
            {{ grammar.exampleTranslation }}
          </div>
          <a
            v-if="grammar.url !== ''"
            :href="grammar.url"
            :data-bg-hsk="grammar.book"
            class="show-more mt-3 pl-3 pr-3"
            target="_blank"
          >
            <i class="glyphicon glyphicon-facetime-video mr-2"></i>
            <b>Grammar Lesson</b>
            {{ grammar.book }}.{{ grammar.lesson }}.{{ grammar.number }}
          </a>
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
