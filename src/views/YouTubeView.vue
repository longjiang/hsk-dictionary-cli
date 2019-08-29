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
          <div class="sticky" :key="'youtube-' + args">
            <YouTubeVideo ref="youtube" :youtube="args" />
          </div>
        </div>
        <div class="col-sm-6" :key="'transcript-' + args">
          <div v-if="loading">
            Loading ...
          </div>
          <SyncedTranscript
            ref="transcript"
            :onSeek="seekYouTube"
            :lines="this.chinese"
            :parallellines="this.english"
            v-else-if="!loading && hasSubtitles"
          />
          <div v-else-if="!loading && !hasSubtitles">
            No subtitles were found. 
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
    }
  },
  data() {
    return {
      chinese: [],
      english: [],
      hasSubtitles: false,
      loading: true,
    }
  },
  methods: {
    seekYouTube(starttime) {
      this.$refs.youtube.seek(starttime)
    },
    async getTranscript() {
      this.chinese = [];
      this.english = [];
      for (let i = 0; i < LANGUAGE_OPTIONS.length; i++) {
        await Helper.scrape(
          `https://www.youtube.com/api/timedtext?v=${this.args}&lang=${LANGUAGE_OPTIONS[i]}&fmt=srv3`,
          $html => {
            for (let p of $html.find('p')) {
              let line = {
                line: $(p).text(),
                starttime: parseInt($(p).attr('t')) / 1000
              }
              this.chinese.push(line);
            }
          }
        );
        await Helper.scrape(
          `https://www.youtube.com/api/timedtext?v=${this.args}&lang=${LANGUAGE_OPTIONS[i]}&fmt=srv3&tlang=en`,
          $html => {
            for (let p of $html.find('p')) {
              let line = {
                line: $(p).text(),
                starttime: parseInt($(p).attr('t')) / 1000
              }
              this.english.push(line);
            }
          }
        );

        if (this.english.length > 0 && this.english.length > 0) {
          this.hasSubtitles = true;
          break;
        }
      }
      this.loading = false;
    }
  },
  mounted() {
    this.getTranscript();
    setInterval(() => {
      this.$refs.transcript.currentTime = this.$refs.youtube ? this.$refs.youtube.currentTime() : 0
    }, 1000);
  }
}
</script>
