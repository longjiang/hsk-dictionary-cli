<template>
  <!-- ANCHOR img/anchors/entry.png  -->
  <div class="container" v-if="entry">
    <div class="row text-center">
      <div class="col-md-12">
        <div class="entry-head-wrapper">
          <Star :method="entry.method" :args="entry.args"></Star>
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
import SavedWords from '@/lib/saved-words'
import SavedHSKWords from '@/lib/saved-hsk-words'
import HSK from '@/lib/hsk'
import Helper from '@/lib/helper'

export default {
  props: ['entry'],
  data() {
    return {
      SavedWords,
      Helper,
      savedWordsKey: 0
    }
  },
  computed: {
    hasPrevious: function() {
      var thisId = parseInt(this.entry.id)
      if (SavedHSKWords.count() < 2) {
        return HSK.hasPrevious(thisId)
      } else {
        let i = SavedHSKWords.getIdsSorted().indexOf(thisId.toString())
        return i > 0
      }
    },
    hasNext: function() {
      var thisId = parseInt(this.entry.id)
      if (SavedHSKWords.count() < 2) {
        return HSK.hasNext(thisId)
      } else {
        let i = SavedHSKWords.getIdsSorted().indexOf(thisId.toString())
        return i + 1 < SavedHSKWords.count()
      }
    }
  },
  methods: {
    previousClick() {
      var thisId = parseInt(this.entry.id)
      var previousId
      if (SavedHSKWords.count() < 2) {
        previousId = Math.max(HSK.first(), thisId - 1)
      } else {
        const savedIds = SavedHSKWords.getIdsSorted()
        let i = savedIds.indexOf(thisId.toString())
        var previousIndex = Math.max(0, i - 1)
        previousId = savedIds[previousIndex]
      }
      location.hash = 'view/hsk/' + previousId
    },
    nextClick() {
      let thisId = parseInt(this.entry.id)
      let nextId
      if (SavedHSKWords.count() < 2) {
        nextId = Math.min(HSK.last(), thisId + 1)
      } else {
        const savedIds = SavedHSKWords.getIdsSorted()
        let i = savedIds.indexOf(thisId.toString())
        let nextIndex = Math.min(SavedHSKWords.count() - 1, i + 1)
        nextId = savedIds[nextIndex]
      }
      location.hash = 'view/hsk/' + nextId
    }
  }
}
</script>
