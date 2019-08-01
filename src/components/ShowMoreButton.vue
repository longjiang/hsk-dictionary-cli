<template>
  <button
    v-if="length > min"
    class="show-more collapsed mb-4"
    v-on:click="showMoreClick"
  >
    <span class="label-expand">
      <slot>Show {{ length - min }} More</slot>
    </span>
    <span class="label-collapse">Collapse</span>
  </button>
</template>

<script>
import $ from 'jquery'
export default {
  props: ['length', 'min'],
  methods: {
    showMoreClick(e) {
      var $button = $(e.currentTarget)
      $button.siblings('[data-collapse-target]').toggleClass('collapsed')
      $button.toggleClass('collapsed')
    }
  }
}
</script>
