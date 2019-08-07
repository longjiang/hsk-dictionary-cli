<template>
  <div class="container" :key="webImagesKey" v-cloak>
    <div class="row" v-if="entry.srcs && entry.srcs.length > 0">
      <div class="col-sm-12">
        <div class="image-wall">
          <img
            @click="imageClick(image.img)"
            alt
            class="image-wall-image"
            v-bind:key="'image-' + index"
            v-for="(src, index) in entry.srcs.slice(0, limit)"
            :src="src"
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
    this.entry.srcs = []
    WordPhotos.getWebImages(this.entry.simplified, images => {
      WordPhotos.testImages(
        images
          .map(image => image.img)
          .concat([
            `https://source.unsplash.com/featured/?${this.entry.simplified}`
          ]),
        src => {
          this.entry.srcs.push(src)
          this.webImagesKey++
          console.log(this.entry.simplified, 'pushing', src)
          this.imgKey++
        }
      )
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
