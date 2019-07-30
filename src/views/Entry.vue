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

    <div class="container" :key="'web-images-' + webImagesKey" v-cloak>
      <div class="row mt-5 mb-5" v-if="entry.images && entry.images.length > 0">
        <div class="col-sm-12">
          <div class="image-wall">
            <img
              :src="image.img"
              alt
              v-if="!image.img.includes('nipic')"
              v-for="(image, index) in entry.images.slice(0, 20)"
              class="image-wall-image"
              v-bind:key="'image-' + index"
            />
          </div>
        </div>
      </div>
    </div>

    <EntryCharacters :entry="entry"></EntryCharacters>

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
import SavedWords from '@/lib/saved-words'
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
    EntryRelated
  },
  data() {
    return {
      entry: undefined,
      characters: [],
      character: {},
      unsplashSrcs: [],
      unsplashSearchTerm: '',
      SavedWords,
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
        entry.images = srcs
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
    }
  },
  mounted() {
    if (this.$route.params.method && this.$route.params.args) {
      const method = this.$route.params.method
      const args = this.$route.params.args.split(',')
      if (method == 'hsk') {
        if (args.length > 0) {
          const id = args[0]
          let entry = HSK.get(id)
          if (!entry) {
            location.hash = '/'
            return
          }
          entry.simplified = entry.word
          entry.definitions = [entry.english]
          entry.method = method
          entry.args = args
          const cedictCandidates = CEDICT.lookupSimplified(
            entry.simplified,
            entry.pinyin
          )
          if (cedictCandidates.length === 1) {
            entry = Object.assign(entry, cedictCandidates[0])
          }
          this.show(entry)
        }
      } else if (method === 'cedict') {
        if (args.length > 0) {
          const traditional = args[0]
          const pinyin = args[1]
          let entry = CEDICT.get(traditional, pinyin)
          if (entry) {
            entry.book = 'outside'
            entry.method = method
            entry.args = args
            this.show(entry)
          } else {
            location.hash = '/'
            return
          }
        }
      }
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
