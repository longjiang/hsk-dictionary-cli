<template>
  <div
    id="chinesezerotohero"
    :class="{
      'hide-except-focus': focus,
      'show-pinyin': !hidePinyinExceptSaved,
      'show-pinyin-for-saved': hidePinyinExceptSaved,
      'show-simplified': !useTraditional,
      'show-traditional': useTraditional,
      'show-definition': showDefinition
    }"
  >
    <!-- ANCHOR img/anchors/top-bar.png -->
    <!-- To highlight ANCHORS in the Visual Studio Code editor, download the "comment anchors" extension by Exodius Studios  -->
    <!-- To see image previews, download the "image preview" extension from Kiss Tamás  -->
    <!-- To paste images from clipboard directly, download the "Paste Image" extension from mushan -->
    <div class="container-fluid top-bar pt-3">
      <div class="container">
        <div class="col-sm-12 text-md-center">
          <router-link to="/">
            <img src="img/logo-zh-zth-light.png" class="logo" />
          </router-link>
          <a
            class="btn btn-danger btn-sign-in"
            href="https://sso.teachable.com/secure/133035/users/sign_in"
            >Login to <img src="/img/teachable_light.png" class="logo-small"
          /></a>
        </div>
      </div>
      <div class="row mt-3" v-cloak>
        <div class="col-sm-12">
          <Nav />
        </div>
      </div>
    </div>
    <SubNav class="pt-4" />

    <keep-alive>
      <router-view ref="routerView" />
    </keep-alive>

    <!-- ANCHOR img/anchors/footer.png -->
    <footer class="container-fluid focus" v-cloak>
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <LanguageLogos />
            <hr class="border-light" style="opacity: 0.5" />
            <p>
              <b>Zero to Hero Education, Canada.</b>
            </p>

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
            >. Korean hanja readings and definitions uses
            <a href="https://github.com/dbravender/hanja-dictionary"
              >hanja-dictionary</a
            >. Over 7,000 time-synced lyrics (LRCs) from
            <a href="http://www.22lrc.com/" class="add-pinyin">爱歌词</a> and
            <a href="http://www.gecimi.com/" class="add-pinyin">歌词迷</a>.
            <button @click="toggleFocus" class="btn btn-small focus-hover">
              Turn {{ focus ? 'off' : 'on' }} Focus Mode
            </button>
            <hr class="border-light" style="opacity: 0.5" />
            <p>
              Interesetd in contributing and making the tools available even
              better? This site is a fully open sourced and available to be
              viewed at
              <a
                href="https://github.com/longjiang/hsk-dictionary-cli"
                target="_blank"
                >this github reprository.</a
              >
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import $ from 'jquery'
import Helper from '@/lib/helper'
import Annotator from '@/lib/annotator'
import Hanzi from '@/lib/hanzi'
import Grammar from '@/lib/grammar'
import Unihan from '@/lib/unihan'
import Nav from '@/components/Nav'
import SubNav from '@/components/SubNav'
import LanguageLogos from '@/components/LanguageLogos'
import Config from '@/lib/config'

// eslint-disable-next-line no-unused-vars

export default {
  components: {
    Nav,
    SubNav,
    LanguageLogos
  },
  data: function() {
    return {
      focus: false,
      loaded: false,
      showDefinition: localStorage.getItem('czhShowDefinition') === 'true',
      hidePinyinExceptSaved:
        localStorage.getItem('czhHidePinyinExceptSaved') === 'true',
      useTraditional: localStorage.getItem('czhUseTraditional') === 'true',
      Config
    }
  },
  methods: {
    toggleFocus() {
      this.focus = this.focus ? false : true
      if (this.focus) {
        $('#chinesezerotohero *').addClass('focus-off')
        $('.focus')
          .parents()
          .removeClass('focus-off')
        $('.focus, .focus *').removeClass('focus-off')
      } else {
        $('#chinesezerotohero *').removeClass('focus-off')
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
    toggleCollapsed(e) {
      $(e.target)
        .next('ul')
        .toggleClass('collapsed')
    }
  },
  beforeMount() {
    window.annotatorLoads = Annotator.load()
    window.hanziLoads = Hanzi.load()
    window.grammarLoads = Grammar.load()
    window.unihanLoads = Unihan.load()
  },
  mounted() {
    Helper.loaderMessage('HSK Dictionary Vue app mounted.')
    window.ChineseZeroToHeroApp = this

    Helper.loaded(
      (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
        this.loaded = true
      }
    )
  }
}
</script>

<style lang="scss">
.logo {
  height: 6rem;
}
.logo-footer {
  height: 4rem;
  margin-bottom: 1rem;
}
.top-bar {
  background-color: #3a3a3a;
  color: white;
}

footer {
  padding: 2rem 0;
  background: #3e3e3e;
  color: #ccc;
}

footer a {
  color: white;
}

footer a:hover {
  color: white;
}

.btn-sign-in {
  padding: 0 0.5rem;
  position: absolute;
  top: 0;
  right: 1rem;
  img {
    height: 1.2rem;
    margin-bottom: 0.2rem;
  }
}
</style>
