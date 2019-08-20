<template>
  <div class="row song">
    <div class="container">
      <div class="row">
        <div class="col-md-6 text-center lyrics-wrapper sm-mb2">
          <PinyinButton class="mb-3" />
          <div
            class="lyrics collapsed"
            :id="'lyrics-' + lrcIndex"
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
                matched: lrc.matchedLines && lrc.matchedLines.includes(lineIndex),
                'matched-context': LRC.inContext(lineIndex, 2, lrc)
              }"
              v-on:click="seekYouTube(lrc, line.starttime)"
              v-html="
                entry
                  ? Helper.highlight(line.line, entry.simplified, entry.hsk)
                  : line.line
              "
            ></div>
          </div>
          <ShowMoreButton :data-bg-hsk="entry ? entry.hsk : 'outside'" class="mt-4" />
        </div>
        <div class="col-md-6 text-center">
          <div class="youtube-versions" :id="`${_uid}-lrc-${lrcIndex}-youtube`">
            <YouTubeVideo
              v-for="youtube in lrc.youtube"
              :youtube="youtube"
              :startTime="lrc.matchedLines ? lrc.content[lrc.matchedLines[0]].starttime : 0"
              :lrc="lrc"
            />
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
</template>

<script>
import LRC from '@/lib/lrc'
import Helper from '@/lib/helper'
import YouTubeVideo from '@/components/YouTubeVideo'

export default {
  components: {
    YouTubeVideo
  },
  data() {
    return {
      LRC,
      Helper
    }
  },
  props: {
    entry: {
      type: Object
    },
    lrc: {
      type: Object
    },
    lrcIndex: {
      type: Number
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
  }
}
</script>

<style></style>
