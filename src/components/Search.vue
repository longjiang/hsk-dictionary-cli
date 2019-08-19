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
        <i class="glyphicon glyphicon-random"></i>
        <span> Random</span>
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
        <Frequency
          :entry="suggestion"
          :showText="false"
          :mini="true"
          class="mr-2"
        />
        <span>
          <span
            class="suggestion-word font-weight-bold mr-1"
            :data-hsk="suggestion.hsk"
            >{{ suggestion.simplified }}</span
          >
          <span class="suggestion-pinyin mr-1">
            {{ suggestion.pinyin }}
          </span>
          <span
            class="suggestion-english"
            v-if="suggestion.definitions && suggestion.definitions.length > 0"
            v-html="
              Helper.highlight(
                suggestion.definitions
                  .slice(0, 4)
                  .map(definition => definition.text)
                  .join(', '),
                text
              )
            "
          ></span>
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
import Frequency from '@/components/Frequency'

export default {
  components: {
    Frequency
  },
  props: {
    entry: {
      default: undefined
    },
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
      Helper,
      suggestions: [],
      text: this.entry ? this.entry.simplified : '',
      active: false,
      suggestionsKey: 0
    }
  },
  watch: {
    $route() {
      this.active = false
    },
    entry() {
      if (this.entry) {
        this.text = this.entry.simplified
      }
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
<style scoped>
.suggestions {
  position: absolute;
  z-index: 3;
  border-radius: 0.3rem;
  overflow: hidden;
  border: 1px solid #ccc;
  width: 100%;
  top: 2.9rem;
}

.suggestion,
a.suggestion {
  display: block;
  background: white;
  padding: 0.3rem 1rem;
  border: 1px solid #f3f3f3;
  color: #7b7b7b;
  text-decoration: none;
  display: flex;
  align-items: top;
  padding: 0.5rem 1rem;
}

.suggestion:hover,
.suggestion:first-child:not(:hover) {
  background: #ececec;
}

.suggestion-english {
  font-style: italic;
  color: #aaa;
}

.search-wrapper {
  position: relative;
}

.suggestion-word {
  font-size: 1.5em;
  line-height: 1;
}

.suggestion-english >>> .highlight {
  font-weight: bold;
  color: #999;
}
</style>
