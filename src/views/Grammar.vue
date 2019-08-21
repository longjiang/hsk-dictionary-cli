<template>
  <div class="main mt-5 mb-5">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="focus text-center">
            <h3 class="mb-3">Ultimate Chinese Grammar Cheatsheet</h3>
            <p class="mb-5">
              Here is a list of all grammar notes from HSK 1 to 6 included in
              the
              <a
                href="https://www.blcup.com/EnSeriesBook/index/8"
                target="_blank"
                >HSK Standard Course textbooks</a
              >, as covered by
              <a href="https://chinesezerotohero.teachable.com/" target="_blank"
                >our video courses</a
              >, plus a few we added based on the official HSK grammar list from
              <a href="http://www.cltguides.com/user/yufaka.action"
                >CLT Guides</a
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <GrammarChart />
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
    return {}
  }
}
</script>
