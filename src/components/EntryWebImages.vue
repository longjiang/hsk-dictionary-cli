<template>
  <div
    class="image-wall"
    :key="webImagesKey"
    v-cloak
    v-if="images && images.length > 0"
  >
    <a
      v-for="(image, index) in images.slice(0, limit)"
      class="image-wall-image-wrapper"
      :href="image.link"
      target="_blank"
    >
      <img
        alt
        class="image-wall-image"
        v-bind:key="'image-' + index"
        :src="image.img"
      />
    </a>
  </div>
</template>

<script>
import WordPhotos from '@/lib/word-photos'
import Vue from 'vue'

export default {
  props: {
    text: {
      type: String
    },
    limit: {
      type: String,
      default: '20'
    },
    entry: {
      default: undefined
    }
  },
  mounted() {
    if (this.entry) {
      Vue.set(this.entry, 'images', this.images)
    }
    WordPhotos.getWebImages(this.text, images => {
      WordPhotos.testImages(images.slice(0, this.limit), image => {
        this.images.push(image)
        this.webImagesKey++
        this.imgKey++
      })
    })
  },
  data() {
    return {
      webImagesKey: 0,
      images: []
    }
  }
}
</script>
