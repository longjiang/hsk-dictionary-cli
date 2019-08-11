<template>
  <div class="instagram-btn-wrapper focus-exclude">
    <button class="instagram-btn" v-on:click="instagram" title="Make an instagram poster">
      <img src="img/instagram.svg" alt="Instagram" /> Instagram Poster
    </button>
    <div class="instagram-canvas-wrapper hidden mt-4">
      <div class="instagram-canvas-aspect">
        <div id="instagram-canvas"></div>
      </div>
      <div class="mt-1">
        The instagram image is a
        <code>&lt;canvas&gt;</code> element. To use it, right click and choose copy or save. On the phone, long press and choose Save to camerall roll.
      </div>
    </div>
    <div id="instagram-content-slot" class="hidden">
      <div class="instagram-content-wrapper">
        <div class="instagram-content-aspect">
          <div class="instagram-content">
            <div class="instagram-border"></div>
            <div
              v-if="entry.hsk !== 'outside'"
              :style="`background-image: url(${Config.imageUrl}${entry.hskId}-${entry.simplified}.jpg)`"
              class="instagram-image"
            />
            <div
              v-if="entry.hsk === 'outside' && entry.images && entry.images.length > 0"
              :style="`background-image: url(${entry.images[0].img})`"
              class="instagram-image"
            />
            <img src="img/instagram-badge.png" class="instagram-badge" />
            <img src="img/logo-mark.png" class="instagram-logo" />
            <EntryHeader :entry="entry" />
            <div class="example-wrapper pt-4 pb-4" v-if="entry.example && entry.example.length > 0">
              <div class="example-sentence mt-4">
                <!-- <p class="example-sentence-pinyin">{{ entry.examplePinyin }} <i class="speak glyphicon glyphicon-volume-up" v-bind:data-speak="entry.example"></i></p> -->

                <PinyinButton class="mb-3" />
                <p
                  class="example-sentence-word"
                  v-html="
                    Helper.highlight(entry.example, entry.simplified, entry.hsk)
                  "
                ></p>
                <hr />
                <p class="example-sentence-english">{{ entry.exampleTranslation }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Helper from '@/lib/helper'
import EntryHeader from '@/components/EntryHeader'
import html2canvas from 'html2canvas'
import Config from '@/lib/config'

export default {
  props: ['entry'],
  components: {
    EntryHeader
  },
  data() {
    return {
      Helper,
      Config,
      rendered: false
    }
  },
  methods: {
    instagram() {
      if ($('.instagram-canvas-wrapper').hasClass('hidden')) {
        $('.instagram-canvas-wrapper').removeClass('hidden')
        this.render()
      } else {
        $('.instagram-canvas-wrapper').addClass('hidden')
      }
    },
    render() {
      let $content = $('.instagram-content-wrapper')
      $content.appendTo('#hsk-dictionary')
      html2canvas($content[0], {
        allowTaint: true
      }).then(canvas => {
        $('#instagram-canvas').html(canvas)
        $content.appendTo('#instagram-content-slot')
        this.rendered = true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.instagram-btn {
  background: none;
  border: none;
  opacity: 0.5;
  padding: 0;
}

#instagram-canvas canvas {
  box-shadow: 5px 5px 10px #00000040;
  width: 100% !important;
  height: 100% !important;
}

.instagram-btn:hover {
  opacity: 0.7;
}

.instagram-content-wrapper {
  width: 720px;
}

.instagram-content-aspect,
.instagram-canvas-aspect {
  width: 100%;
  padding-top: 100%;
  position: relative;
}

.instagram-content .label {
  font-size: 1.5em;
}

.instagram-content,
#instagram-canvas {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;

}

.instagram-content {
  background: black;
  color: white;
}

.instagram-content .paginate-button {
  display: none;
}

.instagram-content .focus-exclude {
  display: none;
}

.instagram-image {
  position: absolute;
  opacity: 0.4;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.instagram-badge {
  position: absolute;
  width: 50%;
  left: 25%;
}

.instagram-logo {
  position: absolute;
  width: 40%;
  left: calc((100% - 40%) / 2);
  top: 5%;
}

.instagram-content .word [data-hsk] {
  color: white !important;
  font-size: 2em;
}

.instagram-content .pinyin {
  font-size: 2em;
}

.instagram-content .definitions {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.instagram-content .definitions li {
  display: inline;
}

.instagram-content .definitions li:not(:last-child)::after {
  content: ', ';
}

.instagram-content .definitions .english {
  font-size: 2em;
  font-weight: 200;
}

.instagram-content .entry-head-wrapper {
  position: absolute;
  width: 90%;
  top: 20%;
  left: 5%;
}

.instagram-border {
  position: absolute;
  border: 2px solid white;
  width: 96%;
  height: 96%;
  left: 2%;
  top: 2%;
}

.instagram-content .example-wrapper {
  position: absolute;
  width: 90%;
  left: 5%;
  top: 65%;
  text-align: center;
}

.instagram-content .example-sentence-word {
  font-size: 2em;
  font-weight: 200;
}

.instagram-content .example-sentence hr {
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 40%;
}

.example-sentence-english {
  font-size: 1.5em;
  font-weight: 200;
}

.instagram-content .example-sentence-word span[data-hsk] {
  font-weight: bold;
  color: white !important;
}
</style>
