<template>
  <!-- ANCHOR img/anchors/entry.png  -->
  <div class="entry-head-wrapper mini text-center" v-if="entry">
    <Star :word="entry"></Star>
    <button
      class="paginate-button previous"
      v-on:click="previousClick"
      title="Previous word"
      v-if="!minimal && hasPrevious"
    >
      <img src="img/angle-left.svg" alt />
    </button>
    <button
      class="paginate-button next"
      v-on:click="nextClick"
      title="Next word"
      v-if="!minimal && hasNext"
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
          <a :href="`#/view/cedict/${entry.identifier}`">
            <span v-bind:data-hsk="entry.book">{{ entry.simplified }}</span>
          </a>
        </div>
      </div>
    </div>
    <DefinitionsList
      class="mt-4"
      v-if="!minimal"
      :definitions="entry.definitions"
    ></DefinitionsList>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import List from '@/lib/list'
import Normalizer from '@/lib/normalizer'
import DefinitionsList from '@/components/DefinitionsList.vue'

export default {
  props: {
    entry: {
      type: Object
    },
    minimal: {
      type: String,
      default: ''
    }
  },
  components: {
    DefinitionsList
  },
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
        return item.join(',') === entry.identifier
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
        const previousWord = Normalizer.get(...list.previous())
        location.hash = `/view/cedict/${previousWord.identifier}`
      }
    },
    nextClick() {
      let list = this.list()
      if (list.hasNext()) {
        const nextWord = Normalizer.get(...list.next())
        location.hash = `/view/cedict/${nextWord.identifier}`
      }
    }
  }
}
</script>
