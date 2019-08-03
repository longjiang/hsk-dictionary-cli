<template>
  <div id="hsk-dictionary">
    <!-- ANCHOR img/anchors/top-bar.png -->
    <!-- To highlight ANCHORS in the Visual Studio Code editor, download the "comment anchors" extension by Exodius Studios  -->
    <!-- To see image previews, download the "image preview" extension from Kiss Tamás  -->
    <!-- To paste images from clipboard directly, download the "Paste Image" extension from mushan -->
    <div class="container-fluid top-bar pt-4">
      <div class="container">
        <div class="row mb-4">
          <div class="col-sm-12">
            <h1 class="title">
              <a class="title-text" href="#/">Dictionary</a>
              <a href="https://www.chinesezerotohero.com">
                <img src="img/logo-mark.png" class="logo" alt />
              </a>
            </h1>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="search-compare-wrapper">
              <Search ref="search" main="true" random="true"></Search>
              <Search
                v-if="compare"
                class="ml-2"
                ref="compare"
                placeholder="Compare with..."
                :hrefFunc="compareHrefFunc"
              ></Search>
              <button class="btn btn-primary ml-2" @click="compareClick">
                <span v-if="compare">Close</span
                ><span v-if="!compare">Compare</span>
              </button>
            </div>
          </div>
        </div>
        <div class="row mt-4" v-cloak>
          <nav class="tabs">
            <div class="col-sm-12">
              <router-link
                class="tab"
                :to="{ name: 'browse' }"
                title="Browse words by course"
              >
                <i class="glyphicon glyphicon-book"></i>
                Browse
              </router-link>
              <router-link
                class="tab"
                :to="{ name: 'entry' }"
                title="View a word"
              >
                <i class="glyphicon glyphicon-font"></i> Entry
              </router-link>
              <router-link
                class="tab"
                :to="{ name: 'reader' }"
                title="Read your text with annotation"
              >
                <i class="glyphicon glyphicon-file"></i> Reader
              </router-link>
              <router-link
                class="tab"
                :to="{ name: 'learn' }"
                title="Learn new words"
              >
                <i class="glyphicon glyphicon-blackboard"></i> Learn
              </router-link>
              <router-link
                class="tab tab-saved-words"
                :to="{ name: 'saved-words' }"
              >
                <i class="glyphicon glyphicon-star"></i> Saved
                <span class="tab-saved-words-count" v-cloak>
                  {{ savedWordsCount() }}
                </span>
              </router-link>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <keep-alive>
      <router-view ref="routerView" />
    </keep-alive>

    <!-- ANCHOR img/anchors/footer.png -->
    <footer class="container-fluid" v-cloak>
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <b>Credits</b>: Most dictionary data from
            <a href="https://www.mdbg.net/chinese/dictionary?page=cedict"
              >CC-CEDICT</a
            >. Images made <a v-on:click="adminClick">possible</a> with
            <a href="https://source.unsplash.com/">Unsplash Source</a> and
            <a href="https://www.canva.com/photos/">Canva</a>, and
            <a href="https://pixabay.com/">Pixabay</a>. Small images are from
            <a href="https://image.so.com/">360 Photo Search</a>. Character
            component breakdown and stroke animation made possible by
            <a href="https://github.com/skishore/makemeahanzi"
              >Make Me a Hanzi</a
            >. Example sentences and translation from
            <a href="http://www.jukuu.com/">Jukuu</a>. Related words,
            collocations, example sentences and common mistakes provided by
            <a href="https://www.sketchengine.eu/">Sketch Engine</a>. Pinyin
            annotation with
            <a href="https://longjiang.github.io/annotator-js/">Annotator.js</a
            >, which we created ourselves based on the
            <a href="https://www.mdbg.net/chinese/dictionary?page=cedict"
              >CC-CEDICT</a
            >
            dictionary made freely available from
            <a href="https://www.mdbg.net/chinese/dictionary?page=cedict"
              >MDBG</a
            >. Over 7,000 time-synced lyrics (LRCs) from
            <a href="http://www.22lrc.com/" class="add-pinyin">爱歌词</a> and
            <a href="http://www.gecimi.com/" class="add-pinyin">歌词迷</a>.
            <hr />
            <a href="https://www.chinesezerotohero.com">
              <img src="img/logo-mark.png" class="logo-footer" alt />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import $ from 'jquery'
import Helper from '@/lib/helper'
import HSK from '@/lib/hsk'
import Search from '@/components/Search.vue'

// eslint-disable-next-line no-unused-vars

export default {
  components: {
    Search
  },
  data: function() {
    return {
      wordList: HSK.listWhere(function(word) {
        word.oofc === ''
      }),
      Helper,
      compare: false,
      compareHrefFunc: compareEntry => {
        const entry =
          this.$root.$children[0].$refs.search.entry ||
          this.$root.$children[0].$refs.routerView.entry
        return `#/compare/cedict/${entry.identifier},${compareEntry.identifier}`
      }
    }
  },
  methods: {
    adminClick() {
      if (this.$refs.entry) {
        this.$refs.entry.admin = true
      }
    },
    compareClick() {
      this.compare = this.compare ? false : true
    },
    toggleCollapsed(e) {
      $(e.target)
        .next('ul')
        .toggleClass('collapsed')
    },
    savedWordsCount() {
      let count = this.$store.getters.savedWordCount()
      // eslint-disable-next-line vue/no-parsing-error
      return count < 100 ? count : '多'
    }
  },
  mounted() {
    window.entry = undefined
    window.hskDictionaryApp = this
    Helper.loaderMessage('HSK Dictionary Vue app mounted.')
  }
}
</script>

<style></style>
