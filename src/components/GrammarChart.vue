<template>
  <div>
    <div class="text-center">
      <Loader />
    </div>
    <div
      class="input-group w-50 mb-5"
      v-if="grammar && grammar.length > 0"
      v-cloak
    >
      <input
        v-model="search"
        type="text"
        class="form-control lookup"
        placeholder="Filter by keywords"
      />
      <div class="input-group-append">
        <button class="btn btn-danger lookup-button" type="button">
          <i class="glyphicon glyphicon-filter"></i> Filter
        </button>
      </div>
    </div>
    <table
      v-if="grammar && grammar.length > 0"
      class="table table-responsive grammar-table"
    >
      <thead>
        <tr>
          <th class="text-center">Lesson</th>
          <th>Structure</th>
          <th>English</th>
          <th>Example</th>
          <th>Example Translation</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in grammar"
          :class="{
            hidden: !(
              !search ||
              row.structure.includes(search) ||
              row.english.includes(search)
            )
          }"
        >
          <td class="text-center align-middle">
            <span
              ><a
                :href="`${row.url}`"
                class="btn btn-secondary"
                style="white-space: nowrap;"
                ><i class="glyphicon glyphicon-facetime-video"></i>
                {{ row.code }}</a
              >
            </span>
          </td>
          <td class="align-middle">
            <PinyinButton /><span
              v-html="
                Helper.highlightMultiple(row.structure, row.words, row.book)
              "
            ></span>
          </td>
          <td class="align-middle">
            <span>{{ row.english }}</span>
          </td>
          <td class="align-middle">
            <PinyinButton /><span
              v-html="
                Helper.highlightMultiple(row.example, row.words, row.book)
              "
            ></span>
          </td>
          <td class="align-middle">
            <span>{{ row.exampleTranslation }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
export default {
  data() {
    return {
      Helper,
      search: '',
      grammar: []
    }
  },
  created() {
    Helper.loaded(
      (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
        let grammar = []
        loadedGrammar._grammarData.map(row => {
          LoadedHSKCEDICT.matchChinese(
            matches => {
              row.words = matches
              grammar.push(row)
              if (grammar.length === loadedGrammar._grammarData.length) {
                this.grammar = grammar // prevent constant refreshing of the table.
              }
            },
            [row.structure]
          )
        })
      }
    )
  }
}
</script>

<style>
.grammar-table {
  color: #666;
}

.grammar-table [data-hsk] {
  font-weight: bold;
}
</style>
