<template>
  <div class="main" v-cloak :key="'entry-' + entryKey" v-if="a && b">
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <EntryHeader :entry="a" minimal="true"></EntryHeader>
        </div>
        <div class="col-sm-6">
          <EntryHeader :entry="b" minimal="true"></EntryHeader>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 text-center definitions">
          <DefinitionsList :definitions="defCommon"></DefinitionsList>
          <i
            class="glyphicon glyphicon-random"
            style="transform: rotate(90deg)"
          ></i>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-sm-6 text-center">
          <DefinitionsList :definitions="defDistinct.a"></DefinitionsList>
        </div>
        <div class="col-sm-6 text-center">
          <DefinitionsList :definitions="defDistinct.b"></DefinitionsList>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-sm-6">
          <EntryWebImages :entry="a" limit="7"></EntryWebImages>
        </div>
        <div class="col-sm-6">
          <EntryWebImages :entry="b" limit="7"></EntryWebImages>
        </div>
      </div>
    </div>

    <div class="container-fluid mt-5 example-bar pt-5">
      <div class="container">
        <div class="row" v-if="a.example && b.example">
          <div class="col-sm-6">
            <EntryExample :entry="a" id="compare-example-a"></EntryExample>
          </div>
          <div class="col-sm-6">
            <EntryExample :entry="b" id="compare-example-b"></EntryExample>
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

    <!--
      <div class="container mt-5">
        <div class="row">
          <div class="col-sm-6">
            <EntryGrammar :entry="a"></EntryGrammar>
          </div>
          <div class="col-sm-6">
            <EntryGrammar :entry="b"></EntryGrammar>
          </div>
        </div>
      </div>
    -->

    <!-- <EntryCourseAd :entry="entry"></EntryCourseAd> -->

    <!-- <EntryLyrics :entry="entry"></EntryLyrics> -->
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
import DefinitionsList from '@/components/DefinitionsList.vue'
import CompareCollocations from '@/components/CompareCollocations.vue'
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
    CompareCollocations,
    EntryWebImages,
    DefinitionsList
  },
  data() {
    return {
      a: undefined,
      b: undefined,
      defCommon: [],
      defDistinct: {
        a: [],
        b: []
      },
      entryKey: 0 // used to force re-render this component
    }
  },
  methods: {
    defListIncludes(defList, def) {
      return defList.find(d => def.text.includes(d.text))
    },
    common(a, b) {
      for (let adef of a.definitions) {
        for (let bdef of b.definitions) {
          if (bdef.text.includes(adef.text)) {
            this.defCommon.push(adef)
          } else if (adef.text.includes(bdef.text)) {
            this.defCommon.push(bdef)
          }
        }
      }
      for (let adef of a.definitions) {
        if (!this.defListIncludes(this.defCommon, adef))
          this.defDistinct.a.push(adef)
      }
      for (let adef of b.definitions) {
        if (!this.defListIncludes(this.defCommon, adef))
          this.defDistinct.b.push(adef)
      }
      // not in this.defCommon
    },
    route() {
      let method = this.$route.params.method
      let args = this.$route.params.args
      if (method && args) {
        args = args.split(',')
        let a = CEDICT.get(args[0], args[1], args[2])
        let b = CEDICT.get(args[3], args[4], args[5])
        this.a = Normalizer.normalize(a)
        this.b = Normalizer.normalize(b)
        this.common(a, b)
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
    window.Normalizer = Normalizer
    if (this.$route.name === 'compare') {
      this.route()
    }
  }
}
</script>
