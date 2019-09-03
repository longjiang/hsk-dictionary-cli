<template>
  <div class="container main pt-5 pb-5" id="book-chapter">
    <div class="row mb-5">
      <div class="col-sm-12">
        <SimpleSearch
          placeholder="Enter the URL of a book chapter from a variety of eBook websites"
          :action="
            url => {
              location.hash = '#/book/chapter/' + encodeURIComponent(url)
            }
          "
          ref="search"
        />
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
          <Annotate
            tag="a"
            v-for="chapter in chapters"
            :class="{
              'list-group-item': true,
              'link-unstyled': true,
              active:
                location.hash ===
                `#/book/chapter/${encodeURIComponent(chapter.url)}`
            }"
            :href="`#/book/chapter/${encodeURIComponent(chapter.url)}`"
            >{{ chapter.title }}</Annotate
          >
        </div>
      </div>
      <div class="col-md-8" :key="'chapter-' + chapterTitle">
        <Annotate tag="h1">{{ chapterTitle }}</Annotate>
        <div class="chapter-content">
          <Annotate
            v-for="line of chapterContent
              .trim()
              .replace(/<(div|p|li|h1|h2|h3|h4|h5|h6)/g, '\n<$1')
              .split('\n')"
            v-if="line.trim().length > 0"
          >
            <div v-html="line.trim()"></div>
          </Annotate>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from '@/lib/config'
import Library from '@/lib/library'
import SimpleSearch from '@/components/SimpleSearch'

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
    SimpleSearch
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
      $('#book-chapter')[0].scrollIntoView()
      let url = decodeURIComponent(this.args)
      this.$refs.search.text = url
      let chapter = await Library.getChapter(url)
      this.bookThumbnail = chapter.book.thumbnail
      this.bookTitle = chapter.book.title
      this.bookAuthor = chapter.book.author
      this.chapters = chapter.book.chapters
      this.chapterTitle = chapter.title
      this.chapterContent = chapter.content
    }
  },
  async mounted() {
    this.updateURL()
  }
}
</script>

<style></style>
