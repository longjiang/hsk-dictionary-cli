<template>
  <div class="main container mt-4 mb-4" v-cloak>
    <div class="row">
      <div class="col-sm-12">
        <h4>My Words</h4>
        <p>
          These words are stored in your browser's local storage, which persists
          unless you clear your browsing data.
        </p>
        <hr />
        <div class="my-words-tools mt1 mb1 text-right">
          <button
            class="upload-list btn btn-primary"
            v-on:click="showImportClick"
          >
            <i class="glyphicon glyphicon-cloud-upload"></i> Import</button
          >&nbsp;
          <button
            class="upload-list btn btn-primary"
            v-on:click="showExportClick"
          >
            <i class="glyphicon glyphicon-cloud-download"></i> Export CSV</button
          >&nbsp;
          <button class="remove-all btn btn-danger" v-on:click="removeAllClick">
            <i class="glyphicon glyphicon-trash"></i>
            Clear
          </button>
          <div class="import-wrapper hidden">
            <textarea
              id="import-textarea"
              class="mt1 mb1 form-control"
              cols="30"
              rows="10"
              placeholder="Paste your list or text here to add all words to your 'saved words'"
            ></textarea>
            <button class="btn btn-success btn-block" v-on:click="importClick">
              Import
            </button>
          </div>
          <div class="export-wrapper hidden text-left mt-4">
            <p>
              <b>Copy</b> the text below and <b>paste</b> into your spreadsheet
              program, or a flashcard app like Anki or Quizlet.
            </p>
            <h5>Full CSV</h5>
            <textarea
              id="export-textarea"
              class="mt1 mb1 form-control"
              cols="30"
              rows="10"
            ></textarea>
            <h5 class="mt-4">Simple CSV (for Quizlet)</h5>
            <textarea
              id="export-simple-textarea"
              class="mt1 mb1 form-control"
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <!-- .row -->
    <div class="row">
      <div class="col-sm-12">
        <p
          v-if="savedWords.length === 0"
          class="alert alert-warning no-saved-words"
        >
          You don't have any words saved yet. Save words by clicking on the
          <i class="glyphicon glyphicon-star-empty"></i> icon next to it.
        </p>
        <ul class="saved-words">
          <li
            class="saved-words-item character-example"
            v-for="word in savedWordsAugmented()"
          >
            <Star :word="word"></Star>
            <a :href="`#/view/cedict/${word.traditional},${word.pinyin}`">
              <span class="character-example-word" :data-hsk="word.book">{{
                word.simplified
              }}</span
              >&nbsp;
              <span class="character-example-pinyin">{{ word.pinyin }}</span
              >&nbsp;
              <span class="character-example-english">{{
                word.definitions[0].text
              }}</span></a
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- .row -->
    <learn ref="learn" v-if="savedWords.length > 0"></learn>
  </div>
  <!-- .container -->
</template>

<script>
import $ from 'jquery'
import Learn from '@/views/Learn.vue'
import HSK from '@/lib/hsk'
import CEDICT from '@/lib/cedict'
import Normalizer from '@/lib/normalizer'
import AnnotatorService from '@/vendor/annotator-js/js/annotator-service'

export default {
  template: '#saved-words-template',
  components: {
    Learn
  },
  data() {
    return {
      CEDICT,
      HSK,
      Normalizer,
      savedWords: this.$store.state.savedWords
    }
  },
  methods: {
    savedWordsAugmented() {
      return this.$store.state.savedWords.map(function([traditional, pinyin]) {
        return Normalizer.normalize(CEDICT.get(traditional, pinyin))
      })
    },
    csv() {
      let SavedWordsVue = this
      return (
        'Simplified\tTraditional\tPinyin\tDefinitions\tMeasure Words\n' +
        SavedWordsVue.savedWords
          .map(function(word) {
            word = Normalizer.get(...word)
            const definitions = word.definitions.map(function(definition) {
              return definition.text
            })
            const measureWords =
              word.measureWords && word.measureWords.length > 0
                ? word.measureWords
                    .map(function(measureWord) {
                      return `${
                        measureWord.simplified
                      } (${measureWord.traditional}, ${measureWord.pinyin})`
                    })
                    .join(', ')
                : ''
            return `${
              word.simplified
            }\t${word.traditional}\t${word.pinyin}\t${definitions.join(', ')}\t${measureWords}`
          })
          .join('\n')
      )
    },
    csvSimple() {
      return this.$store.state.savedWords
        .map(function(word) {
          word = Normalizer.get(...word)
          const definitions = word.definitions.map(function(definition) {
            return definition.text
          })
          return `${word.simplified}\t${definitions.join(', ')}`
        })
        .join('\n')
    },
    showImportClick() {
      $('.import-wrapper').toggleClass('hidden')
    },
    showExportClick() {
      $('#export-textarea').val(this.csv())
      $('#export-simple-textarea').val(this.csvSimple())
      $('.export-wrapper').toggleClass('hidden')
    },
    removeAllClick() {
      const confirmed = confirm(
        'Are you sure you want to remove all your saved words?'
      )
      if (confirmed) {
        this.$store.dispatch('removeAllSavedWords')
      }
    },
    importClick() {
      const lines = $('#import-textarea')
        .val()
        .split('\n')
      // eslint-disable-next-line no-undef
      for (let line of lines) {
        AnnotatorService.annotate(line, annotated => {
          for (let candidates of annotated) {
            for (let candidate of candidates) {
              if (candidate.pinyin) {
                this.$store.dispatch('addSavedWord', {
                  traditional: candidate.traditional,
                  pinyin: candidate.pinyin
                })
              }
            }
          }
        })
      }
      $('.import-wrapper').addClass('hidden')
    }
  }
}
</script>
