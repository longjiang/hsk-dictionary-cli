<template>
  <div>
    <div v-if="definitions && definitions.length > 0">
      <ul class="definitions collapsed mb-0" data-collapse-target>
        <li v-for="definition in definitions" class="english">
          {{ definition.text }}
        </li>
      </ul>
      <ShowMoreButton :length="definitions.length" :min="3" />
    </div>
    <div class="english" v-else>
      {{ nodef }}
    </div>
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
