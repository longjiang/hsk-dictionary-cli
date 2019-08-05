<template>
  <div>
    <div class="container mt-4 mb-4">
      <div class="row">
        <div class="col-sm-12">
          <div id="annotate-me" class="show-pinyin show-simplified">
            我是一些文字。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Annotator from '@/lib/annotator'
import $ from 'jquery'

export default {
  mounted() {
    Annotator.load(() => {
      Annotator.annotateIteratively($('#annotate-me')[0])
    })
  }
}
</script>
