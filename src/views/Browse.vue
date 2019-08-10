<template>
  <div class="container main mt-4 mb-4" v-cloak :key="browseKey">
    <div class="row">
      <div class="col-sm-12">
        <div>
          <h4>Browse Words by Course</h4>
          <p>Each tiny square represents a word.</p>
          <hr />
          <Loader class="mt-5" />
          <CourseBrowser />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseBrowser from '@/components/CourseBrowser.vue'

export default {
  data() {
    return {
      CourseBrowser
    }
  },
  mounted() {},
  methods: {}
}
</script>
