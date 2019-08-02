<template>
  <div class="search-wrapper">
    <div class="input-group" v-cloak>
      <input
        v-on:keyup.enter="lookupKeyupEnter"
        v-on:keyup="lookupKeyup"
        v-on:keyup.esc="cancel"
        v-on:blur="cancel"
        v-on:compositionend="lookupKeyup"
        v-on:focus="lookupKeyup"
        type="text"
        class="form-control lookup"
        :placeholder="placeholder"
      />
      <a
        v-if="random"
        class="btn btn-secondary btn-random ml-2"
        href="#/view/cedict/random"
      >
        <i class="glyphicon glyphicon-random"></i> Random
      </a>
      <div class="input-group-append">
        <button
          class="btn btn-primary lookup-button"
          v-on:click="lookupButtonClick"
          type="button"
          title="Search"
        >
          <i class="glyphicon glyphicon-search"></i>
        </button>
      </div>
    </div>
    <div
      class="suggestions"
      :key="suggestionsKey"
      v-cloak
      v-if="suggestions.length > 0"
    >
      <a
        class="suggestion"
        v-for="suggestion in suggestions"
        :href="
          suggestion === 'not found'
            ? this.wiktionaryUrl()
            : hrefFunc(suggestion)
        "
      >
        <span>
          <span
            class="character-example-word mr-1"
            :data-hsk="suggestion.book"
            >{{ suggestion.simplified }}</span
          >
          <span class="character-example-pinyin mr-1">{{
            suggestion.pinyin
          }}</span>
          <span
            class="character-example-english"
            v-if="suggestion.definitions && suggestion.definitions.length > 0"
            >{{ suggestion.definitions[0].text }}</span
          >
        </span>
        <span v-if="suggestion === 'not found'">
          <span class="suggestion-not-found">
            <b>&ldquo;{{ this.text }}&rdquo;</b> is not in CEDICT. Try looking
            it up in
            <b>Wiktionary.</b>
          </span>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import CEDICT from '@/lib/cedict.js'
import { setTimeout } from 'timers'
import Normalizer from '@/lib/normalizer'

export default {
  props: {
    hrefFunc: {
      type: Function,
      default: function(entry) {
        if (entry) {
          return `#/view/cedict/${entry.traditional},${entry.pinyin},${
            entry.index
          }`
        }
      }
    },
    placeholder: {
      default: 'Look up words here...'
    },
    random: {
      default: false
    }
  },
  data() {
    return {
      suggestions: [],
      entry: undefined, // Currently selected entry
      suggestionsKey: 0
    }
  },
  watch: {
    $route() {
      this.suggestions = []
      if (this.$parent.$refs.routerView.entry) {
        this.entry = this.$parent.$refs.routerView.entry
        this.text = this.$parent.$refs.routerView.entry.simplified
      }
    }
  },
  methods: {
    // ANCHOR img/anchors/saved-words-button.png
    lookupKeyupEnter() {
      const url = $('.suggestion:first-child').attr('href')
      window.location = url
    },
    wiktionaryUrl() {
      return 'https://en.wiktionary.org/w/index.php?search=' + this.text
    },
    lookupButtonClick() {
      const url = $('.suggestion:first-child').attr('href')
      if (url) {
        this.suggestions = []
        window.location = url
        $('.suggestion:first-child')
          .get(0)
          .click()
      }
    },
    cancel() {
      setTimeout(() => {
        if (this.suggestions[0] !== 'not found') {
          this.entry = this.suggestions[0]
        }
        this.suggestions = []
      }, 100) // Set time out, otherwise before click event is fired the suggestions are already gone!
    },
    lookupKeyup(e) {
      this.suggestions = []
      this.text = e.target.value
      if (this.text !== '') {
        this.suggestions = CEDICT.lookupFuzzy(this.text, 5).map(item =>
          Normalizer.normalize(item)
        )
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
