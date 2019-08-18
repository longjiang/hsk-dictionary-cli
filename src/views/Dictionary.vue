<template>
  <div class="main focus mt-5 mb-5" v-cloak :key="'entry-' + entryKey">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h4>Dictionary</h4>
          <p>
            Search for any word, or compare two words. Dictionary data provided
            by in the
            <a
              href="https://www.mdbg.net/chinese/dictionary?page=cedict"
              target="_blank"
            >
              CC-CEDICT <i class="glyphicon glyphicon-new-window"></i></a
            >.
          </p>
          <hr class="mb-5" />
          <div class="text-center">
            <Loader ref="loader" />
          </div>
          <div class="search-compare-wrapper" v-if="loaded">
            <Search ref="search" random="true"></Search>
            <Search
              :class="{ 'ml-2': true, hidden: !compare }"
              ref="compare"
              placeholder="Compare with..."
              :hrefFunc="compareHrefFunc"
            ></Search>
            <button class="btn btn-compare ml-2" @click="compareClick">
              <span v-if="compare"
                ><i class="glyphicon glyphicon-remove-sign"></i></span
              ><span v-if="!compare"
                ><i class="glyphicon glyphicon-adjust"></i>
                <span class="compare-btn-text ml-1">Compare</span></span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="entry">
      <div class="text-center mt-5">
        <Loader class="mt-5" />
      </div>
      <div class="container mt-4 mb-4">
        <div class="row">
          <div class="col-sm-12">
            <div>
              <InstagramButton :entry="entry" class="mb-5"></InstagramButton>
            </div>

            <EntryHeader :entry="entry"></EntryHeader>

            <EntryDisambiguation
              class="mt-5 mb-5"
              :entry="entry"
            ></EntryDisambiguation>
          </div>
        </div>
      </div>
      <div class="container-fluid example-bar mt-4 mb-4">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <EntryExample class="mt5" :entry="entry"></EntryExample>
            </div>
          </div>
        </div>
      </div>

      <!-- <EntryDisambiguation> already finds some pretty good suggestions. -->
      <!-- <EntryRelated class="mb-5" :entry="entry"></EntryRelated> -->

      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <EntryCharacters
              class="mb-4 simplified"
              :text="entry.simplified"
              :pinyin="entry.pinyin"
            ></EntryCharacters>

            <EntryCharacters
              class="mb-4 traditional"
              :text="entry.traditional"
              :pinyin="entry.pinyin"
            ></EntryCharacters>

            <EntryWebImages
              class="mt-5"
              :text="entry.simplified"
              :entry="entry"
              limit="10"
            ></EntryWebImages>

            <EntryGrammar :entry="entry" class="mt-5"></EntryGrammar>

            <EntryCollocations
              class="mt-5 mb-5"
              :entry="entry"
            ></EntryCollocations>
            <EntryConcordance
              class="mt-5 mb-5"
              :entry="entry"
            ></EntryConcordance>

            <EntryMistakes class="mt-5 mb-5" :entry="entry"></EntryMistakes>
          </div>
        </div>
      </div>

      <EntryCourseAd :entry="entry" class="focus-exclude"></EntryCourseAd>

      <EntryLyrics :entry="entry" class="focus-exclude"></EntryLyrics>
    </div>
  </div>
</template>

<script>
import EntryCharacters from '@/components/EntryCharacters.vue'
import EntryDisambiguation from '@/components/EntryDisambiguation.vue'
import EntryConcordance from '@/components/EntryConcordance.vue'
import EntryCollocations from '@/components/EntryCollocations.vue'
import EntryCourseAd from '@/components/EntryCourseAd.vue'
import EntryExample from '@/components/EntryExample.vue'
import EntryGrammar from '@/components/EntryGrammar.vue'
import EntryHeader from '@/components/EntryHeader.vue'
import EntryLyrics from '@/components/EntryLyrics.vue'
import EntryMistakes from '@/components/EntryMistakes.vue'
import EntryWebImages from '@/components/EntryWebImages.vue'
import InstagramButton from '@/components/InstagramButton.vue'
import Search from '@/components/Search.vue'
import Helper from '@/lib/helper'
import $ from 'jquery'

export default {
  components: {
    EntryCharacters,
    EntryDisambiguation,
    EntryCollocations,
    EntryConcordance,
    EntryCourseAd,
    EntryExample,
    EntryGrammar,
    EntryHeader,
    EntryLyrics,
    EntryMistakes,
    InstagramButton,
    EntryWebImages,
    Search
  },
  data() {
    return {
      entry: undefined,
      characters: [],
      character: {},
      unsplashSrcs: [],
      unsplashSearchTerm: '',
      loaded: false,
      compare: false,
      entryKey: 0, // used to force re-render this component
      compareHrefFunc: compareEntry => {
        const entry =
          this.$root.$children[0].$refs.search.entry ||
          this.$root.$children[0].$refs.routerView.entry
        return `#/compare/cedict/${entry.identifier},${compareEntry.identifier}`
      }
    }
  },
  methods: {
    compareClick() {
      this.compare = this.compare ? false : true
    },
    show(entry) {
      this.entryKey += 1
      this.entry = entry
      document.title = `${entry.simplified} (${entry.pinyin}) ${
        entry.definitions[0].text
      } | Chinese Learning Wiki`
      if (this.$parent.$refs.search) {
        this.$parent.$refs.search.entry = entry
        this.$parent.$refs.search.text = entry.simplified
      } else {
        throw 'Search-Entry link broken.'
      }
    },
    route() {
      $('#chinesezerotohero')[0].scrollIntoView()
      if (this.$route.params.method && this.$route.params.arg) {
        const method = this.$route.params.method
        const arg = this.$route.params.arg
        if (method === 'hsk') {
          Helper.loaded(
            (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
              LoadedHSKCEDICT.getByHSKId(entry => this.show(entry), [arg])
            }
          )
        } else if (method === 'cedict') {
          if (arg === 'random') {
            this.random()
          }
          Helper.loaded(
            (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
              LoadedHSKCEDICT.getByIdentifier(entry => this.show(entry), [arg])
            }
          )
        } else {
          if (!this.entry) {
            this.random()
          }
        }
      }
    },
    random() {
      Helper.loaded((LoadedAnnotator, LoadedHSKCEDICT) => {
        LoadedHSKCEDICT.random(
          entry => (location.hash = `/view/cedict/${entry.identifier}`)
        )
      })
    }
  },
  watch: {
    $route() {
      if (this.$route.name === 'entry') {
        this.route()
      }
    }
  },
  mounted() {
    Helper.loaded(() => {
      this.loaded = true
    })
    if (this.$route.name === 'entry') {
      this.route()
    }
  }
}
</script>

<style></style>
