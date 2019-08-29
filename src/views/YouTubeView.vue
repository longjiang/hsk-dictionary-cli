<template>
  <div class="youtube-view main">
    <div class="container mt-5 mb-5">
      <div class="row">
        <div class="col-sm-12">
          <YouTubeNav class="mb-5" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="sticky">
            <YouTubeVideo ref="youtube" :youtube="args" />
          </div>
        </div>
        <div class="col-sm-6">
          <SyncedTranscript
            ref="transcript"
            :onSeek="seekYouTube"
            :lines="this.chinese"
            :parallellines="this.english"
          />
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
  data() {
    return {
      chinese: [],
      english: []
    }
  },
  methods: {
    seekYouTube(starttime) {
      this.$refs.youtube.seek(starttime)
    }
  },
  mounted() {
    setInterval(() => {
      this.$refs.transcript.currentTime = this.$refs.youtube
        ? this.$refs.youtube.currentTime()
        : 0
    }, 200)
    Helper.scrape(
      `https://www.youtube.com/api/timedtext?v=${this.args}&lang=zh-CN&fmt=srv3`,
      $html => {
        for (let p of $html.find('p')) {
          let line = {
            line: $(p).text(),
            starttime: parseInt($(p).attr('t')) / 1000
          }
          this.chinese.push(line)
        }
        console.log(this.chinese)
      }
    ),
      Helper.scrape(
        `https://www.youtube.com/api/timedtext?v=${this.args}&lang=zh-CN&fmt=srv3&tlang=en`,
        $html => {
          for (let p of $html.find('p')) {
            let line = {
              line: $(p).text(),
              starttime: parseInt($(p).attr('t')) / 1000
            }
            this.english.push(line)
          }
          console.log(this.english)
        }
      )
  }
}
</script>
