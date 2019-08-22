<template>
  <div class="web-images">
    <div class="image-wall" :key="webImagesKey" v-cloak v-if="images && images.length > 0">
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
          :src="`${Config.imageProxy}?${image.img}`"
        />
      </a>
    </div>
    <div class="mt-2">
      Image search by
      <a :href="`https://image.so.com/i?q=${text}&src=srp`">
        <img src="img/logo-360-image-search.png" alt="360 Image Search" class="ml-2" />
      </a>
    </div>
  </div>
</template>

<script>
import WordPhotos from '@/lib/word-photos'
import Config from '@/lib/config'
import Vue from 'vue'
import $ from 'jquery'

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
        $('meta[property=og\\:image]').attr(
          'content',
          `${Config.imageProxy}?${this.images[0].img}`
        )
        this.webImagesKey++
        this.imgKey++
      })
    })
  },
  data() {
    return {
      webImagesKey: 0,
      Config,
      images: []
    }
  }
}
</script>

<style lang="scss">
.image-wall {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.image-wall-image-wrapper {
  height: 10rem;
  width: calc(50% - 1rem);
  max-width: 10rem;
  flex: 1 0 auto;
  display: block;
  margin: 0 0.5rem 0.5rem 0;
}

.image-wall-image {
  object-fit: cover;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>