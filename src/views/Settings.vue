<template>
  <div class="main mt-4 mb-5" v-cloak>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="page-title mb-4">
            Settings
          </h1>
          <div class="jumbotron p-4 bg-warning text-dark">
            Settings are <b>automatically saved</b> as soon as you make the
            change.
          </div>
          <h4>1. Pinyin Annotation Settings</h4>
          <p>
            Set how pinyin-annotated text is displayed throughtout the site.
          </p>
          <div class="mt-3">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="show-pinyin"
                v-model="showPinyin"
              />
              <label for="show-pinyin">Always show pinyin</label>
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="show-definition"
                v-model="showDefinition"
              />
              <label for="show-definition">Always show definition</label>
            </div>
            <div class="form-check">
              <input
                type="radio"
                id="use-traditional"
                class="form-check-input"
                v-model="useTraditional"
                value="true"
              />
              <label for="use-traditional"
                >Use Traditional (正體字/繁體字)</label
              >
            </div>
            <div class="form-check">
              <input
                type="radio"
                id="use-simplified"
                class="form-check-input"
                v-model="useTraditional"
                value="false"
              />
              <label for="use-simplified">Use Simplified (简体字)</label>
            </div>
          </div>
          <div class="jumbotron text-center mt-4 p-4">
            <p>
              <b>Testing area:</b> Pinyin annotation will look like this
              throughout the site. Hover over the word blocks below, and adjust
              the settings as desired.
            </p>
            <hr />
            <Annotate tag="div" class="mt-4 mb-4 text-left">
              <h4>神奇的丝瓜</h4>
              <p>《标准教程 HSK 6》第18课课文</p>
              <p>
                春天，孩子们在楼旁空地上开出一个小小的花园，随即种上了一棵树、几株花和几粒丝瓜种子。土壤不是很肥沃，但有水的滋润，阳光的照耀，没几天，丝瓜就从土里冒了出来，接着我惊讶地发现，它好像每时每刻都在长大。看着丝瓜，我心中难免不解:古人是怎么想的，愣是编出个拔苗助长的故事来？要是我，宁愿用别的比喻。
              </p>
            </Annotate>
          </div>
          <div>
            <h4>2. Text Corpus Settings</h4>
            <p>
              A
              <a
                href="https://en.wikipedia.org/wiki/Text_corpus"
                target="_blank"
                >text corpus</a
              >
              is a large collection of text written in a language, where we can
              extract collocations and example sentences.
              <a href="https://www.sketchengine.eu/">Sketch Engine</a>, our text
              corpra provider, has a number of Chinese text corpra to select
              from. Depending on the corpus you choose, the example sentences
              and collocations you see will be different.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <CorpusSelect />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="jumbotron mt-5 p-4 bg-warning text-dark">
            Settings are <b>automatically saved</b> as soon as you make the
            change.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CorpusSelect from '@/components/CorpusSelect'

export default {
  components: {
    CorpusSelect
  },
  data() {
    return {
      showDefinition: localStorage.getItem('czhShowDefinition') === 'true',
      showPinyin:
        localStorage.getItem('czhHidePinyinExceptSaved') === 'true'
          ? false
          : true,
      useTraditional: localStorage.getItem('czhUseTraditional') === 'true'
    }
  },
  watch: {
    showDefinition() {
      localStorage.setItem('czhShowDefinition', this.showDefinition)
      this.$parent.showDefinition = this.showDefinition
    },
    showPinyin() {
      localStorage.setItem('czhHidePinyinExceptSaved', !this.showPinyin)
      this.$parent.hidePinyinExceptSaved = !this.showPinyin
    },
    useTraditional() {
      localStorage.setItem('czhUseTraditional', this.useTraditional === 'true')
      this.$parent.useTraditional = this.useTraditional === 'true'
    }
  }
}
</script>
