<template>
  <div class="question-collocation" :id="id">
    <div class="question-slide-aspect">
      <div class="question-slide" :id="`${id}-slide-1`">
        <div class="container text-center mt-4">
          <div class="row">
            <div class="col-sm-12" v-if="loading">
              <div class="inner-circles-loader mb-4"></div>
              <div>Loading collocation information...</div>
            </div>
          </div>
        </div>
      </div>
      <div class="question-slide" :id="`${id}-slide-1`">
        <div class="container text-center mt-4" v-if="error">
          <div class="row">
            <div class="col-sm-12">
              <div>
                <i class="glyphicon glyphicon-fire mb-4"></i>
              </div>
              <div>No collocation data is available for this word.</div>
            </div>
          </div>
        </div>
        <div v-if="word.sketch && word.sketch.Gramrels">
          <div
            class="question-prompt mb-4"
            v-for="gramrel in [Helper.randomArrayItem(word.sketch.Gramrels)]"
          >
            <div>
              <button
                class="show-more mb-3"
                v-on:click="Helper.showPinyinClick"
                :data-target-selector="`#${id}-slide-1 .big-word`"
              >
                Show Pinyin
              </button>
              <div
                class="text-center big-word"
                v-html="
                  Helper.highlight(
                    Helper.randomArrayItem(gramrel.Words, 0, 5).cm,
                    word.simplified,
                    word.book
                  )
                "
              ></div>
              <div
                v-bind:key="gramrel.name"
                class="example-sentence-word mt-2"
                v-for="name in [
                  SketchEngine.collocationDescription(word.simplified)[
                    gramrel.name
                  ]
                ]"
                v-html="Helper.highlight(name, word.simplified, word.book)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import Config from '@/lib/config'
import SketchEngine from '@/lib/sketch-engine'

export default {
  props: ['id', 'word', 'type'],
  components: {},
  data() {
    return {
      Helper,
      Config,
      SketchEngine,
      loading: true,
      error: false
    }
  },
  mounted() {
    SketchEngine.wsketch(this.word.simplified, response => {
      this.loading = false
      if (response.Gramrels && response.Gramrels.length > 0) {
        this.word.sketch = response
        this.word.sketch.Gramrels = this.word.sketch.Gramrels.sort(
          (a, b) => b.count - a.count
        )
      } else {
        this.error = true
      }
    })
  },
  methods: {
    gramrel(Gramrels, name) {
      if (Gramrels) {
        return Gramrels.find(function(Gramrel) {
          return Gramrel.name === name
        })
      }
    }
  }
}
</script>
