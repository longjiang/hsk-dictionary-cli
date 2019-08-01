<template>
  <div v-if="definitions">
    <ul class="definitions collapsed" data-collapse-target>
      <li v-for="definition in definitions" class="english">
        {{ definition.text }}
      </li>
    </ul>
    <ShowMoreButton :length="definitions.length" :min="3" />
  </div>
</template>

<script>
export default {
  props: ['definitions']
}
</script>
