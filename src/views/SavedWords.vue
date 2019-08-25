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
            :disabled="this.savedWords.length <= 0"
          >
            <i class="glyphicon glyphicon-cloud-download"></i> Export CSV</button
          >&nbsp;
          <button 
            class="remove-all btn btn-danger" 
            v-on:click="removeAllClick"
            :disabled="this.savedWords.length <= 0"
          >
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
            <b-form-group label="Inlcude:">
              <b-form-checkbox-group
                v-model="selectedCsvOptions"
                :options="csvOptions"
              ></b-form-checkbox-group>
            </b-form-group>
            <h5>Full CSV</h5>
            <textarea
              id="export-textarea"
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
          v-if="loaded && savedWords.length <= 0"
          class="alert alert-warning no-saved-words"
        >
          You don't have any words saved yet. Save words by clicking on the
          <i class="glyphicon glyphicon-star-empty"></i> icon next to it.
        </p>
        <div>
          <Loader />
          <WordList :words="savedWords"></WordList>
          <a
            v-if="savedWordIds.length > 0"
            class="btn btn-warning mt-4 mb-5"
            :href="`#/learn/saved`"
          >
            <i class="glyphicon glyphicon-blackboard"></i> Learn These Words
          </a>
        </div>
      </div>
    </div>
    <!-- .row -->
  </div>
  <!-- .container -->
</template>

<script>
import $ from 'jquery'
import WordList from '@/components/WordList.vue'
import Helper from '@/lib/helper'
import { mapState } from 'vuex'

export default {
  template: '#saved-words-template',
  components: {
    WordList
  },
  data() {
    return {
      loaded: false,
      savedWords: [],
      selectedCsvOptions: ['simplified', 'traditional', 'pinyin', 'definitions', 'measureWords'],
      csvOptions: [
          { text: 'Simplified', value: 'simplified' },
          { text: 'Traditional', value: 'traditional' },
          { text: 'Pinyin', value: 'pinyin' },
          { text: 'Definitions', value: 'definitions' },
          { text: 'Measure Words', value: 'measureWords' }
      ]
    }
  },
  computed: mapState({
    savedWordIds: state => state.savedWords
  }),
  watch: {
    savedWordIds() {
      this.updateWords()
    },
    selectedCsvOptions() {
      $('#export-textarea').val(this.csv());
    },
  },
  mounted() {
    this.updateWords();
  },
  methods: {
    updateWords() {
      this.savedWords = [];

      Helper.loaded(
        (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
          this.loaded = true;
          this.savedWordIds.forEach((word) => {
            const identifier = word.join(',').replace(/ /g, '_');
            LoadedHSKCEDICT.getByIdentifier(
              entry => this.savedWords.push(entry),
              [identifier],
            );
          });
        }
      );
    },
    csv() {
      if (this.savedWords.length <= 0) {
        return '';
      }

      return (
        this.savedWords.map((word) => {
          let textToDisplay = '';

          if (this.selectedCsvOptions.includes('simplified')) {
            textToDisplay += `${word.simplified}\t`;
          }  
          
          if (this.selectedCsvOptions.includes('traditional')) {
            textToDisplay += `${word.traditional}\t`;
          }    
          
          if (this.selectedCsvOptions.includes('pinyin')) {
            textToDisplay += `${word.pinyin}\t`;
          }       
          
          if (this.selectedCsvOptions.includes('definitions')) {
            const definitions = word.definitions.map(function(definition) {
              return definition.text
            }).join(', ');

            textToDisplay += `${definitions}\t`;
          }

          if (this.selectedCsvOptions.includes('measureWords')) {
            const hasMeasureWords = word.measureWords && word.measureWords.length > 0;
            let measureWords = '';
            
            if (hasMeasureWords) {
              measureWords = word.measureWords.map((measureWord) => {
                return `${measureWord.simplified} (${measureWord.traditional}, ${measureWord.pinyin})`
              }).join(', ');
            }

            textToDisplay += `${measureWords}\t`
          }

          return textToDisplay;
        }).join('\n')
      );
    },
    showImportClick() {
      $('.import-wrapper').toggleClass('hidden')
    },
    showExportClick() {
      $('#export-textarea').val(this.csv())
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
        Helper.loaded(
          (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
            LoadedAnnotator.annotateText(line, annotated => {
              for (let candidates of annotated) {
                for (let candidate of candidates) {
                  if (candidate.pinyin) {
                    this.$store.dispatch('addSavedWord', candidate.identifier);
                  }
                }
              }
            })
          }
        )
      }
      $('.import-wrapper').addClass('hidden')
    }
  }
}
</script>
