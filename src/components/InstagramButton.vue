<template>
  <div class="instagram-btn-wrapper focus-exclude">
    <button
      class="instagram-btn"
      v-on:click="instagram"
      title="Make an instagram poster"
    >
      <img src="img/instagram.svg" alt="Instagram" /> Instagram Poster
    </button>
    <div :class="{ hidden: !show, 'mt-4': true }">
      <Instagram  v-if="!dataURL" :entry="entry" />
      <Loader v-if="!dataURL" sticky="true" class="mt-3"
        >Generating download link...</Loader
      >
      <img
        :src="dataURL"
        class="instagram-generated-image"
        :alt="
          `Instagram poster for ${entry.simplified} (${entry.traditional}, ${
            entry.pinyin
          })`
        "
      />
      <a
        v-if="dataURL"
        :href="`${dataURL}`"
        :download="`ig-${filename}.png`"
        class="mt-3 btn btn-danger"
        ><i class="glyphicon glyphicon-cloud-download"></i> Download Image</a
      >
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import html2canvas from 'html2canvas'
import Loader from '@/components/Loader'
import Instagram from '@/components/Instagram'

export default {
  props: ['entry'],
  components: {
    Instagram,
    Loader
  },
  data() {
    return {
      dataURL: undefined,
      filename: undefined,
      show: false
    }
  },
  mounted() {
    if (this.entry.hsk !== 'outside') {
      this.filename = `${this.entry.hskId}-${this.entry.simplified}`
    } else {
      this.filename = `${this.entry.identifier}`
    }
  },
  methods: {
    instagram() {
      this.show = !this.show
      if (this.show) {
        this.dataURL = ''
        setTimeout(() => {
          this.render()
        })
      }
    },
    render() {
      let $content = $('.instagram-content-wrapper') // In <Instagram/>
      html2canvas($content[0], {
        useCORS: true,
        allowTaint: false
      }).then(canvas => {
        this.dataURL = canvas.toDataURL()
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

#instagram-canvas .canvas-image {
  box-shadow: 5px 5px 10px #00000040;
  width: 100% !important;
  height: 100% !important;
}

.instagram-btn:hover {
  opacity: 0.7;
}

#instagram-canvas {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.instagram-generated-image {
  width: 100%;
  max-width: 720px;
  display: block;
  box-shadow: 5px 5px 20px rgba(0,0,0,0.2);
}
</style>
