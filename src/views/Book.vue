<template>
  <div class="container main mt-5 mb-5">
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
      </div>
      <div class="col-md-8" :key="'chapter-' + chapterTitle">
        <Annotate tag="h1">{{ chapterTitle }}</Annotate>
        <Annotate>
          <div class="book-chapter" v-html="content"></div>
        </Annotate>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import Config from '@/lib/config'
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
      bookTitle: '',
      bookThumbnail: undefined,
      chapterTitle: '',
      bookAuthor: '',
      content: ''
    }
  },
  watch: {
    args() {
      $('#chinesezerotohero')[0].scrollIntoView()
      this.getBook()
      this.getChapter()
      this.$refs.search.url = decodeURIComponent(this.args)
    }
  },
  methods: {
    async getBook() {
      let $bookHTML = await Helper.scrape2(
        decodeURIComponent(this.args).replace(/[^/]*$/, '')
      )
      this.bookTitle = $bookHTML
        .find('.book-describe h1')
        .text()
        .trim()
      this.bookAuthor = $bookHTML
        .find('.book-describe h1 + p')
        .text()
        .trim()
        .replace('作者：', '')
      this.bookThumbnail = $bookHTML.find('.book-img img').attr('src')
    },
    async getChapter() {
      let $chapterHTML = await Helper.scrape2(decodeURIComponent(this.args))
      this.chapterTitle = $chapterHTML
        .find('#nr_title')
        .text()
        .trim()
      this.content = $chapterHTML.find('#nr1').html()
    }
  },
  async mounted() {
    if (this.method === 'view') {
      this.$refs.search.url = decodeURIComponent(this.args)
      this.getBook()
      this.getChapter()
    }
  }
}
</script>

<style></style>
