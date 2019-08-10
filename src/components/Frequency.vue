<template>
  <div class="frequency-wrapper">
    <div class="frequency">
      <div
        class="frequency-fill"
        :data-bg-hsk="entry.hsk"
        :style="`width: ${(Math.log10(1 + entry.rank * 10000) * 100) / 4}%`"
      ></div>
    </div>
    <div class="text-center mt-2 frequency-text">
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

<style></style>
