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
      youtubeIframeID: 'youtube-' + Helper.uniqueId()
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
  methods: {
    loadYouTubeiFrame(youtube, starttime, lrc = false) {
      var player
      // $('.youtube iframe').remove();
      this.removeYouTubeAPIVars()
      window.onYouTubePlayerAPIReady = () => {
        // eslint-disable-next-line no-undef
        player = new YT.Player(this.youtubeIframeID, {
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
          },
          events: {
            onReady: window.onPlayerReady,
            onStateChange: function(playerStatus) {
              if (playerStatus == 1) {
                // Playing, update time
                // console.log(player.getCurrentTime())
              }
              if (playerStatus == 2) {
                // Playing, update time
                // console.log(player.getCurrentTime())
              }
            }
          }
        })
        if (lrc) {
          lrc.youtubePlayer = player
        }
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
    }
  }
}
</script>

<style></style>
