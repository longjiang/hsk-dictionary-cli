<template>
  <div class="youtube-view main">
    <div class="container mt-5 mb-5">
      <div class="row">
        <div class="col-sm-12">
          <YouTubeNav class="mb-5" ref="search" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <h3 class="mb-5" :key="title"><Annotate>{{ title }}</Annotate></h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="sticky" :key="'youtube-' + args">
            <YouTubeVideo ref="youtube" :youtube="args" />
            <YouTubeChannelCard v-if="channel" :channel="channel" class="mt-4" />
          </div>
        </div>
        <div class="col-sm-6" :key="'transcript-' + args">
          <div v-if="loading" class="text-center">
            <Loader :sticky="true" />
          </div>
          <SyncedTranscript
            ref="transcript"
            :onSeek="seekYouTube"
            :lines="this.chinese"
            :parallellines="this.english"
            v-else-if="!loading && hasSubtitles"
          />
          <div v-else-if="!loading && !hasSubtitles" class="jumbotron pt-4 pb-3 bg-light">
            <h6>Sorry, this YouTube video does not have Chinese closed captions.</h6>
            <p>
              You can tell if a YouTube video has closed captions by clicking on
              the
              <b>CC</b> icon in the player bar, and click on the
              <font-awesome-icon icon="cog" />next to it. If you can find the
              subtitle with the language
              <b>Chinese (Mainland, Taiwan, or Hong Kong)</b> then the video has
              Chinese subtitles.
            </p>
            <p>
              To look for videos with Chinese subtitles, search with a Chinese
              keyword, and click
              <b>Filter</b>, then
              <b>CC</b>.
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
import YouTubeChannelCard from '@/components/YouTubeChannelCard'
import Helper from '@/lib/helper'

const LANGUAGE_OPTIONS = ['zh-CN', 'zh-Hans', 'zh-Hant', 'zh-TW', 'zh-HK']

export default {
  components: {
    YouTubeNav,
    YouTubeVideo,
    YouTubeChannelCard,
    SyncedTranscript
  },
  props: {
    args: {
      type: String
    }
  },
  watch: {
    args() {
      $('#chinesezerotohero')[0].scrollIntoView()
      this.getVideoDetails()
      this.getTranscript()
      this.$refs.search.url = `https://www.youtube.com/watch?v=${this.args}`
    }
  },
  data() {
    return {
      chinese: [],
      english: [],
      title: undefined,
      channel: undefined,
      hasSubtitles: false,
      loading: true
    }
  },
  methods: {
    seekYouTube(starttime) {
      this.$refs.youtube.seek(starttime)
    },
    getVideoDetails() {
      this.title = undefined
      this.channel = undefined
      Helper.scrape(
        `https://www.youtube.com/watch?v=${this.args}`,
        $html => {
          this.title = $html.find('#eow-title').attr('title')
          this.channel = {
            id: $html.find('meta[itemprop="channelId"]').attr('content'),
            avatar: $html.find('#watch7-user-header img').attr('data-thumb'),
            title: $html.find('#watch7-user-header .yt-uix-sessionlink').text().trim()
          }
        }
      )
    },
    async getTranscript() {
      this.chinese = []
      this.english = []
      this.hasSubtitles = false
      this.loading = true
      let chosenLanguage
      const promises = []
      for (let language of LANGUAGE_OPTIONS) {
        promises.push(
          Helper.scrape(
            `https://www.youtube.com/api/timedtext?v=${this.args}&lang=${language}&fmt=srv3`,
            $html => {
              chosenLanguage = language
              for (let p of $html.find('p')) {
                let line = {
                  line: $(p).text(),
                  starttime: parseInt($(p).attr('t')) / 1000
                }
                this.chinese.push(line)
              }
            }
          )
        )
      }
      await Promise.all(promises)
      if (this.chinese.length > 0) {
        await Helper.scrape(
          `https://www.youtube.com/api/timedtext?v=${this.args}&lang=${chosenLanguage}&fmt=srv3&tlang=en`,
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
        this.hasSubtitles = true
      }
      this.loading = false
    }
  },
  mounted() {
    $('#chinesezerotohero')[0].scrollIntoView()
    this.getVideoDetails()
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
