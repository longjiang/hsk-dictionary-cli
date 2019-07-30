<template>
  <div class="search-wrapper" :key="searchKey" v-cloak>
    <div class="input-group">
      <input
        v-on:keyup.enter="lookupKeyupEnter"
        v-on:keyup="lookupKeyup"
        v-on:compositionend="lookupKeyup"
        v-on:focus="lookupKeyup"
        type="text"
        class="form-control"
        id="lookup"
        placeholder="Search for a Chinese word here..."
      />
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
    <div class="suggestions" v-cloak v-if="suggestions.length > 0">
      <a
        :href="suggestion.href"
        class="suggestion"
        v-for="suggestion in suggestions"
      >
        <span v-if="suggestion.type === 'hsk'">
          <span
            class="character-example-word"
            v-bind:data-hsk="suggestion.row.book"
            >{{ suggestion.row.word }}</span
          >
          <span class="character-example-pinyin">{{
            suggestion.row.pinyin
          }}</span>
          <span class="character-example-english">{{
            suggestion.row.english
          }}</span>
        </span>
        <span v-if="suggestion.type === 'cedict'">
          <span class="character-example-word">{{
            suggestion.row.simplified
          }}</span>
          <span class="character-example-pinyin">{{
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
            <b>&ldquo;{{ suggestion.text }}&rdquo;</b> is not in the HSK. Try
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
import HSK from '@/lib/hsk.js'
import CEDICT from '@/lib/cedict.js'

export default {
  template: '#search-template',
  data() {
    return {
      suggestions: [],
      searchKey: 0
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
    lookupKeyup(e) {
      let app = this
      app.suggestions = []
      var text = e.target.value
      if (text !== '') {
        const hskSuggestions = HSK.lookupFuzzy(text).slice(0, 5)
        const cedictSuggestions = CEDICT.lookupFuzzy(text).slice(0, 5)
        var suggestions = []
        var hskWordStrArray = []
        hskSuggestions.forEach(function(hskSuggestion) {
          hskWordStrArray.push(hskSuggestion.word)
          suggestions.push({
            type: 'hsk',
            href: '#/view/hsk/' + hskSuggestion.id,
            row: hskSuggestion
          })
        })
        const cedictFiltered = cedictSuggestions.filter(function(
          cedictSuggestion
        ) {
          return !hskWordStrArray.includes(cedictSuggestion.simplified)
        })
        cedictFiltered.forEach(function(cedictSuggestion) {
          suggestions.push({
            type: 'cedict',
            href: `#/view/cedict/${cedictSuggestion.traditional},${
              cedictSuggestion.pinyin
            }`,
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
        app.suggestions = suggestions
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
