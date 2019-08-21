<template>
  <div class="row song" :data-lrc-id="lrc.id">
    <div class="container">
      <div class="row">
        <div class="col-md-6 text-center lyrics-wrapper sm-mb2">
          <PinyinButton class="mb-3" />
          <div
            :class="{
              lyrics: true,
              'mb-4': true,
              collapsed: collapse,
              matched: lrc.matchedLines && lrc.matchedLines.length > 0
            }"
            :id="'lyrics-' + lrcIndex"
            data-collapse-target
          >
            <div
              class="lyrics-title"
              v-html="lrc.artist + '《' + lrc.title + '》'"
            ></div>
            <hr />
            <div
              v-for="(line, lineIndex) in lrc.content"
              v-if="!LRC.rejectLine(line.line)"
              :class="{
                'lyrics-line': true,
                matched:
                  lrc.matchedLines && lrc.matchedLines.includes(lineIndex),
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
          <ShowMoreButton
            v-if="collapse"
            :data-bg-hsk="entry ? entry.hsk : 'outside'"
          />
          <button
            v-if="!removed"
            class="ml-2 btn-medium btn-danger"
            @click="remove"
          >
            <font-awesome-icon icon="trash" /> Delete
          </button>
          <span v-if="removed">
            <font-awesome-icon icon="check" class="ml-2 text-success" /> Removed
          </span>
        </div>
        <div class="col-md-6 text-center">
          <div class="youtube-versions" :id="`${_uid}-lrc-${lrcIndex}-youtube`">
            <YouTubeVideo
              v-for="youtube in lrc.youtube"
              :youtube="lrc.youtube[currentYoutubeIndex]"
              :startTime="
                lrc.matchedLines
                  ? lrc.content[lrc.matchedLines[0]].starttime
                  : 0
              "
              :lrc="lrc"
            />
            <div class="mt-4" v-if="lrc.youtube.length > 0">
              <button class="btn-small" @click="youtubePrev">
                <font-awesome-icon icon="chevron-left" />
              </button>
              <b> {{ currentYoutubeIndex + 1 }}</b> of
              {{ lrc.youtube.length }}
              <button class="btn-small" @click="youtubeNext">
                <font-awesome-icon icon="chevron-right" />
              </button>
            </div>
          </div>
          <div v-if="lrc.youtube.length === 0" class="bg-light p-4 text-center">
            <div>
              <button
                class="btn btn-danger"
                @click="addYouTube"
                v-if="!gettingYouTube"
              >
                Get YouTube Videos
              </button>
              <Loader v-if="gettingYouTube" />
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
import YouTube from '@/lib/youtube'
import Config from '@/lib/config'
import Loader from '@/components/Loader'

export default {
  components: {
    YouTubeVideo
  },
  data() {
    return {
      LRC,
      Helper,
      removed: false,
      currentYoutubeIndex: 0,
      gettingYouTube: false
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
    },
    collapse: {
      default: true
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
    remove() {
      let c = confirm('Delete this song for everyone?')
      if (c) {
        LRC.delete(this.lrc.id).then(() => {
          this.removed = true
        })
      }
    },
    seekYouTube(lrc, starttime) {
      var player = lrc.youtubePlayer
      player.seekTo(starttime)
    },
    youtubePrev() {
      this.currentYoutubeIndex = Math.max(this.currentYoutubeIndex - 1, 0)
    },
    youtubeNext() {
      this.currentYoutubeIndex = Math.min(
        this.currentYoutubeIndex + 1,
        this.lrc.youtube.length - 1
      )
    },

    addYouTube(e) {
      var lrc = this.lrc
      this.gettingYouTube = true
      YouTube.searchYouTubeByProxy(
        lrc.artist + ' ' + lrc.title + '',
        videoIds => {
          $.post(
            Config.lrcServer + 'lrc/createlrcyoutube',
            {
              lrc_id: lrc.id,
              youtube_ids: videoIds
            },
            result => {
              this.gettingYouTube = false
              if (result.status === 'success') {
                this.lrc.youtube = result.youtube.map(
                  youtube => youtube.youtube_id
                )
              }
            }
          )
        }
      )
    },
    deleteClick: function(e) {
      var lrc = this.lrc
      $.getJSON(Config.lrcServer + 'lrc/delete/' + lrc.id, function(result) {
        if (result.status === 'success') {
          // lrc.deleted = true; // Too slow to render in long lists!
          $(e.target).after('Success')
          $(e.target).remove()
        }
      })
    }
  }
}
</script>

<style></style>
