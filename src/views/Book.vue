<template>
  <div class="container main pt-5 pb-5" id="book-view">
    <div class="row mb-5">
      <div class="col-sm-12">
        <BookNav ref="search" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 text-center" :key="'book-' + bookTitle">
        <img
          v-if="bookThumbnail"
          :src="`${Config.imageProxy}?${bookThumbnail}`"
          alt="Book cover"
          class="mb-4"
        />
        <Annotate v-if="bookTitle">
          <h6>《{{ bookTitle }}》</h6>
          <p>{{ bookAuthor }}</p>
        </Annotate>
        <div class="list-group text-left">
          <a
            v-for="chapter in chapters"
            :class="{
              'list-group-item': true,
              active:
                location.hash ===
                `#/book/view/${encodeURIComponent(chapter.url)}`
            }"
            :href="`#/book/view/${encodeURIComponent(chapter.url)}`"
            >{{ chapter.title }}</a
          >
        </div>
      </div>
      <div class="col-md-8" :key="'chapter-' + chapterTitle">
        <Annotate tag="h1">{{ chapterTitle }}</Annotate>
        <Annotate>
          <div class="book-chapter" v-html="chapterContent"></div>
        </Annotate>
      </div>
    </div>
  </div>
</template>

<script>
import Config from '@/lib/config'
import Library from '@/lib/library'
import BookNav from '@/components/BookNav'

export default {
  props: {
    method: {
      type: String
    },
    args: {
      type: String
    }
  },
  components: {
    BookNav
  },
  data() {
    return {
      Config,
      bookThumbnail: undefined,
      bookTitle: '',
      bookAuthor: '',
      chapters: [],
      chapterTitle: '',
      chapterContent: '',
      location
    }
  },
  watch: {
    args() {
      this.updateURL()
    }
  },
  methods: {
    async updateURL() {
      $('#book-view')[0].scrollIntoView()
      let url = decodeURIComponent(this.args)
      this.$refs.search.url = url
      let chapter = await Library.getChapter(url)
      this.bookThumbnail = chapter.book.thumbnail
      this.bookTitle = chapter.book.title
      this.bookAuthor = chapter.book.author
      this.chapters = chapter.book.chapters
      this.chapterTitle = chapter.title
      this.chapterContent = chapter.content
    },
  },
  async mounted() {
    if (this.method === 'view') {
      this.updateURL()
    }
  }
}
</script>

<style></style>
