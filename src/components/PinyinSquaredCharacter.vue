<template>
  <div class="block">
    <div class="pinyin"></div>
    <div class="character">
      <simple-svg
        :filepath="`/img/pinyin-squared/${block.initial}.svg`"
        class="initial"
      />
      <simple-svg
        :filepath="`/img/pinyin-squared/${block.final}.svg`"
        class="final"
      />
      <simple-svg
        :filepath="`/img/pinyin-squared/tone-${block.tone}.svg`"
        fill="#28a745"
        class="tone"
      />
    </div>
  </div>
</template>

<script>
import PinyinSquared from '@/lib/pinyin-squared'

export default {
  props: {
    pinyin: {
      default: undefined
    }
  },
  data() {
    return {
      block: undefined
    }
  },
  mounted() {
    this.block = PinyinSquared.separateInitialFromFinal(this.pinyin)
  },
  methods: {}
}
</script>

<style></style>
