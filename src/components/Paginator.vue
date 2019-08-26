<template>
  <div class="paginator">
    <a
      class="paginator-previous mr-3 btn btn-dark"
      :href="url(previous)"
      title="Previous word"
      v-if="previous"
    >
      <font-awesome-icon icon="chevron-left" />
    </a>
    {{ title }} <b>{{ currentIndex + 1 }}</b> of {{ items.length }}
    <a
      class="paginator-next ml-3 btn btn-dark"
      :href="url(next)"
      title="Next word"
      v-if="next"
    >
      <font-awesome-icon icon="chevron-right" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: 'Item'
    },
    items: {
      type: Array
    },
    findCurrent: {
      type: Function
    },
    url: {
      type: Function
    }
  },
  computed: {
    currentIndex() {
      return this.items.findIndex(this.findCurrent)
    },
    previous() {
      if (this.currentIndex - 1 >= 0) {
        return this.items[this.currentIndex - 1]
      } else {
        return false
      }
    },
    next() {
      if (this.currentIndex + 1 < this.items.length) {
        return this.items[this.currentIndex + 1]
      } else {
        return false
      }
    }
  },
  mounted() {}
}
</script>

<style></style>
