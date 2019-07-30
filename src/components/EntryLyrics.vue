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
                <button
                  class="show-more mb-3"
                  v-on:click="Helper.showPinyinClick"
                  :data-target-selector="'#lyrics-' + entry.id + '-' + lrcIndex"
                >
                  Show Pinyin
                </button>
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
                    v-html="highlight(line.line)"
                  ></div>
                </div>
                <button
                  class="show-more collapsed mt1"
                  v-on:click="Helper.showMoreClick"
                  :data-bg-hsk="entry.book"
                >
                  <span class="label-expand">Show Entire Song</span>
                  <span class="label-collapse">Collapse</span>
                </button>
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

export default {
  props: ['entry'],
  data() {
    return {
      lrcs: [] // matched song lyrics, pulled from another server
    }
  },
  mounted() {
    $('.youtube iframe').remove() // Show new videos;
  }
}
</script>
