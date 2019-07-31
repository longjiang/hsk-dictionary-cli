<template>
  <div class="container main mt-4 mb-4" v-cloak :key="browseKey">
    <div class="row">
      <div class="col-sm-12">
        <h4>Browse Words by Course</h4>
        <p>Each tiny square represents a word.</p>
        <hr />
      </div>
      <div class="col-sm-12">
        <ul class="books mt1">
          <li
            class="book"
            v-for="(book, bookIndex) in books"
            :data-book="bookIndex"
            v-bind:key="'book-' + bookIndex"
          >
            <div
              class="book-title collapsed"
              v-on:click="bookClick"
              :data-bg-hsk="bookIndex"
            >
              HSK {{ bookIndex }}
            </div>
            <ul class="lessons collapsed">
              <li
                class="lesson"
                v-for="(lesson, lessonIndex) in book"
                :data-lesson="lessonIndex"
                v-bind:key="'lesson-' + lessonIndex"
              >
                <div class="lesson-title collapsed" v-on:click="lessonClick">
                  Lesson {{ lessonIndex }}
                  <br />
                  <span
                    class="tile"
                    :data-bg-hsk="bookIndex"
                    v-for="i in countWordsInLesson(lesson)"
                    v-bind:key="'lesson-tile-' + i"
                  ></span>
                </div>
                <ul class="dialogs collapsed">
                  <li
                    class="dialog"
                    v-for="(dialog, dialogIndex) in lesson"
                    :data-dialog="dialogIndex"
                    v-bind:key="'dialog-' + dialogIndex"
                  >
                    <div
                      class="dialog-title collapsed"
                      v-on:click="dialogClick"
                    >
                      Part {{ dialogIndex }}
                      <br />
                      <span
                        class="tile"
                        :data-bg-hsk="bookIndex"
                        v-for="(i, dialogIndex) in dialog"
                        v-bind:key="'dialog-tile-' + dialogIndex"
                      ></span>
                    </div>
                    <ul class="browse-words collapsed">
                      <li
                        class="browse-words-item character-example"
                        v-for="word in dialog"
                        v-bind:key="'word-' + word.id"
                      >
                        <Star :word="word"></Star>
                        <a :href="'#/view/hsk/' + word.id">
                          <span
                            class="character-example-word"
                            :data-hsk="word.book"
                            >{{ word.word }}</span
                          >
                          <span class="character-example-pinyin">
                            {{ word.pinyin }}
                          </span>
                          <span class="character-example-english">
                            {{ word.english }}
                          </span>
                        </a>
                      </li>
                      <button
                        class="btn btn-small ml-2 add-all-button"
                        v-on:click="saveAllClick"
                      >
                        <i class="glyphicon glyphicon-star-empty"></i> Save All
                        in This Dialog
                      </button>
                      <a
                        class="btn btn-small ml-2 learn-all-button"
                        :data-bg-hsk="bookIndex"
                        :href="
                          `#/learn/hsk/${bookIndex},${lessonIndex},${dialogIndex}`
                        "
                      >
                        <i class="glyphicon glyphicon-blackboard"></i> Learn
                        These Words
                      </a>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import HSK from '@/lib/hsk'

export default {
  data() {
    return {
      books: HSK.compileBooks(),
      browseKey: 0, // used to force re-render this component
      savedWordsKey: 0
    }
  },
  mounted() {
    // mounted
  },
  methods: {
    saveAllClick: function(e) {
      $(e.target)
        .parents('.browse-words')
        .find('.add-word')
        .click()
    },
    countWordsInLesson(lesson) {
      var count = 0
      for (var index in lesson) {
        var dialog = lesson[index]
        count += dialog.length
      }
      return count
    },
    bookClick(e) {
      var book = $(e.target)
        .parents('[data-book]')
        .attr('data-book')
      this.wordList = HSK.listByBook(book)
      $(e.target)
        .toggleClass('collapsed')
        .next('ul')
        .toggleClass('collapsed')
    },
    lessonClick(e) {
      var $target = $(e.target)
      if (e.target.tagName.toLowerCase() !== 'div') {
        $target = $target.parent()
      }
      var lesson = $target.parents('[data-lesson]').attr('data-lesson')
      var book = $target.parents('[data-book]').attr('data-book')
      this.wordList = HSK.listByBookLesson(book, lesson)
      $target
        .toggleClass('collapsed')
        .next('ul')
        .toggleClass('collapsed')
    },
    dialogClick(e) {
      var $target = $(e.target)
      if (e.target.tagName.toLowerCase() !== 'div') {
        $target = $target.parent()
      }
      var dialog = $target.parents('[data-dialog]').attr('data-dialog')
      var lesson = $target.parents('[data-lesson]').attr('data-lesson')
      var book = $target.parents('[data-book]').attr('data-book')
      this.wordList = HSK.listBookLessonDialog(book, lesson, dialog)
      $target
        .toggleClass('collapsed')
        .next('ul')
        .toggleClass('collapsed')
    }
  }
}
</script>
