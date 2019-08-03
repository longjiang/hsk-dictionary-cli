<template>
  <div class="main" v-cloak :key="'entry-' + entryKey" v-if="entry">
    <div class="container mt-4 mb-4">
      <div class="row">
        <div class="col-sm-12">
          <EntryHeader :entry="entry"></EntryHeader>
        </div>
      </div>
    </div>

    <EntryExample :entry="entry"></EntryExample>

    <EntryDisambiguation class="mt-4 mb-4" :entry="entry"></EntryDisambiguation>

    <EntryCharacters :entry="entry"></EntryCharacters>

    <EntryWebImages :entry="entry"></EntryWebImages>

    <EntryGrammar :entry="entry"></EntryGrammar>

    <EntryRelated :entry="entry"></EntryRelated>

    <EntryCollocations :entry="entry"></EntryCollocations>

    <EntryConcordance :entry="entry"></EntryConcordance>

    <EntryMistakes :entry="entry"></EntryMistakes>

    <EntryCourseAd :entry="entry"></EntryCourseAd>

    <EntryLyrics :entry="entry"></EntryLyrics>
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
import Normalizer from '@/lib/normalizer'
import HSK from '@/lib/hsk'
import Hanzi from '@/lib/hanzi'
import CEDICT from '@/lib/cedict'
import LRC from '@/lib/lrc'
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
      Helper,
      HSK,
      LRC,
      Hanzi,
      entryKey: 0 // used to force re-render this component
    }
  },
  methods: {
    show(entry) {
      this.entryKey += 1
      this.entry = entry
      if (this.$parent.$refs.search) {
        if (this.$parent.$refs.search.main === 'true') {
          this.$parent.$refs.search.entry = entry
          this.$parent.$refs.search.text = entry.simplified
        }
      } else {
        throw 'Search-Entry link broken.'
      }
    },
    route() {
      if (this.$route.params.method && this.$route.params.args) {
        const method = this.$route.params.method
        const args = this.$route.params.args.split(',')
        let entry = undefined
        if (method === 'hsk') {
          entry = HSK.get(args[0])
        } else if (method === 'cedict') {
          if (!args[1]) {
            this.random()
            return
          }
          entry = CEDICT.get(args.join(','))
        }
        entry = Normalizer.normalize(entry)
        if (entry.hasCEDICT) {
          if (method === 'hsk' || args[1].includes(' '))
            // normalize url
            location.hash = `/view/cedict/${entry.identifier}`
          else this.show(entry)
          return
        } else {
          // in the RARE care like "踢足球" the word is in HSK but not in CEDICT
          this.show(entry)
          return
        }
      }
      this.random()
    },
    random() {
      const random = CEDICT.random()
      location.hash = `/view/cedict/${random.identifier}`
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
