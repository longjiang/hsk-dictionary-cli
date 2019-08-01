<template>
  <div v-if="definitions">
    <ul class="definitions collapsed" data-collapse-target>
      <li v-for="definition in definitions" class="english">
        {{ definition.text }}
      </li>
    </ul>
    <button
      v-if="entry.definitions && entry.definitions.length > 4"
      class="show-more collapsed mb-4"
      v-on:click="Helper.showMoreClick"
      title="Show all definitions"
    >
      <span class="label-expand">
        Show
        {{ entry.definitions.length - 3 }}
        more senses
      </span>
      <span class="label-collapse">Collapse</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ['definitions']
}
</script>
