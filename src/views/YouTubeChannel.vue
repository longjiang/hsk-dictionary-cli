<template>
  <div class="youtube-browse container mt-5 mb-5 main">
    <div class="row">
      <div class="col-sm-12">
        <h1 v-if="title" class="mb-5 text-center">{{ title }}</h1>
        <YouTubeVideoList :videos="videos" />
      </div>
    </div>
  </div>
</template>

<script>
import YouTubeNav from '@/components/YouTubeNav'
import YouTubeVideoList from '@/components/YouTubeVideoList'
import YouTube from '@/lib/youtube'
export default {
  components: {
    YouTubeNav,
    YouTubeVideoList
  },
  props: {
    args: {
      type: String
    }
  },
  data() {
    return {
      title: undefined,
      videos: []
    }
  },
  mounted() {
    this.update()
  },
  methods: {
    update() {
      $('#chinesezerotohero')[0].scrollIntoView()
      this.title = undefined
      this.videos = []
      YouTube.channelVideosByProxy(this.args, channel => {
        console.log(channel)
        this.title = channel.title
        this.videos = channel.videos
      })
    }
  },
  watch: {
    args() {
      if (this.$route.name === 'youtube-channel') {
        this.update()
      }
    }
  }
}
</script>

<style>
</style>
