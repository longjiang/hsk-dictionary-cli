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
        <div
          class="row song"
          v-for="(lrc, lrcIndex) in lrcs"
          v-if="lrc.youtube && lrc.youtube.length > 0"
        >
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
                    v-on:click="YouTube.seekYouTube(lrc, line.starttime)"
                    v-html="
                      Helper.highlight(line.line, entry.simplified, entry.book)
                    "
                  ></div>
                </div>
                <ShowMoreButton />
              </div>
              <div class="col-md-6 text-center">
                <div
                  class="youtube-versions"
                  :id="'lrc-' + lrcIndex + '-youtube'"
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
                        YouTube.loadYouTubeiFrame(
                          youtube,
                          lrc.content[lrc.matchedLines[0]].starttime,
                          'lrc-' + lrcIndex + '-youtube-' + youtube,
                          lrc
                        )
                      "
                    >
                      <div
                        :id="'lrc-' + lrcIndex + '-youtube-' + youtube"
                      ></div>
                    </div>
                  </div>
                  <div class="mt-4">
                    Showing {{ lrc.currentYoutubeIndex }} of
                    {{ lrc.youtube.length }} videos of this song.
                    <button
                      v-on:click="YouTube.cycleYouTube(lrc, lrcIndex)"
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
import YouTube from '@/lib/youtube'

export default {
  props: ['entry'],
  data() {
    return {
      Helper,
      LRC,
      YouTube,
      lrcs: [] // matched song lyrics, pulled from another server
    }
  },
  mounted() {
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
      this.lrcs = lrcs.sort(function(a, b) {
        return (
          Object.keys(b.matchedLines).length -
          Object.keys(a.matchedLines).length
        )
      })
    })
    $('.youtube iframe').remove() // Show new videos;
  }
}
</script>
