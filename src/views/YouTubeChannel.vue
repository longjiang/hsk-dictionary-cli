<template>
  <div class="youtube-browse container mt-5 mb-5 main">
    <div class="row">
      <div class="col-sm-12">
        <h1 v-if="title" class="mb-5 text-center">{{ title }}</h1>
        <h4 class="text-center mt-5 mb-5">Playlists</h4>
        <YouTubePlaylists :playlists="playlists" />
        <h4 class="text-center mt-5 mb-5">Videos</h4>
        <YouTubeVideoList :videos="videos" />
      </div>
    </div>
  </div>
</template>

<script>
import YouTubeNav from '@/components/YouTubeNav'
import YouTubeVideoList from '@/components/YouTubeVideoList'
import YouTubePlaylists from '@/components/YouTubePlaylists'
import YouTube from '@/lib/youtube'
export default {
  components: {
    YouTubeNav,
    YouTubeVideoList,
    YouTubePlaylists
  },
  props: {
    args: {
      type: String
    }
  },
  data() {
    return {
      title: undefined,
      playlists: [],
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
      YouTube.channel(this.args, channel => {
        this.title = channel.title
        this.videos = channel.videos
      })
      YouTube.channelPlaylists(this.args, playlists => {
        this.playlists = playlists
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
