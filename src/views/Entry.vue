<template>
  <div class="main" v-cloak :key="'entry-' + entryKey" v-if="entry">
    <EntryHeader :entry="entry"></EntryHeader>

    <!-- ANCHOR img/anchors/oofc.png -->
    <div
      class="container-fluid mb2"
      v-cloak
      v-if="entry.oofc && entry.oofc !== ''"
    >
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            This word is not required in HSK {{ entry.book }} but is covered in
            our
            <a
              href="https://courses.chinesezerotohero.com/"
              :data-hsk="entry.book"
              class="video-course"
              >HSK {{ entry.book }} Video Course</a
            >
            as an optional vocabulary word.
          </div>
        </div>
      </div>
    </div>

    <!-- ANCHOR img/anchors/pn.png -->
    <div class="container-fluid mb2" v-cloak v-if="entry.pn && entry.pn !== ''">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            This is a
            <b>
              <em>proper noun</em>
            </b>
            that appeared in
            <b>
              Lesson {{ entry.lesson }}
              <span v-if="entry.book < 5">, Text {{ entry.dialog }}</span>
            </b>
            of our
            <a
              href="https://courses.chinesezerotohero.com/"
              :data-hsk="entry.book"
              class="video-course"
              >HSK {{ entry.book }} Video Course</a
            >.
          </div>
        </div>
      </div>
    </div>

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
      window.hskDictionaryApp.$refs.search.entry = entry
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
          const traditional = args[0]
          const pinyin = args[1].replace(/_/g, ' ')
          const index = args[2] || 0
          entry = CEDICT.get(traditional, pinyin, index)
        }
        entry = Normalizer.normalize(entry)
        if (entry.hasCEDICT) {
          if (method === 'hsk' || args[1].includes(' '))
            // normalize url
            location.hash = `/view/cedict/${
              entry.traditional
            },${entry.pinyin.replace(/ /g, '_')}`
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
      location.hash = `/view/cedict/${random.traditional},${random.pinyin}`
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
