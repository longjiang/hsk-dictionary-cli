<template>
  <div class="dewey" v-cloak :key="browseKey">
    <ul class="dewey-l1">
      <li v-for="l1 of l1s">
        <h4 class="collapsed">
          <i
            @click="toggleCollapsed"
            class="glyphicon glyphicon-plus expand-btn"
          ></i>
          <i
            @click="toggleCollapsed"
            class="glyphicon glyphicon-minus collapse-btn"
          ></i>
          <span>{{ l1.code }}</span>
          <span class="dewey-l1-title">{{ l1.title }}</span>
        </h4>
        <ul class="dewey-l2 collapsed">
          <li v-for="l2 of l1.children">
            <h5 class="collapsed">
              <i
                @click="toggleCollapsed"
                class="glyphicon glyphicon-plus expand-btn"
              ></i>
              <i
                @click="toggleCollapsed"
                class="glyphicon glyphicon-minus collapse-btn"
              ></i>
              <span>{{ l2.code }}</span>
              <span class="dewey-l2-title">{{ l2.title }}</span>
            </h5>
            <ul class="dewey-l3 collapsed">
              <li v-for="l3 of l2.children">
                <h6 class="collapsed">
                  <span>{{ l3.code }}</span>
                  <span class="dewey-l3-title">{{ l3.title }}</span>
                </h6>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <PinyinButton selector=".dewey-l1-title" />
  </div>
</template>

<script>
import $ from 'jquery'
import Helper from '@/lib/helper'
import Dewey from '@/lib/dewey'
import Annotator from '@/lib/annotator'

export default {
  data() {
    return {
      l1s: undefined,
      browseKey: 0
    }
  },
  mounted() {
    Helper.loaded(
      (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
        Dewey.load().then(() => {
          window.Dewey = Dewey
          this.l1s = Dewey.top()
        })
      }
    )
  },
  updated() {
    let $target = $(this.$el)
    if ($(this.$el).find('.word-block').length === 0) {
      $target.addClass('add-pinyin') // Soo it will have the pinyin looks
      for (let node of $target.get()) {
        Annotator.annotateIteratively(node, node => {
          this.augmentAnnotatedBlocks(node)
        })
      }
    }
  },
  methods: {
    toggleCollapsed(e) {
      if (e.target.nodeName === 'I') {
        $(e.target)
          .parent()
          .toggleClass('collapsed')
          .siblings('ul')
          .toggleClass('collapsed')
      }
    },

    augmentAnnotatedBlocks(node) {
      const wordBlocks = $(node)
        .find('.word-block[data-candidates]')
        .get()
      for (let block of wordBlocks) {
        let data = $(block).attr('data-candidates')
        if (data) {
          let candidates = JSON.parse(unescape(data))
          if (candidates) {
            // Sort the candidates by HSK
            candidates = candidates.sort((a, b) => {
              let abook = a.hsk === 'outside' ? 7 : a.hsk
              let bbook = b.hsk === 'outside' ? 7 : b.hsk
              return abook - bbook
            })
            // Set the best candidate
            block.outerHTML = Annotator.wordBlockTemplate(candidates)
          }
        }
      }
      $(node)
        .find('.word-block[data-candidates]')
        .click(function() {
          const candidates = JSON.parse(
            unescape($(this).attr('data-candidates'))
          )
          location.hash = `#/explore/related/${candidates[0].identifier}`
        })
    }
  }
}
</script>
