<template>
  <!-- ANCHOR img/anchors/entry.png  -->
  <div class="container" v-if="entry">
    <div class="row text-center">
      <div class="col-md-12">
        <div class="entry-head-wrapper">
          <Star :word="entry"></Star>
          <button
            class="paginate-button previous"
            v-on:click="previousClick"
            title="Previous word"
            v-if="hasPrevious"
          >
            <img src="img/angle-left.svg" alt />
          </button>
          <button
            class="paginate-button next"
            v-on:click="nextClick"
            title="Next word"
            v-if="hasNext"
          >
            <img src="img/angle-right.svg" alt />
          </button>

          <div>
            <div v-if="entry.measureWords" style="display:inline-block">
              <div class="pinyin measure-word-pinyin">
                yī {{ entry.measureWords[0].pinyin }}
                <i
                  class="speak glyphicon glyphicon-volume-up"
                  v-bind:data-speak="'一' + entry.measureWords[0].simplified"
                ></i>
              </div>
              <div class="word measure-word">
                一{{ entry.measureWords[0].simplified }}
              </div>
            </div>
            <div class="entry-word" style="display:inline-block">
              <div class="pinyin">
                {{ entry.pinyin }}
                <i
                  class="speak glyphicon glyphicon-volume-up"
                  v-bind:data-speak="entry.simplified"
                ></i>
              </div>
              <div class="word">
                <span v-bind:data-hsk="entry.book">{{ entry.simplified }}</span>
              </div>
            </div>
          </div>
          <div class="definitions" v-if="entry.english && !entry.definitions">
            <p class="english" v-if="entry.english">{{ entry.english }}</p>
          </div>
          <ul
            class="definitions collapsed"
            v-if="entry.definitions"
            data-collapse-target
          >
            <li v-for="definition in entry.definitions" class="english">
              {{ definition.text }}
            </li>
          </ul>
          <button
            v-if="entry.definitions && entry.definitions.length > 4"
            class="show-more collapsed mb-4"
            v-on:click="Helper.showMoreClick"
            title="Show all definitions"
          >
            <span class="label-expand">
              Show
              {{ entry.definitions.length - 3 }}
              more senses
            </span>
            <span class="label-collapse">Collapse</span>
          </button>
        </div>
      </div>
      <!-- .col -->
    </div>
    <!-- .row -->
  </div>
  <!-- .container -->
</template>

<script>
import Helper from '@/lib/helper'
import List from '@/lib/list'
import Normalizer from '@/lib/normalizer'

export default {
  props: ['entry'],
  data() {
    return {
      Helper
    }
  },
  computed: {
    hasPrevious: function() {
      const list = this.list()
      if (list) {
        return list.hasPrevious()
      } else {
        return false
      }
    },
    hasNext: function() {
      const list = this.list()
      if (list) {
        return list.hasNext()
      } else {
        return false
      }
    }
  },
  methods: {
    findCurrentFunction(entry) {
      return function(item) {
        return (
          item[0] === entry.traditional &&
          item[1].replace(/\s/g, '').toLowerCase() ===
            entry.pinyin.replace(/\s/g, '').toLowerCase()
        )
      }
    },
    list() {
      const savedWords = this.$store.state.savedWords
      if (savedWords.length > 0) {
        const list = new List(savedWords)
        list.setCurrent(this.findCurrentFunction(this.entry))
        return list
      }
    },
    previousClick() {
      let list = this.list()
      if (list.hasPrevious()) {
        const args = Normalizer.getArgs(this.entry.method, list.previous())
        const previousWord = new Word(this.entry.method, args)
        location.hash = `/view/${this.entry.method}/${previousWord.args.join(
          ','
        )}`
      }
    },
    nextClick() {
      let list = this.list()
      if (list.hasNext()) {
        const args = Normalizer.getArgs(this.entry.method, list.next())
        const nextWord = new Word(this.entry.method, args)
        location.hash = `/view/${this.entry.method}/${nextWord.args.join(',')}`
      }
    }
  }
}
</script>
