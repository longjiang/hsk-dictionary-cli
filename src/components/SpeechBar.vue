<template>
  <div v-if="html">
    <div class="speech-bar mb-4">
      <button>
        <font-awesome-icon icon="play" @click="play()" />
      </button>
    </div>
    <Annotate
      tag="div"
      v-for="line of html
        .trim()
        .replace(/<(div|p|li|h1|h2|h3|h4|h5|h6)/g, '\n<$1')
        .split('\n')"
      v-if="line.trim().length > 0"
      :copy="true"
    >
      <div v-html="line.trim()" />
    </Annotate>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import $ from 'jquery'

export default {
  props: {
    html: {
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    play() {
      for(let annotate of this.$children) {
        console.log(annotate)
      }
    }
  }
}
</script>
