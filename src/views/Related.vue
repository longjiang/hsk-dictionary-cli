<template>
  <div class="main mt-4 mb-4">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div v-if="!arg">
            <h4>Explore Related Words</h4>
            <p>Search for a word, and see words associated with it.</p>
            <Loader class="mt-5" />
            <Search :hrefFunc="hrefFunc" />
          </div>
          <div v-if="arg">
            <WordListExended v-if="word" :words="[word]" />
            <h4 class="text-center mt-5 mb-5">Words of Similar Meaning</h4>
            <Merge direction="bottom" class="h-half mt-5 mb-5" />
            <WordListExended v-if="similar.length > 0" :words="similar" />
            <Merge direction="top" class="h-half mt-5 mb-5" />
            <h4 class="text-center">Related Words</h4>
            <Merge direction="bottom" class="h-half mt-5 mb-5" />
            <WordListExended v-if="related.length > 0" :words="related" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import WordListExended from '@/components/WordListExended.vue'
import DefinitionsList from '@/components/DefinitionsList.vue'
import Search from '@/components/Search.vue'
import SketchEngine from '@/lib/sketch-engine'
import Merge from '@/components/Merge'
import $ from 'jquery'

export default {
  components: {
    WordListExended,
    DefinitionsList,
    Merge,
    Search
  },
  beforeMount() {
    this.route()
  },
  methods: {
    route() {
      $('#hsk-dictionary')[0].scrollIntoView()
      if (this.$route.params.arg) {
        this.arg = this.$route.params.arg
        Helper.loaded(
          (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
            LoadedHSKCEDICT.getByIdentifier(
              word => {
                this.word = word
                for (let definition of this.word.definitions) {
                  LoadedHSKCEDICT.lookupByDefinition(
                    words => {
                      for (let word of words.filter(
                        word => word.hsk !== 'outside'
                      )) {
                        if (word.identifier !== this.word.identifier) {
                          this.similar.push(word)
                        }
                      }
                    },
                    [definition.text]
                  )
                }
                SketchEngine.thesaurus(this.word.simplified, response => {
                  this.words = []
                  if (response) {
                    for (let Word of response.Words) {
                      Helper.loaded((LoadedAnnotator, LoadedHSKCEDICT) => {
                        LoadedHSKCEDICT.lookupSimplified(
                          words => {
                            words = words.filter(word => word.hsk !== 'outside')
                            if (words.length > 0) {
                              let word = words[0]
                              this.related.push(word)
                            }
                          },
                          [Word.word]
                        )
                      })
                    }
                  }
                })
              },
              [this.arg]
            )
          }
        )
      } else {
        this.arg = ''
      }
    }
  },
  watch: {
    $route() {
      this.route()
    }
  },
  data() {
    return {
      Helper,
      word: undefined,
      arg: undefined,
      similar: [],
      related: [],
      hrefFunc: entry => `#/explore/related/${entry.identifier}`
    }
  }
}
</script>
