<template>
  <div class="main mt-4 mb-4 container" v-cloak>
    <div class="row">
      <div class="col-sm-12">
        <h4 class="page-title mb-4">
          Settings
        </h4>
        <hr />
        <div class="mt-5">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="show-pinyin"
              v-model="showPinyin"
              checked
            />
            <label for="show-pinyin">Show Pinyin</label>
          </div>
          <div class="form-check">
            <input
              type="radio"
              id="use-traditional"
              class="form-check-input"
              v-model="useTraditional"
              value="true"
            />
            <label for="use-traditional">Use Traditional (正體字/繁體字)</label>
          </div>
          <div class="form-check">
            <input
              type="radio"
              id="use-simplified"
              class="form-check-input"
              v-model="useTraditional"
              value="false"
            />
            <label for="use-simplified">Use Simplified (简体字)</label>
          </div>
        </div>
        <PinyinButton />
        <div class="big-word mt-4 mb-4">文字范例</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPinyin: localStorage.getItem('czhHidePinyinExceptSaved') === 'false',
      useTraditional: localStorage.getItem('czhUseTraditional') === 'true'
    }
  },
  watch: {
    showPinyin() {
      localStorage.setItem('czhHidePinyinExceptSaved', !this.showPinyin)
      this.$parent.hidePinyinExceptSaved = !this.showPinyin
    },
    useTraditional() {
      localStorage.setItem('czhUseTraditional', this.useTraditional === 'true')
      this.$parent.useTraditional = this.useTraditional === 'true'
    }
  }
}
</script>
