<template>
  <div class="youtube" :key="youtube">
    <div
      v-bind:style="{
        backgroundImage:
          'url(' + '//img.youtube.com/vi/' + youtube + '/hqdefault.jpg' + ')'
      }"
      class="youtube-screen"
      v-on:click="loadYouTubeiFrame(youtube, starttime, lrc)"
    >
      <div :id="youtubeIframeID"></div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'

export default {
  data() {
    return {
      youtubeIframeID: 'youtube-' + Helper.uniqueId(),
      time: this.starttime,
      player: undefined
    }
  },
  computed: {
    currentTime() {
      return this.player.getCurrentTime()
    }
  },
  props: {
    youtube: {
      type: String
    },
    lrc: {
      default: false
    },
    starttime: {
      default: 0
    }
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    window.onYouTubePlayerAPIReady = function() {
      // This needs to be in global scope as YouTube api will call it
      // This function is overwridden from the app.loadYouTubeiFrame() function
    }

    // eslint-disable-next-line no-unused-vars
    window.onPlayerReady = function(evt) {
      // Required by YouTube API
    }
  },
  methods: {
    loadYouTubeiFrame(youtube, starttime, lrc = false) {
      // $('.youtube iframe').remove();
      this.removeYouTubeAPIVars()
      window.onYouTubePlayerAPIReady = () => {
        // eslint-disable-next-line no-undef
        this.player = new YT.Player(this.youtubeIframeID, {
          height: '390',
          width: '640',
          videoId: youtube,
          playerVars: {
            start: parseInt(starttime),
            autoplay: 1,
            controls: 1,
            showinfo: 0,
            playsinline: 1,
            rel: 0
          }
        })
      }
      $.getScript('//www.youtube.com/iframe_api')
    },
    removeYouTubeAPIVars() {
      if (window['YT']) {
        let vars = [
          'YT',
          'YTConfig',
          'onYTReady',
          'yt',
          'ytDomDomGetNextId',
          'ytEventsEventsListeners',
          'ytEventsEventsCounter'
        ]
        vars.forEach(function(key) {
          window[key] = undefined
        })
      }
    },
    seek(starttime) {
      this.player.seekTo(starttime)
    },
  }
}
</script>

<style></style>
