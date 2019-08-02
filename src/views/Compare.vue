<template>
  <div class="main" v-cloak v-if="a && b">
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
        <div class="col-sm-12">
          <CompareDefs :a="a" :b="b" :key="compareDefKey"></CompareDefs>
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

    <div class="container-fluid mt-5 example-bar pt-4 pb-4">
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
import CompareCollocations from '@/components/CompareCollocations.vue'
import CompareDefs from '@/components/CompareDefs.vue'
import Normalizer from '@/lib/normalizer'
import CEDICT from '@/lib/cedict'

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
    CompareDefs
  },
  data() {
    return {
      a: undefined,
      b: undefined,
      compareDefKey: 0
    }
  },
  methods: {
    route() {
      let method = this.$route.params.method
      let args = this.$route.params.args
      if (method && args) {
        args = args.split(',')
        let a = CEDICT.get(args[0], args[1], args[2])
        let b = CEDICT.get(args[3], args[4], args[5])
        this.a = Normalizer.normalize(a)
        this.b = Normalizer.normalize(b)
        this.compareDefKey++
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
