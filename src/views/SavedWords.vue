<template>
  <div class="main container mt-4 mb-4" :key="savedWordsKey" v-cloak>
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
            <i class="glyphicon glyphicon-cloud-upload"></i> Import
          </button>
          <button
            class="upload-list btn btn-primary"
            v-on:click="showExportClick"
          >
            <i class="glyphicon glyphicon-cloud-download"></i> Export CSV
          </button>
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
        <ul class="saved-words">
          <li
            class="saved-words-item character-example"
            v-for="word in HSK.getByIds(SavedHSKWords.getIdsSorted())"
          >
            <button
              class="saved-words-item-remove"
              v-on:click="SavedWords.removeWordClick"
              data-method="hsk"
              :data-args="JSON.stringify([word.id])"
              title="Remove word"
            >
              <i
                class="glyphicon glyphicon-minus-sign"
                v-if="SavedHSKWords.getIds().includes(word.id)"
              ></i>
            </button>
            <a :href="'#/view/hsk/' + word.id">
              <span class="character-example-word" :data-hsk="word.book">{{
                word.word
              }}</span>
              <span class="character-example-pinyin">{{ word.pinyin }}</span>
              <span class="character-example-english">{{ word.english }}</span>
            </a>
          </li>
          <li
            class="saved-words-item character-example"
            v-for="word in CEDICT.getByList(SavedCEDICTWords.list())"
          >
            <button
              class="saved-words-item-remove"
              v-on:click="SavedWords.removeWordClick"
              data-method="cedict"
              :data-args="JSON.stringify([word.traditional, word.pinyin])"
              title="Remove word"
            >
              <i
                class="glyphicon glyphicon-minus-sign"
                v-if="SavedCEDICTWords.includes(word.traditional, word.pinyin)"
              ></i>
            </button>
            <a :href="`#/view/cedict/${word.traditional},${word.pinyin}`">
              <span class="character-example-word" data-hsk="outside">{{
                word.simplified
              }}</span>
              <span class="character-example-pinyin">{{ word.pinyin }}</span>
              <span class="character-example-english">{{
                word.definitions[0].text
              }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- .row -->
    <learn ref="learn"></learn>
  </div>
  <!-- .container -->
</template>

<script>
import $ from 'jquery'
import Learn from '@/views/Learn.vue'
import SavedWords from '@/lib/saved-words'
import SavedHSKWords from '@/lib/saved-hsk-words'
import SavedCEDICTWords from '@/lib/saved-cedict-words'
import HSK from '@/lib/hsk'
import CEDICT from '@/lib/cedict'

export default {
  template: '#saved-words-template',
  components: {
    Learn
  },
  data() {
    return {
      CEDICT,
      HSK,
      SavedWords,
      SavedCEDICTWords,
      SavedHSKWords,
      savedWordsKey: 0 // used to force re-render this component
    }
  },
  methods: {
    csv() {
      let SavedWords = this
      return (
        'Simplified\tTraditional\tPinyin\tDefinitions\tMeasure Words\n' +
        SavedWords.list()
          .map(function(word) {
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
      return this.list()
        .map(function(word) {
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
        SavedHSKWords.removeAll()
        SavedCEDICTWords.removeAll()
      }
      this.updateSavedWordsDisplay()
      this.savedWordsKey += 1 // force re-render this component
    },
    importClick() {
      const lines = $('#import-textarea')
        .val()
        .split('\n')
      // eslint-disable-next-line no-undef
      const annotatorService = AnnotatorService(CEDICT)
      for (let line of lines) {
        annotatorService.annotate(line, function(annotated) {
          for (let candidates of annotated) {
            for (let candidate of candidates) {
              if (candidate.pinyin) {
                const hskCandidates = HSK.lookup(
                  candidate.simplified,
                  candidate.pinyin.replace(/ /g, '')
                )
                if (hskCandidates.length > 0) {
                  SavedHSKWords.add(hskCandidates[0].id)
                } else {
                  SavedCEDICTWords.add(candidate.traditional, candidate.pinyin)
                }
              }
            }
          }
        })
      }
      $('.import-wrapper').addClass('hidden')
      this.updateSavedWordsDisplay()
      this.savedWordsKey += 1 // force re-render this component
    }
  }
}
</script>
