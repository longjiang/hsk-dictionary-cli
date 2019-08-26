<template>
  <div class="entry-difficulty">
    <div class="widget-title">Difficulty</div>
    <div class="jumbotron-fluid bg-light p-4">
      <div class="frequency-level text-center" v-bind:data-bg-hsk="entry.hsk">
        {{ entry.hsk === 'outside' ? 'Non-HSK' : 'HSK ' + entry.hsk }}
      </div>
      <div class="frequency mt-1">
        <div
          class="frequency-fill"
          :data-bg-hsk="entry.hsk"
          :style="`width: ${(Math.log10(1 + entry.rank * 10000) * 100) / 4}%`"
        ></div>
      </div>
      <div v-if="showText" class="text-center mt-1 frequency-text">
        <b>{{ Math.round((Math.log10(1 + entry.rank * 10000) * 100) / 4) }}%</b>
        as common as “的”
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    entry: {
      type: Object
    },
    showText: {
      default: true
    },
    mini: {
      default: false
    }
  }
}
</script>

<style scoped>
.frequency-wrapper:not(:hover) .frequency-text {
  opacity: 0;
}

.frequency {
  background: #ccc;
  height: 0.3rem;
  width: 100%;
}

.frequency-fill {
  background: #88b1a2;
  height: 0.3rem;
}

.frequency-level {
  font-weight: bold;
}

.frequency-wrapper.mini .frequency-level {
  font-size: 0.8em;
  width: 5.5em;
}
</style>
