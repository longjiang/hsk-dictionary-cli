<template>
  <div class="container main mt-5 mb-5">
    <div class="row">
      <div class="col-md-4 text-center">
        <img
          v-if="bookThumbnail"
          :src="`${Config.imageProxy}?${bookThumbnail}`"
          alt="Book cover"
          class="mb-4"
        />
        <Annotate>
          <h6>《{{ bookTitle }}》</h6>
          <p>{{ bookAuthor }}</p>
        </Annotate>
      </div>
      <div class="col-md-8">
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

export default {
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
  async mounted() {
    let $bookHTML = await Helper.scrape2('https://www.luoxia.com/banshengyuan/')
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
    let $chapterHTML = await Helper.scrape2(
      'https://www.luoxia.com/banshengyuan/97799.htm'
    )
    this.chapterTitle = $chapterHTML
      .find('#nr_title')
      .text()
      .trim()
    this.content = $chapterHTML.find('#nr1').html()
  }
}
</script>

<style></style>
