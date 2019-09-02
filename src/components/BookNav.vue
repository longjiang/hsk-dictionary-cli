<template>
  <b-input-group>
    <b-form-input v-model="url" placeholder="Book URL" />
    <b-input-group-append>
      <b-button variant="danger" @click="goto" @keyup.enter="goto">Study</b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  data() {
    return {
      url: undefined
    }
  },
  methods: {
    goto() {
      if (this.url) {
        location.hash = '#/book/view/' + encodeURIComponent(this.url)
      }
    }
  }
}
</script>

<style>
</style>