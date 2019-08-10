<template>
  <div class="instagram-btn-wrapper">
    <button
      class="instagram-btn"
      v-on:click="instagram"
      title="Make an instagram poster"
    >
      <img src="img/instagram.svg" alt="Instagram" />
    </button>
    <div id="instagram-canvas"></div>
    <div class="instagram-content-wrapper">
      <div class="instagram-content-aspect">
        <div class="instagram-content">
          <div class="instagram-border"></div>
          <img
            v-if="entry.images && entry.images.length > 0"
            :src="entry.images[0].img"
            class="instagram-image"
          />
          <img src="img/instagram-badge.png" class="instagram-badge" />
          <img src="img/logo-mark.png" class="instagram-logo" />
          <EntryHeader :entry="entry" />
          <div class="example-wrapper pt-4 pb-4">
            <div class="example-sentence mt-4">
              <!-- <p class="example-sentence-pinyin">{{ entry.examplePinyin }} <i class="speak glyphicon glyphicon-volume-up" v-bind:data-speak="entry.example"></i></p> -->

              <PinyinButton class="mb-3" />
              <p
                class="example-sentence-word"
                v-html="
                  Helper.highlight(entry.example, entry.simplified, entry.hsk)
                "
              ></p>
              <hr>
              <p class="example-sentence-english">
                {{ entry.exampleTranslation }}
              </p>
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

export default {
  props: ['entry'],
  components: {
    EntryHeader
  },
  data() {
    return {
      Helper
    }
  },
  computed: {
    images() {
      return this.entry.images
    }
  },
  methods: {
    instagram() {
      this.f()
    },
    f() {
      html2canvas(document.querySelector('#hsk-dictionary'), {
        allowTaint: true
      }).then(canvas => {
        $('#instagram-canvas').append(canvas)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.instagram-content-wrapper {
  width: 720px;
}

.instagram-content-aspect {
  width: 100%;
  padding-top: 100%;
  position: relative;
}

.instagram-content {
  height: 100%;
  width: 100%;
  background: black;
  position: absolute;
  top: 0;
  left: 0;
  color: white;
}

.instagram-content .focus-exclude {
  display: none;
}

.instagram-image {
  position: absolute;
  opacity: 0.4;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  top: 63%;
  text-align: center;
}

.instagram-content .example-sentence-word {
  font-size: 2em;
  font-weight: 200;
}

.instagram-content .example-sentence hr {
  border: 1px solid rgba(255,255,255,0.5);
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
