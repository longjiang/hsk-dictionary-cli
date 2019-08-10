<template>
  <div class="dewey" v-cloak :key="browseKey">
    <ul class="dewey-l1">
      <li v-for="(l1, i) of l1s">
        <h4>
          <i
            v-if="!showL1[i]"
            @click="toggleL1(i)"
            class="glyphicon glyphicon-plus expand-btn"
          ></i>
          <i
            v-if="showL1[i]"
            @click="toggleL1(i)"
            class="glyphicon glyphicon-minus collapse-btn"
          ></i>
          <span class="dewey-code ml-3">{{ l1.code }}</span>

          <span class="dewey-l1-title" :id="`title-${i}`">{{ l1.title }}</span>
          <PinyinButton
            :selector="`#title-${i}`"
            :augmentFunction="augmentAnnotatedBlocks"
          />
        </h4>
        <div :key="l1Key + i * 1000">
          <ul class="dewey-l2" v-if="showL1[i]">
            <li v-for="(l2, j) of l1.children">
              <h5>
                <i
                  @click="toggleL2(i, j)"
                  class="glyphicon glyphicon-plus expand-btn"
                  v-if="!showL2[i][j]"
                ></i>
                <i
                  @click="toggleL2(i, j)"
                  class="glyphicon glyphicon-minus collapse-btn"
                  v-if="showL2[i][j]"
                ></i>
                <span class="dewey-code ml-3">{{ l2.code }}</span>
                <PinyinButton
                  :selector="`#title-${i}-${j}`"
                  :augmentFunction="augmentAnnotatedBlocks"
                />
                <span class="dewey-l2-title" :id="`title-${i}-${j}`">{{
                  l2.title
                }}</span>
              </h5>
              <div :key="l2Key + i + j * 1000">
                <ul class="dewey-l3" v-if="showL2[i][j]">
                  <li v-for="(l3, k) of l2.children">
                    <h6>
                      <span class="dewey-code ml-3">{{ l3.code }}</span>
                      <PinyinButton
                        :selector="`#title-${i}-${j}-${k}`"
                        :augmentFunction="augmentAnnotatedBlocks"
                      />
                      <span class="dewey-l3-title" :id="`title-${i}-${j}-${k}`">
                        {{ l3.title }}
                      </span>
                    </h6>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
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
      showL1: [],
      showL2: [],
      l1Key: 0,
      l2Key: 0,
      browseKey: 0
    }
  },
  mounted() {
    Helper.loaded(
      (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
        Dewey.load().then(() => {
          window.Dewey = Dewey
          let top = Dewey.top()
          for (let i in top) {
            this.showL1[i] = false
            this.showL2[i] = []
            for (let j in top[i].children) {
              this.showL2[i][j] = false
            }
          }
          this.l1s = top
        })
      }
    )
  },
  methods: {
    toggleL1(i) {
      this.showL1[i] = !this.showL1[i]
      this.l1Key++
    },

    toggleL2(i, j) {
      this.showL2[i][j] = !this.showL2[i][j]
      this.l2Key++
    },

    augmentAnnotatedBlocks(node) {
      const wordBlocks = $(node)
        .find('.word-block[data-candidates]')
        .get()
      for (let block of wordBlocks) {
        let data = $(block).attr('data-candidates')
        if (data) {
          let candidates = JSON.parse(unescape(data))
          $(block).attr('data-identifier', candidates[0].identifier)
          if (candidates) {
            // Sort the candidates by HSK
            candidates = candidates.sort((a, b) => {
              let abook = a.hsk === 'outside' ? 7 : a.hsk
              let bbook = b.hsk === 'outside' ? 7 : b.hsk
              return abook - bbook
            })
            // Set the best candidate
            let $newBlock = $(Annotator.wordBlockTemplate(candidates))
              .clone()
              .addClass('word-block-related')
            $newBlock.prepend(`<i class="glyphicon glyphicon-fullscreen"></i>`)
            $(block).after($newBlock)
            $(block).remove()
            $newBlock.click(function() {
              location.hash = `#/explore/related/${candidates[0].identifier}`
            })
          }
        }
      }
      Helper.addToolTips(node)
    }
  }
}
</script>
