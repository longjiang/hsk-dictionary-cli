<template>
  <div class="main focus" v-cloak :key="'entry-' + entryKey">
    <div class="container mt-4 mb-4">
      <div class="row">
        <div class="col-sm-12">
          <Loader class="mt-5" />
          <EntryHeader v-if="entry" :entry="entry"></EntryHeader>
        </div>
      </div>
    </div>

    <EntryDisambiguation
      class="mt-3 mb-5"
      v-if="entry"
      :entry="entry"
    ></EntryDisambiguation>

    <EntryExample class="mt5" v-if="entry" :entry="entry"></EntryExample>

    <EntryCharacters
      class="mb-4 simplified"
      v-if="entry"
      :text="entry.simplified"
      :pinyin="entry.pinyin"
    ></EntryCharacters>
    <EntryCharacters
      class="mb-4 traditional"
      v-if="entry"
      :text="entry.traditional"
      :pinyin="entry.pinyin"
    ></EntryCharacters>

    <EntryWebImages
      class="mt-5"
      v-if="entry"
      :text="entry.simplified"
      limit="10"
    ></EntryWebImages>

    <EntryGrammar :entry="entry" v-if="entry"></EntryGrammar>

    <!-- <EntryDisambiguation> already finds some pretty good suggestions. -->
    <!-- <EntryRelated class="mb-5" v-if="entry" :entry="entry"></EntryRelated> -->

    <EntryCollocations
      class="mt-5 mb-5"
      v-if="entry"
      :entry="entry"
    ></EntryCollocations>

    <EntryConcordance
      class="mt-5 mb-5"
      v-if="entry"
      :entry="entry"
    ></EntryConcordance>

    <div class="container mt-5 mb-5">
      <div class="row">
        <div class="col-sm-12">
          <EntryMistakes v-if="entry" :entry="entry"></EntryMistakes>
        </div>
      </div>
    </div>

    <EntryCourseAd
      v-if="entry"
      :entry="entry"
      class="focus-exclude"
    ></EntryCourseAd>

    <EntryLyrics
      v-if="entry"
      :entry="entry"
      class="focus-exclude"
    ></EntryLyrics>
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
import EntryRelated from '@/components/EntryRelated.vue'
import EntryWebImages from '@/components/EntryWebImages.vue'
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
    EntryRelated,
    EntryWebImages
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
      if (this.$parent.$refs.search) {
        this.$parent.$refs.search.entry = entry
        this.$parent.$refs.search.text = entry.simplified
      } else {
        throw 'Search-Entry link broken.'
      }
    },
    route() {
      $('#hsk-dictionary')[0].scrollIntoView()
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
      } else {
        if (!this.entry) {
          this.random()
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
    if (this.$route.name === 'entry') {
      this.route()
    }
  }
}
</script>
