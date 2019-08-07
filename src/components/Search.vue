<template>
  <div class="search-wrapper">
    <div class="input-group" v-cloak>
      <input
        @keyup.enter="lookupKeyupEnter"
        @focus="active = true"
        @blur="cancel"
        v-model="text"
        type="text"
        class="form-control lookup"
        :placeholder="placeholder"
      />
      <a
        v-if="random"
        class="btn btn-secondary btn-random ml-2"
        href="#/view/cedict/random"
      >
        <i class="glyphicon glyphicon-random"></i><span> Random</span>
      </a>
      <div class="input-group-append">
        <button
          class="btn btn-danger lookup-button"
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
      v-if="active && text && text.length > 0"
    >
      <a
        class="suggestion"
        v-for="suggestion in suggestions"
        :href="hrefFunc(suggestion)"
      >
        <span>
          <span
            class="character-example-word mr-1"
            :data-hsk="suggestion.hsk"
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
      </a>
      <div class="suggestion" v-if="suggestions.length === 0">
        <span class="suggestion-not-found">
          <b>&ldquo;{{ this.text }}&rdquo;</b> is not in CEDICT. Try looking it
          up in
          <a
            :href="`https://en.wiktionary.org/w/index.php?search=${text}`"
            target="blank"
            >Wiktionary</a
          >,
          <a
            :href="`https://en.wikipedia.org/w/index.php?search=${text}`"
            target="blank"
            >Wikipedia</a
          >, or
          <a :href="`https://www.google.com/search?q=${text}`" target="blank"
            >Google.</a
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { setTimeout } from 'timers'
import Helper from '@/lib/helper'

export default {
  props: {
    hrefFunc: {
      type: Function,
      default: function(entry) {
        if (entry) {
          return `#/view/cedict/${entry.identifier}`
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
      text: undefined,
      active: false,
      suggestionsKey: 0
    }
  },
  watch: {
    $route() {
      this.active = false
    },
    text() {
      Helper.loaded(
        (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
          LoadedHSKCEDICT.lookupFuzzy(
            rows => {
              this.suggestions = rows
            },
            [this.text, 20]
          )
        }
      )
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
        if (this.suggestions[0]) this.entry = this.suggestions[0]
        this.active = false
      }, 300) // Set time out, otherwise before click event is fired the suggestions are already gone!
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
