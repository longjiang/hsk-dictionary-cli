<template>
  <div class="youtube-view main">
    <div class="container mt-5 mb-5">
      <div class="row">
        <div class="col-sm-12">
          <YouTubeNav class="mb-5" ref="search" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="sticky" :key="'youtube-' + args">
            <YouTubeVideo ref="youtube" :youtube="args" />
          </div>
        </div>
        <div class="col-sm-6" :key="'transcript-' + args">
          <Loader v-if="loading" :sticky="true" />
          <SyncedTranscript
            ref="transcript"
            :onSeek="seekYouTube"
            :lines="this.chinese"
            :parallellines="this.english"
            v-else-if="!loading && hasSubtitles"
          />
          <div
            v-else-if="!loading && !hasSubtitles"
            class="jumbotron pt-4 pb-3 bg-light"
          >
            <h6>
              Sorry, this YouTube video does not have Chinese closed captions.
            </h6>
            <p>
              You can tell if a YouTube video has closed captions by clicking on
              the <b>CC</b> icon in the player bar, and click on the
              <font-awesome-icon icon="cog" /> next to it. If you can find the
              subtitle with the language
              <b>Chinese (Mainland, Taiwan, or Hong Kong)</b> then the video has
              Chinese subtitles.
            </p>
            <p>
              To look for videos with Chinese subtitles, search with a Chinese
              keyword, and click <b>Filter</b>, then <b>CC</b>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YouTubeVideo from '@/components/YouTubeVideo'
import SyncedTranscript from '@/components/SyncedTranscript'
import YouTubeNav from '@/components/YouTubeNav'
import Helper from '@/lib/helper'

const LANGUAGE_OPTIONS = ['zh-CN', 'zh-Hans', 'zh-Hant', 'zh-TW', 'zh-HK']

export default {
  components: {
    YouTubeNav,
    YouTubeVideo,
    SyncedTranscript
  },
  props: {
    args: {
      type: String
    }
  },
  watch: {
    args() {
      this.getTranscript()
      this.$refs.search.url = `https://www.youtube.com/watch?v=${this.args}`
    }
  },
  data() {
    return {
      chinese: [],
      english: [],
      hasSubtitles: false,
      loading: true
    }
  },
  methods: {
    seekYouTube(starttime) {
      this.$refs.youtube.seek(starttime)
    },
    async getTranscript() {
      this.chinese = []
      this.english = []
      this.hasSubtitles = false
      this.loading = true
      for (let i = 0; i < LANGUAGE_OPTIONS.length; i++) {
        await Helper.scrape(
          `https://www.youtube.com/api/timedtext?v=${this.args}&lang=${
            LANGUAGE_OPTIONS[i]
          }&fmt=srv3`,
          $html => {
            for (let p of $html.find('p')) {
              let line = {
                line: $(p).text(),
                starttime: parseInt($(p).attr('t')) / 1000
              }
              this.chinese.push(line)
            }
          }
        )
        await Helper.scrape(
          `https://www.youtube.com/api/timedtext?v=${this.args}&lang=${
            LANGUAGE_OPTIONS[i]
          }&fmt=srv3&tlang=en`,
          $html => {
            for (let p of $html.find('p')) {
              let line = {
                line: $(p).text(),
                starttime: parseInt($(p).attr('t')) / 1000
              }
              this.english.push(line)
            }
          }
        )

        if (this.english.length > 0 && this.chinese.length > 0) {
          this.hasSubtitles = true
          break
        }
      }
      this.loading = false
    }
  },
  mounted() {
    this.getTranscript()
    this.$refs.search.url = `https://www.youtube.com/watch?v=${this.args}`
    setInterval(() => {
      if (this.$refs.transcript) {
        this.$refs.transcript.currentTime = this.$refs.youtube
          ? this.$refs.youtube.currentTime()
          : 0
      }
    }, 1000)
  }
}
</script>
