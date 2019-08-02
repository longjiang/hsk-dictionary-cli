<template>
  <div class="merge-wrapper">
    <div class="merge" v-if="direction === 'top'">
      <div class="merge-top">
        <div class="merge-bl"></div>
        <div class="merge-br"></div>
      </div>
      <div class="merge-bottom">
        <div class="merge-tr"></div>
        <div class="merge-tl"></div>
      </div>
    </div>
    <div class="merge" v-if="direction === 'bottom'">
      <div class="merge-top">
        <div class="merge-br"></div>
        <div class="merge-bl"></div>
      </div>
      <div class="merge-bottom">
        <div class="merge-tl"></div>
        <div class="merge-tr"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['direction']
}
</script>

<style scoped>
.merge-top,
.merge-bottom {
  display: flex;
}

.merge .merge-bl,
.merge .merge-br,
.merge .merge-tr,
.merge .merge-tl {
  width: 50%;
  height: 1.5rem;
}
.merge .merge-bl {
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-radius: 0 0 0 1.5rem;
  margin-right: 3rem;
}
.merge .merge-br {
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-radius: 0 0 1.5rem 0;
  margin-left: 3rem;
}

.merge .merge-tr {
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-radius: 0 1.5rem 0 0;
  margin-left: 3rem;
}
.merge .merge-tl {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-radius: 1.5rem 0 0 0;
  margin-right: 3rem;
}
</style>
