<template>
  <div class="animated-svg-wrapper">
    <img :src="animatedSVG()" class="animated-svg" />
    <button class="replay-btn show-more mt-2" @click="playSVG">
      <i class="glyphicon glyphicon-play"></i> Play Again
    </button>
  </div>
</template>

<script>
import Hanzi from '@/lib/hanzi'

export default {
  props: ['char'],
  methods: {
    animatedSVG() {
      return Hanzi.animatedSvgUrl(this.char)
    },
    playSVG(e) {
      let $svg = $(e.target).siblings('.animated-svg')
      let $svgClone = $svg.clone()
      $svg.after($svgClone).remove()
    }
  }
}
</script>
