<template>
  <div class="youtube-browse container mt-5 mb-5 main">
    <div class="row">
      <div class="col-sm-12">
        <h1 v-if="title" class="mb-5 text-center">{{ title }}</h1>
        <div class="youtube-videos">
          <div
            v-for="video of videos"
            class="youtube-video media rounded shadow"
          >
            <a :href="`#/youtube/view/${video.id}`">
              <div class="youtube-thumbnail-wrapper aspect-wrapper">
                <img :src="video.thumbnail" class="youtube-thumbnail aspect" />
              </div>
              <div class="youtube-title media-body">{{ video.title }}</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YouTubeNav from '@/components/YouTubeNav'
import YouTube from '@/lib/youtube'
export default {
  components: {
    YouTubeNav
  },
  props: {
    args: {
      type: String
    }
  },
  data() {
    return {
      title: undefined,
      videos: undefined
    }
  },
  mounted() {
    this.update()
  },
  methods: {
    update() {
      $('#chinesezerotohero')[0].scrollIntoView()
      this.title = undefined
      this.videos = undefined
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
.youtube-videos {
  display: flex;
  flex-wrap: wrap;
}
.youtube-video {
  min-width: 15rem;
  flex: 1;
  margin: 1rem;
}
</style>
