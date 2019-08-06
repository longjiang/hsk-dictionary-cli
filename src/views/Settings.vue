<template>
  <div class="main mt-4 mb-4 container" v-cloak>
    <div class="row">
      <div class="col-sm-12">
        <h4 class="page-title mb-4">
          Settings
        </h4>
        <hr />
        <div class="mt-2 mb-2">
          <input
            type="checkbox"
            id="hide-pinyin"
            class="mr-1"
            v-model="hidePinyinExceptSaved"
            checked
          />
          <label for="hide-pinyin">Hide Pinyin</label>
          <input
            type="checkbox"
            id="use-traditional"
            class="ml-3 mr-1"
            v-model="useTraditional"
          />
          <label for="use-traditional">Traditional</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hidePinyinExceptSaved: localStorage.getItem('czhHidePinyinExceptSaved'),
      useTraditional: localStorage.getItem('czhUseTraditional')
    }
  },
  watch: {
    hidePinyinExceptSaved() {
      localStorage.setItem(
        'czhHidePinyinExceptSaved',
        this.hidePinyinExceptSaved
      )
      this.$parent.hidePinyinExceptSaved = this.hidePinyinExceptSaved
    },
    useTraditional() {
      localStorage.setItem('czhUseTraditional', this.useTraditional)
      this.$parent.useTraditional = this.useTraditional
    }
  }
}
</script>
