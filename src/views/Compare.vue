<template>
  <div class="main" v-cloak :key="'entry-' + entryKey" v-if="entry">
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          {{ a.simplified }}
        </div>
        <div class="col-sm-6">
          {{ b.simplified }}
        </div>
      </div>
    </div>
    <!--
    <EntryHeader :entry="entry"></EntryHeader>

    <EntryExample :entry="entry"></EntryExample>

    <EntryCharacters :entry="entry"></EntryCharacters>

    <EntryWebImages :entry="entry"></EntryWebImages>

    <EntryGrammar :entry="entry"></EntryGrammar>

    <EntryRelated :entry="entry"></EntryRelated>

    <EntryCollocations :entry="entry"></EntryCollocations>

    <EntryConcordance :entry="entry"></EntryConcordance>

    <EntryMistakes :entry="entry"></EntryMistakes>

    <EntryCourseAd :entry="entry"></EntryCourseAd>

    <EntryLyrics :entry="entry"></EntryLyrics>
    -->
  </div>
</template>

<script>
import EntryCharacters from '@/components/EntryCharacters.vue'
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
import WordPhotos from '@/lib/word-photos'
import $ from 'jquery'

export default {
  components: {
    EntryCharacters,
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
      a: undefined,
      b: undefined,
      entryKey: 0 // used to force re-render this component
    }
  },
  methods: {
    show(a, b) {
      this.entryKey += 1
      this.a = a
      this.b = b
    },
    route() {
      // route
    },
    random() {
      const random = CEDICT.random()
      location.hash = `/view/cedict/${random.traditional},${random.pinyin}`
    }
  },
  watch: {
    $route() {
      if (this.$route.name === 'compare') {
        this.route()
      }
    }
  },
  mounted() {
    if (this.$route.name === 'compare') {
      this.route()
    }
  }
}
</script>
