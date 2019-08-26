<template>
  <div>
    <div v-if="definitions && definitions.length > 0">
      <ul class="definitions collapsed mb-2" data-collapse-target>
        <li v-for="definition in definitions" class="definition-list-item">
          {{ definition.text ? definition.text : definition }}
        </li>
      </ul>
      <ShowMoreButton
        :length="definitions.length"
        :min="3"
        class="focus-exclude"
      />
    </div>
    <div class="english" v-else>{{ nodef }}</div>
  </div>
</template>

<script>
export default {
  props: {
    definitions: Array,
    nodef: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">

.definitions {
  padding: 0;
  list-style: none;
}

.definitions.collapsed li:nth-child(n + 4) {
  display: none;
}
.definition-list-item {
  font-size: 1.1rem;
  font-style: italic;
}
</style>
