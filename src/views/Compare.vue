<template>
  <div class="main" v-cloak>
    <div class="container focus">
      <div class="row mt-4 mb-3">
        <div class="col-sm-6">
          <Loader v-if="!a" class="mt-5" />
          <Frequency class="mb-1" v-if="a" :entry="a" />
          <EntryHeader
            v-if="a"
            :entry="a"
            minimal="true"
            :key="aKey"
          ></EntryHeader>
        </div>
        <div class="col-sm-6">
          <Loader v-if="!b" class="mt-5" />
          <Frequency class="mb-1" v-if="b" :entry="b" />
          <EntryHeader
            v-if="b"
            :entry="b"
            minimal="true"
            :key="aKey"
          ></EntryHeader>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <CompareDefs
            v-if="a && b"
            :a="a"
            :b="b"
            :key="aKey + bKey"
          ></CompareDefs>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-sm-6">
          <EntryWebImages
            v-if="a"
            :text="a.simplified"
            limit="10"
            :key="aKey"
          ></EntryWebImages>
        </div>
        <div class="col-sm-6">
          <EntryWebImages
            v-if="b"
            :text="b.simplified"
            limit="10"
            :key="bKey"
          ></EntryWebImages>
        </div>
      </div>
    </div>

    <div
      class="container-fluid mt-5 focus compare-example-bar"
      v-if="a && b && a.example && b.example"
    >
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <EntryExample
              class="mini"
              :key="aKey"
              :entry="a"
              scale="0.5"
              id="compare-example-a"
            ></EntryExample>
          </div>
          <div class="col-sm-6">
            <EntryExample
              class="mini"
              :key="bKey"
              :entry="b"
              scale="0.5"
              id="compare-example-b"
            ></EntryExample>
          </div>
        </div>
      </div>
    </div>

    <!-- <EntryRelated :entry="entry"></EntryRelated> -->

    <CompareCollocations
      class="mt-5 focus"
      v-if="a && b"
      :a="a"
      :b="b"
    ></CompareCollocations>

    <!-- <EntryCharacters :entry="entry"></EntryCharacters> -->
    <div class="container mt-5 focus">
      <div class="row">
        <div class="col-sm-6">
          <EntryConcordance v-if="a" :entry="a" :key="aKey"></EntryConcordance>
        </div>
        <div class="col-sm-6">
          <EntryConcordance v-if="b" :entry="b" :key="bKey"></EntryConcordance>
        </div>
      </div>
    </div>

    <div class="container focus">
      <div class="row">
        <div class="col-sm-6">
          <EntryGrammar v-if="a" :entry="a" :key="aKey"></EntryGrammar>
        </div>
        <div class="col-sm-6">
          <EntryGrammar v-if="b" :entry="b" :key="bKey"></EntryGrammar>
        </div>
      </div>
    </div>

    <div class="container mt-5 focus">
      <div class="row">
        <div class="col-sm-6">
          <EntryMistakes v-if="a" :entry="a" :key="aKey"></EntryMistakes>
        </div>
        <div class="col-sm-6">
          <EntryMistakes v-if="b" :entry="b" :key="bKey"></EntryMistakes>
        </div>
      </div>
    </div>

    <EntryCourseAd
      v-if="a && b"
      :entry="b.hsk > a.hsk ? b : a"
      :key="aKey + bKey"
    ></EntryCourseAd>

    <EntryLyrics v-if="a" :entry="a" limit="1" :key="aKey"></EntryLyrics>

    <EntryLyrics v-if="b" :entry="b" limit="1" :key="bKey"></EntryLyrics>
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
import Frequency from '@/components/Frequency.vue'
import Helper from '@/lib/helper'
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
    Frequency,
    CompareCollocations,
    EntryWebImages,
    CompareDefs
  },
  data() {
    return {
      a: undefined,
      b: undefined,
      aKey: 0,
      bKey: 100
    }
  },
  methods: {
    route() {
      $('#hsk-dictionary')[0].scrollIntoView()
      let method = this.$route.params.method
      let args = this.$route.params.args.split(',')
      if (method && args) {
        if (method === 'cedict') {
          Helper.loaded(
            (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
              LoadedHSKCEDICT.getByIdentifier(entry => (this.a = entry), [
                [args[0], args[1], args[2]].join(',')
              ])
              LoadedHSKCEDICT.getByIdentifier(entry => (this.b = entry), [
                [args[3], args[4], args[5]].join(',')
              ])
            }
          )
        } else if (method === 'hsk') {
          Helper.loaded(
            (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
              LoadedHSKCEDICT.getByHSKId(entry => (this.a = entry), [[args[0]]])
              LoadedHSKCEDICT.getByHSKId(entry => (this.b = entry), [[args[1]]])
            }
          )
        } else if (method === 'simplified') {
          Helper.loaded(
            (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
              LoadedHSKCEDICT.getByHSKId(entry => (this.a = entry), [[args[0]]])
              LoadedHSKCEDICT.getByHSKId(entry => (this.b = entry), [[args[1]]])
            }
          )
        }
      }
    }
  },
  watch: {
    a() {
      this.$parent.$refs.search.entry = this.a
      this.$parent.$refs.search.text = this.a.simplified
      this.aKey++
    },
    b() {
      this.$parent.$refs.compare.entry = this.b
      this.$parent.$refs.compare.text = this.b.simplified
      this.bKey++
    },
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
