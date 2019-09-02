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
      chapters: [],
      bookThumbnail: undefined,
      chapterTitle: '',
      bookAuthor: '',
      content: '',
      location
    }
  },
  watch: {
    args() {
      $('#book-view')[0].scrollIntoView()
      this.getBook()
      this.getChapter()
      this.$refs.search.url = decodeURIComponent(this.args)
    }
  },
  methods: {
    async getBook() {
      this.chapters = []
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
      for (let a of $bookHTML.find('.book-list a')) {
        this.chapters.push({
          title: $(a).attr('title'),
          url: $(a).attr('href')
        })
      }
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
