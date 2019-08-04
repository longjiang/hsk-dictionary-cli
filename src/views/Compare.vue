<template>
  <div class="main" v-cloak v-if="a && b" :key="'compare-' + compareKey">
    <div class="container">
      <div class="row mt-4 mb-3">
        <div class="col-sm-6">
          <EntryHeader :entry="a" minimal="true"></EntryHeader>
        </div>
        <div class="col-sm-6">
          <EntryHeader :entry="b" minimal="true"></EntryHeader>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <CompareDefs :a="a" :b="b"></CompareDefs>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-sm-6">
          <EntryWebImages :entry="a" limit="10"></EntryWebImages>
        </div>
        <div class="col-sm-6">
          <EntryWebImages :entry="b" limit="10"></EntryWebImages>
        </div>
      </div>
    </div>

    <div
      class="container-fluid mt-5 compare-example-bar pt-4 pb-4"
      v-if="a.example && b.example"
    >
      <div class="container">
        <div class="row" v-if="a.example && b.example">
          <div class="col-sm-6">
            <EntryExample
              class="mini"
              :entry="a"
              id="compare-example-a"
            ></EntryExample>
          </div>
          <div class="col-sm-6">
            <EntryExample
              class="mini"
              :entry="b"
              id="compare-example-b"
            ></EntryExample>
          </div>
        </div>
      </div>
    </div>

    <!-- <EntryRelated :entry="entry"></EntryRelated> -->

    <CompareCollocations class="mt-5" :a="a" :b="b"></CompareCollocations>

    <!-- <EntryCharacters :entry="entry"></EntryCharacters> -->
    <div class="container mt-5">
      <div class="row">
        <div class="col-sm-6">
          <EntryConcordance :entry="a"></EntryConcordance>
        </div>
        <div class="col-sm-6">
          <EntryConcordance :entry="b"></EntryConcordance>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <EntryGrammar :entry="a"></EntryGrammar>
        </div>
        <div class="col-sm-6">
          <EntryGrammar :entry="b"></EntryGrammar>
        </div>
      </div>
    </div>

    <div class="container mt-5">
      <div class="row">
        <div class="col-sm-6">
          <EntryMistakes :entry="a"></EntryMistakes>
        </div>
        <div class="col-sm-6">
          <EntryMistakes :entry="b"></EntryMistakes>
        </div>
      </div>
    </div>

    <EntryCourseAd :entry="b.book > a.book ? b : a"></EntryCourseAd>

    <EntryLyrics :entry="a" limit="1"></EntryLyrics>

    <EntryLyrics :entry="b" limit="1"></EntryLyrics>
  </div>
</template>

<script>
import EntryConcordance from '@/components/EntryConcordance.vue'
import EntryCourseAd from '@/components/EntryCourseAd.vue'
import EntryExample from '@/components/EntryExample.vue'
import EntryGrammar from '@/components/EntryGrammar.vue'
import EntryHeader from '@/components/EntryHeader.vue'
import EntryMistakes from '@/components/EntryMistakes.vue'
import EntryWebImages from '@/components/EntryWebImages.vue'
import EntryLyrics from '@/components/EntryLyrics.vue'
import CompareCollocations from '@/components/CompareCollocations.vue'
import CompareDefs from '@/components/CompareDefs.vue'
import Normalizer from '@/lib/normalizer'
import CEDICT from '@/lib/cedict'
import HSK from '@/lib/hsk'
import $ from 'jquery'

export default {
  components: {
    EntryConcordance,
    EntryCourseAd,
    EntryExample,
    EntryGrammar,
    EntryHeader,
    EntryMistakes,
    EntryLyrics,
    CompareCollocations,
    EntryWebImages,
    CompareDefs
  },
  data() {
    return {
      a: undefined,
      b: undefined,
      compareKey: 0
    }
  },
  methods: {
    route() {
      $('#hsk-dictionary')[0].scrollIntoView()
      let method = this.$route.params.method
      let args = this.$route.params.args.split(',')
      if (method && args) {
        let a = undefined
        let b = undefined
        if (method === 'cedict') {
          a = CEDICT.get([args[0], args[1], args[2]].join(','))
          b = CEDICT.get([args[3], args[4], args[5]].join(','))
        } else if (method === 'hsk') {
          a = HSK.get(args[0])
          b = HSK.get(args[1])
        }
        if (a && b) {
          this.a = Normalizer.normalize(a)
          this.b = Normalizer.normalize(b)
          this.compareKey++
        }
      }
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
