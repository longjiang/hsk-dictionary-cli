<template>
  <div class="frequency-wrapper">
    <div
      class="frequency-level"
      v-bind:data-bg-hsk="entry.hsk"
      v-if="entry.oofc == ''"
    >
      {{ entry.hsk === 'outside' ? 'Outside HSK' : 'HSK ' + entry.hsk }}
    </div>
    <div class="frequency">
      <div
        class="frequency-fill"
        :data-bg-hsk="entry.hsk"
        :style="`width: ${(Math.log10(1 + entry.rank * 10000) * 100) / 4}%`"
      ></div>
    </div>
    <div class="text-center mt-1 frequency-text">
      <b>{{ Math.round((Math.log10(1 + entry.rank * 10000) * 100) / 4) }}%</b>
      as common as “的”
    </div>
  </div>
</template>

<script>
export default {
  props: {
    entry: {
      type: Object
    }
  }
}
</script>

<style>

.frequency-wrapper {
  display: inline-block;
}

.frequency-wrapper:not(:hover) .frequency-text {
  opacity: 0;
}

.frequency {
  background: #ccc;
  height: 0.3rem;
  width: 100%;
}

.frequency-fill {
  background:#88b1a2;
  height:0.3rem;
}

</style>
