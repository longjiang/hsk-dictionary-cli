<template>
  <div class="block">
    <div class="pinyin">{{ pinyinParsed }}</div>
    <div class="character" v-if="block">
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
  computed: {
    pinyinParsed() {
      return pinyinify(this.pinyin)
    }
  },
  mounted() {
    this.block = PinyinSquared.separateInitialFromFinal(this.pinyin)
  },
  methods: {}
}
</script>

<style></style>
