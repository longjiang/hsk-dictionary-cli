<template>
  <div
    id="hsk-dictionary"
    :class="{
      'hide-except-focus': focus,
      'show-pinyin': !hidePinyinExceptSaved,
      'show-pinyin-for-saved': hidePinyinExceptSaved,
      'show-simplified': !useTraditional,
      'show-traditional': useTraditional
    }"
  >
    <!-- ANCHOR img/anchors/top-bar.png -->
    <!-- To highlight ANCHORS in the Visual Studio Code editor, download the "comment anchors" extension by Exodius Studios  -->
    <!-- To see image previews, download the "image preview" extension from Kiss Tamás  -->
    <!-- To paste images from clipboard directly, download the "Paste Image" extension from mushan -->
    <div class="container-fluid top-bar pt-3">
      <div class="container">
        <div class="row mb-3">
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
              <Search ref="search" random="true"></Search>
              <Search
                :class="{ 'ml-2': true, hidden: !compare }"
                ref="compare"
                placeholder="Compare with..."
                :hrefFunc="compareHrefFunc"
              ></Search>
              <button class="btn btn-compare ml-2" @click="compareClick">
                <span v-if="compare"
                  ><i class="glyphicon glyphicon-remove-sign"></i></span
                ><span v-if="!compare"
                  ><i class="glyphicon glyphicon-adjust"></i> Compare</span
                >
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3" v-cloak>
        <div class="col-sm-12">
          <nav class="tabs text-center">
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
            <router-link class="tab" :to="{ name: 'explore' }" title="Explore">
              <i class="glyphicon glyphicon-sunglasses"></i> Explore
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
            <router-link
              class="tab tab-info"
              :to="{ name: 'settings' }"
              title="Settings"
            >
              <i class="glyphicon glyphicon-cog"></i> Settings
            </router-link>
          </nav>
        </div>
      </div>
    </div>
    <div v-if="$route.path.startsWith('/explore')" class="mt-4">
      <nav class="secondary-menu text-center">
        <router-link
          class="secondary-menu-item"
          :to="{ name: 'explore-roots' }"
        >
          <i class="glyphicon glyphicon-grain"></i>
          Roots
        </router-link>
        <router-link
          class="secondary-menu-item"
          :to="{ name: 'explore-related' }"
        >
          <i class="glyphicon glyphicon-fullscreen"></i>
          Related
        </router-link>
      </nav>
    </div>

    <keep-alive>
      <router-view ref="routerView" />
    </keep-alive>

    <!-- ANCHOR img/anchors/footer.png -->
    <footer class="container-fluid focus" v-cloak>
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
            <button @click="toggleFocus" class="btn btn-small">
              Turn {{ focus ? 'off' : 'on' }} Focus Mode
            </button>
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
import Search from '@/components/Search.vue'
import Annotator from '@/lib/annotator'
import Hanzi from '@/lib/hanzi'
import Grammar from '@/lib/grammar'

// eslint-disable-next-line no-unused-vars

export default {
  components: {
    Search
  },
  data: function() {
    return {
      focus: false,
      hidePinyinExceptSaved:
        localStorage.getItem('czhHidePinyinExceptSaved') === 'true',
      useTraditional: localStorage.getItem('czhUseTraditional') === 'true',
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
    toggleFocus() {
      this.focus = this.focus ? false : true
      if (this.focus) {
        $('.focus')
          .parents()
          .addClass('focus-on')
        $('.focus, .focus *').addClass('focus-on')
      } else {
        $('.focus-on').removeClass('focus-on')
      }
    },
    addAllPinyin() {
      $('.pinyin-button').click()
    },
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
  beforeMount() {
    window.annotatorLoads = Annotator.load()
    window.hanziLoads = Hanzi.load()
    window.grammarLoads = Grammar.load()
  },
  mounted() {
    Helper.loaderMessage('HSK Dictionary Vue app mounted.')
    window.entry = undefined
    window.hskDictionaryApp = this
  }
}
</script>

<style></style>
