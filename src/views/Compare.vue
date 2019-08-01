<template>
  <div class="main" v-cloak :key="'entry-' + entryKey" v-if="entry">
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
      entry: undefined,
      characters: [],
      character: {},
      unsplashSrcs: [],
      unsplashSearchTerm: '',
      Helper,
      HSK,
      LRC,
      Hanzi,
      entryKey: 0, // used to force re-render this component
      webImagesKey: 0
    }
  },
  computed: {
    hash: function() {
      if (this.entry && this.entry.method) {
        let args
        if (this.entry.method === 'hsk') {
          args = [this.entry.id]
        } else if (this.entry.method === 'cedict') {
          args = [this.entry.traditional]
        }
        return `view/${this.entry.method}/${args.join(',')}`
      } else {
        // uninitialized
        return `view/hsk/1`
      }
    }
  },
  methods: {
    show(entry) {
      this.entryKey += 1
      this.entry = entry
      WordPhotos.getWebImages(entry.simplified, srcs => {
        this.entry.images = srcs
        this.webImagesKey += 1
      })
      $('#lookup').val(entry.simplified)
    },
    attachSpeakEventHandler: function() {
      $('.speak')
        .off()
        .click(function() {
          var text = $(this).attr('data-speak')
          var utterance = new SpeechSynthesisUtterance(text)
          utterance.lang = 'zh-CN'
          speechSynthesis.speak(utterance)
        })
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
          entry = CEDICT.get(args[0], args[1].replace(/_/g, ' '))
        }
        entry = Normalizer.normalize(entry)
        if (entry.simplified) {
          if (method === 'hsk' || args[1].includes(' '))
            location.hash = `/view/cedict/${
              entry.traditional
            },${entry.pinyin.replace(/ /g, '_')}`
          else this.show(entry)
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
  },
  updated() {
    const app = this
    if (this.entry) {
      app.attachSpeakEventHandler()
    }
  }
}
</script>
