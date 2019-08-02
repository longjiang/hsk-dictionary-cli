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
      this.entry.images = srcs.filter(src => {
        let keep = true
        for (let keyword of this.reject) {
          if (src.img && src.img.includes(keyword)) keep = false
        }
        return keep
      })
      this.webImagesKey += 1
    })
  },
  data() {
    return {
      webImagesKey: 0,
      reject: [
        'nipic',
        'pconline',
        'zol.com',
        'youth.cn',
        '58pic.com',
        'sanwen.net',
        'winxuancdn.com',
        'gtimg.com',
        'pic.ibaotu.com',
        'sc.jb51.net',
        'so.qhmsg.com',
        'soso.com',
        'comicyu.com',
        'duitang.com',
        'chachaba.com',
        'qzone.cc',
        'tianjimedia.com',
        'bitauto.com',
        'dzwww.com',
        'pstatp.com'
      ]
    }
  },
  methods: {
    imageClick(src) {
      window.open(src)
    }
  }
}
</script>
