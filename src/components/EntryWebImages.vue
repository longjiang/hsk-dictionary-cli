<template>
  <div class="container" :key="webImagesKey" v-cloak>
    <div class="row" v-if="entry.images && entry.images.length > 0">
      <div class="col-sm-12">
        <div class="image-wall">
          <img
            :src="image.img"
            @click="imageClick(image.img)"
            alt
            class="image-wall-image"
            v-bind:key="'image-' + index"
            v-for="(image, index) in entry.images.slice(0, limit)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WordPhotos from '@/lib/word-photos'
export default {
  props: {
    entry: {
      type: Object
    },
    limit: {
      type: String,
      default: '20'
    }
  },
  mounted() {
    WordPhotos.getWebImages(this.entry.simplified, srcs => {
      this.entry.images = srcs
      this.webImagesKey += 1
    })
  },
  data() {
    return {
      webImagesKey: 0
    }
  },
  methods: {
    imageClick(src) {
      window.open(src)
    }
  }
}
</script>
