<template>
  <div>
    <div class="jumbotron bg-white mb-0" style="overflow: hidden; position: relative">
      <div class="container">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-sm-12 col-md-6">
            <YouTubeVideo youtube="5tCCX95G2vg" class="shadow" style="z-index: 2" />
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>
      <img src="img/ken-standing.png" alt="Ken" class="photo-ken d-none d-md-block">
      <img src="img/jon-sitting.png" alt="Jon" class="photo-jon d-none d-md-block">
    </div>
    <div class="jumbotron bg-light mb-0">
      <div class="container">

      </div>
    </div>
  </div>
</template>

<script>
import YouTubeVideo from '@/components/YouTubeVideo'
export default {
  components: {
    YouTubeVideo
  }
}
</script>

<style>
.photo-jon,
.photo-ken {
  position: absolute;
  bottom: 0;
}
.photo-jon {
  height: 70%;
  right: 0;
}
.photo-ken {
  height: 90%;
  left: 0;
}
</style>
