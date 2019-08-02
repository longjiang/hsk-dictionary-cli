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
        :href="suggestion.href"
        class="suggestion"
        v-for="suggestion in suggestions"
        :target="suggestion.type === 'notFound' ? '_blank' : ''"
      >
        <span v-if="suggestion.type === 'cedict'">
          <span class="character-example-word mr-1">{{
            suggestion.row.simplified
          }}</span>
          <span class="character-example-pinyin mr-1">{{
            suggestion.row.pinyin
          }}</span>
          <span
            class="character-example-english"
            v-if="
              suggestion.row.definitions &&
                suggestion.row.definitions.length > 0
            "
            >{{ suggestion.row.definitions[0].text }}</span
          >
        </span>
        <span v-if="suggestion.type === 'notFound'">
          <span class="suggestion-not-found">
            <b>&ldquo;{{ suggestion.text }}&rdquo;</b> is not in CEDICT. Try
            looking it up in
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

export default {
  props: {
    hrefFunc: {
      type: Function,
      default: function(entry) {
        return `#/view/cedict/${entry.traditional},${entry.pinyin},${
          entry.index
        }`
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
    entry() {
      $(this.$el)
        .find('.lookup')
        .val(this.entry ? this.entry.simplified : '')
    },
    $route() {
      this.suggestions = []
    }
  },
  methods: {
    // ANCHOR img/anchors/saved-words-button.png
    lookupKeyupEnter() {
      const url = $('.suggestion:first-child').attr('href')
      window.location = url
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
        this.suggestions = []
      }, 100) // Set time out, otherwise before click event is fired the suggestions are already gone!
    },
    lookupKeyup(e) {
      this.suggestions = []
      var text = e.target.value
      if (text !== '') {
        const cedictSuggestions = CEDICT.lookupFuzzy(text, 5)
        var suggestions = []
        var hskWordStrArray = []
        const cedictFiltered = cedictSuggestions.filter(function(
          cedictSuggestion
        ) {
          return !hskWordStrArray.includes(cedictSuggestion.simplified)
        })
        cedictFiltered.forEach(cedictSuggestion => {
          suggestions.push({
            type: 'cedict',
            href: this.hrefFunc(cedictSuggestion),
            row: cedictSuggestion
          })
        })
        if (suggestions.length === 0) {
          suggestions.push({
            type: 'notFound',
            text: text,
            href: 'https://en.wiktionary.org/w/index.php?search=' + text
          })
        }
        this.suggestions = suggestions
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
