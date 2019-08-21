<template>
  <div class="block">
    <div class="pinyin" v-if="pinyinParsed">{{ pinyinParsed }}</div>
    <div class="character" v-if="initial">
      <simple-svg
        v-if="initial"
        :filepath="`/img/pinyin-squared/${initial}.svg`"
        fill="#717171"
        class="initial"
      />
      <simple-svg
        v-if="final"
        :filepath="`/img/pinyin-squared/${final}.svg`"
        fill="#717171"
        class="final"
      />
      <simple-svg
        v-if="tone"
        :filepath="`/img/pinyin-squared/tone-${tone}.svg`"
        fill="#28a745"
        class="tone"
      />
    </div>
    <div class="string" v-if="string">{{ string }}</div>
  </div>
</template>

<script>
import PinyinSquared from '@/lib/pinyin-squared'

export default {
  props: {
    blockOrString: {
      default: undefined
    }
  },
  data() {
    return {

    }
  },
  computed: {
    pinyinParsed() {
      return this.block ? pinyinify(this.block.pinyin) : false
    },
    initial() {
      if (typeof this.blockOrString === 'object') {
        return this.blockOrString.initial
      } else {
        return undefined
      }
    },
    final() {
      if (typeof this.blockOrString === 'object') {
        return this.blockOrString.final
      } else {
        return undefined
      }
    },
    tone() {
      if (typeof this.blockOrString === 'object') {
        return this.blockOrString.tone
      } else {
        return undefined
      }
    },
    string() {
      if (typeof this.blockOrString === 'string') {
        return this.blockOrString
      } else {
        return undefined
      }
    }
  },
  methods: {
    construct() {
      if (typeof this.blockOrString === 'string') {
        this.string = this.blockOrString
      } else if (typeof this.blockOrString === 'object') {
        this.block = this.blockOrString
      }
    }
  }
}
</script>

<style></style>
