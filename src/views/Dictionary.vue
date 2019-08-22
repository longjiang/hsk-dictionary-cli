<template>
  <div class="main focus mt-5" v-cloak :key="'entry-' + entryKey">
    <div class="container focus-exclude">
      <div class="row">
        <div class="col-sm-12">
          <div class="text-center">
            <h2 class="mb-5">A dictionary for Chinese word lovers.</h2>
            <Loader ref="loader" class="mb-5" />
          </div>
          <SearchCompare :searchEntry="entry" />
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

            <WebImages
              class="mt-5"
              :text="entry.simplified"
              :entry="entry"
              limit="10"
            ></WebImages>

            <Grammar :text="entry.simplified" class="mt-5"></Grammar>

            <Collocations
              class="mt-5 mb-5"
              :text="entry.simplified"
              :level="entry.hsk"
            ></Collocations>
            <Concordance
              class="mt-5 mb-5"
              :text="entry.simplified"
              :level="entry.hsk"
            ></Concordance>

            <Mistakes class="mt-5 mb-5" :text="entry.simplified"></Mistakes>
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
import Concordance from '@/components/Concordance.vue'
import Collocations from '@/components/Collocations.vue'
import EntryCourseAd from '@/components/EntryCourseAd.vue'
import EntryExample from '@/components/EntryExample.vue'
import Grammar from '@/components/Grammar.vue'
import EntryHeader from '@/components/EntryHeader.vue'
import EntryLyrics from '@/components/EntryLyrics.vue'
import Mistakes from '@/components/Mistakes.vue'
import WebImages from '@/components/WebImages.vue'
import InstagramButton from '@/components/InstagramButton.vue'
import SearchCompare from '@/components/SearchCompare.vue'
import Helper from '@/lib/helper'
import $ from 'jquery'

export default {
  components: {
    SearchCompare,
    EntryCharacters,
    EntryDisambiguation,
    Collocations,
    Concordance,
    EntryCourseAd,
    EntryExample,
    Grammar,
    EntryHeader,
    EntryLyrics,
    Mistakes,
    InstagramButton,
    WebImages
  },
  data() {
    return {
      entry: undefined,
      characters: [],
      character: {},
      unsplashSrcs: [],
      unsplashSearchTerm: '',
      entryKey: 0 // used to force re-render this component
    }
  },
  methods: {
    show(entry) {
      this.entryKey += 1
      this.entry = entry
      document.title = `${entry.simplified} (${entry.pinyin}) ${
        entry.definitions[0].text
      } | Chinese Learning Wiki`
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
      if (this.$route.name === 'dictionary') {
        this.route()
      }
    }
  },
  mounted() {
    if (this.$route.name === 'dictionary') {
      this.route()
    }
  }
}
</script>

<style></style>
