<template>
  <div class="youtube-view main">
    <div class="container mt-5 mb-5">
      <div class="row">
        <div class="col-sm-4">
          <YouTubeVideo :youtube="args" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YouTubeVideo from '@/components/YouTubeVideo'
export default {
  components: {
    YouTubeVideo
  },
  props: {
    method: {
      type: String
    },
    args: {
      type: String
    }
  }
}
</script>

