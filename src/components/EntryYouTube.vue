<template>
  <div class="entry-youtube">
    <div class="widget-title">“{{ text }}” videos on YouTube</div>
    <div class="jumbotron-fluid bg-light p-4">
      <YouTubeVideoList :videos="videos" />
    </div>
  </div>
</template>

<script>
import YouTube from '@/lib/youtube'
import YouTubeVideoList from '@/components/YouTubeVideoList'

export default {
  components: {
    YouTubeVideoList
  },
  props: {
    text: {
      type: String
    }
  },
  data() {
    return {
      videos: []
    }
  },
  mounted() {
    YouTube.search(
      this.text,
      videos => {
        this.videos = videos.filter(video => video.cc)
      },
      true
    )
  }
}
</script>

<style></style>
