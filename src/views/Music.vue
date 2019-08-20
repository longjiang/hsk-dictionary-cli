<template>
  <div class="music">
    <div class="container main mt-5 mb-5">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center mb-5">Chinese Music</h1>
          <Search
            placeholder="Lookup a song or artist"
            type="generic"
            :term="args"
            :defaultURL="text => `#/music/search/${text}`"
          />
          <Song
            v-for="(lrc, lrcIndex) in lrcs"
            :lrc="lrc"
            :lrcIndex="lrcIndex"
            :collapse="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import LRC from '@/lib/lrc'
import Search from '@/components/Search'
import Song from '@/components/Song'
import $ from 'jquery'

export default {
  components: {
    Search,
    Song
  },
  props: {
    method: {
      type: String
    },
    args: {
      type: String
    }
  },
  data() {
    return {
      lrcs: []
    }
  },
  methods: {
    route() {
      $('#chinesezerotohero')[0].scrollIntoView()
      if (this.method && this.args) {
        let method = this.method
        let args = this.args.split(',')
        if (method === 'search') {
          let artistOrTitle = args[0]
          LRC.getLrcsByArtistOrTitle(artistOrTitle).then(
            lrcs => (this.lrcs = lrcs)
          )
        } else {
          this.lrcs = []
        }
      }
    }
  },
  watch: {
    $route() {
      if (this.$route.name === 'music') {
        this.route()
      }
    }
  },
  mounted() {
    this.route()
  }
}
</script>

<style></style>
