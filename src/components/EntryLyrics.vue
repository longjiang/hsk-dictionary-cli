<template>
  <div>
    <!-- ANCHOR img/anchors/lyrics-bar.png -->
    <div
      class="container-fluid song-lyrics-bar"
      :data-bg-hsk="entry.book"
      v-cloak
      v-if="lrcs && lrcs.length > 0"
    >
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <strong>“{{ entry.simplified }}” IN SONG LYRICS</strong>
          </div>
        </div>
      </div>
    </div>

    <div
      class="container-flud lyrics-bar"
      v-cloak
      v-if="lrcs && lrcs.length > 0"
    >
      <div class="songs">
        <div class="row song" v-for="(lrc, lrcIndex) in lrcs.slice(0, limit)">
          <div class="container">
            <div class="row">
              <div class="col-md-6 text-center lyrics-wrapper sm-mb2">
                <PinyinButton class="mb-3" />
                <div
                  class="lyrics collapsed"
                  :id="'lyrics-' + entry.id + '-' + lrcIndex"
                  data-collapse-target
                >
                  <div
                    class="lyrics-title"
                    v-html="lrc.artist + '《' + lrc.title + '》'"
                  ></div>
                  <hr />
                  <div
                    class="lyrics-line"
                    v-for="(line, lineIndex) in lrc.content"
                    v-if="!LRC.rejectLine(line.line)"
                    v-bind:class="{
                      matched: lrc.matchedLines.includes(lineIndex),
                      'matched-context': LRC.inContext(lineIndex, 2, lrc)
                    }"
                    v-on:click="seekYouTube(lrc, line.starttime)"
                    v-html="
                      Helper.highlight(line.line, entry.simplified, entry.book)
                    "
                  ></div>
                </div>
                <ShowMoreButton :data-bg-hsk="entry.book" class="mt-4" />
              </div>
              <div class="col-md-6 text-center">
                <div
                  class="youtube-versions"
                  :id="`${_uid}-lrc-${lrcIndex}-youtube`"
                >
                  <div class="youtube" v-for="youtube in lrc.youtube">
                    <div
                      v-bind:style="{
                        backgroundImage:
                          'url(' +
                          '//img.youtube.com/vi/' +
                          youtube +
                          '/hqdefault.jpg' +
                          ')'
                      }"
                      class="youtube-screen"
                      v-on:click="
                        loadYouTubeiFrame(
                          youtube,
                          lrc.content[lrc.matchedLines[0]].starttime,
                          `${_uid}-lrc-${lrcIndex}-youtube-${youtube}`,
                          lrc
                        )
                      "
                    >
                      <div
                        :id="`${_uid}-lrc-${lrcIndex}-youtube-${youtube}`"
                      ></div>
                    </div>
                  </div>
                  <div class="mt-4">
                    Showing {{ lrc.currentYoutubeIndex }} of
                    {{ lrc.youtube.length }} videos of this song.
                    <button
                      v-on:click="cycleYouTube(lrc, lrcIndex)"
                      class="youtube-version-button btn-small"
                    >
                      Show Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- .lyrics-bar -->
  </div>
</template>

<script>
import $ from 'jquery'
import LRC from '@/lib/lrc'
import Helper from '@/lib/helper'

export default {
  props: {
    entry: {
      type: Object
    },
    limit: {
      default: 10
    }
  },
  data() {
    return {
      Helper,
      LRC,
      lrcs: [] // matched song lyrics, pulled from another server
    }
  },
  methods: {
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

    loadYouTubeiFrame(youtube, starttime, elementId, lrc) {
      var player
      // $('.youtube iframe').remove();
      this.removeYouTubeAPIVars()
      window.onYouTubePlayerAPIReady = function() {
        // eslint-disable-next-line no-undef
        player = new YT.Player(elementId, {
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
                lrc.timer.setCurrentTime(lrc, player.getCurrentTime())
                lrc.timer.play()
              }
              if (playerStatus == 2) {
                // Playing, update time
                lrc.timer.setCurrentTime(lrc, player.getCurrentTime())
                lrc.timer.pauase()
              }
            }
          }
        })
        lrc.youtubePlayer = player
      }
      $.getScript('//www.youtube.com/iframe_api')
    },

    seekYouTube(lrc, starttime) {
      var player = lrc.youtubePlayer
      player.seekTo(starttime)
    },

    cycleYouTube(lrc, index) {
      var $versions = $('#lrc-' + index + '-youtube')
      $versions.find('.youtube:first-child').appendTo($versions)
      lrc.currentYoutubeIndex += 1
      if (lrc.currentYoutubeIndex > lrc.youtube.length) {
        lrc.currentYoutubeIndex = lrc.currentYoutubeIndex - lrc.youtube.length
      }
      var $youtube = $versions.find('.youtube:first-child .youtube-screen')
      $youtube.click() // Load the iframe
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
    LRC.getLrcs(this.entry.simplified, lrcs => {
      for (let lrc of lrcs) {
        lrc.matchedLines = []
        for (let [index, line] of lrc.content.entries()) {
          if (line.line.includes(this.entry.simplified)) {
            lrc.matchedLines.push(index)
          }
        }
        lrc.currentYoutubeIndex = 1 // "Showing 1 of 23 videos..."
      }
      this.lrcs = lrcs
        .sort(function(a, b) {
          return (
            Object.keys(b.matchedLines).length -
            Object.keys(a.matchedLines).length
          )
        })
        .filter(lrc => lrc.youtube && lrc.youtube.length > 0)
    })
    $('.youtube iframe').remove() // Show new videos;
  }
}
</script>
