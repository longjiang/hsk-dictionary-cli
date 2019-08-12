<template>
  <div class="main mt-5 mb-5">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="focus">
            <h4>Ultimate Chinese Grammar Cheatsheet</h4>
            <p class="mb-5">
              Here is a list of all grammar notes included in the
              <a
                href="https://www.blcup.com/EnSeriesBook/index/8"
                target="_blank"
                >HSK Standard Course textbooks</a
              >, as covered by
              <a href="https://chinesezerotohero.teachable.com/" target="_blank"
                >our video courses</a
              >.
            </p>
            <GrammarChart/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GrammarChart from '@/components/GrammarChart.vue'
import $ from 'jquery'

export default {
  components: {
    GrammarChart
  },
  data() {
    return {
    }
  }
}
</script>
