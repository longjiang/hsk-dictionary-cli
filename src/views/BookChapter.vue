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
        <a
          :href="`#/book/index/${encodeURIComponent(bookURL)}`"
          class="link-unstyled"
        >
          <img
            :src="
              bookThumbnail
                ? `${Config.imageProxy}?${bookThumbnail}`
                : `/img/book-thumb-${Math.floor(Math.random() * 10)}.jpg`
            "
            alt="Book cover"
            class="mb-4 shadow book-thumb"
          />
          <Annotate v-if="bookTitle">
            <h6>《{{ bookTitle }}》</h6>
            <p>{{ bookAuthor }}</p>
          </Annotate>
        </a>
        <div class="bg-light p-4 mb-3 rounded">
          <a :href="args" class="link-unstyled" target="_blank">
            Read the original on
            <img
              class="logo-small ml-2"
              :src="Library.source(args).logo"
              :alt="Library.source(args).name"
            />
          </a>
        </div>
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
      <div class="col-md-8" :key="'chapter-' + encodeURIComponent(chapterTitle)">
        <Annotate tag="h1">{{ chapterTitle }}</Annotate>
        <div class="chapter-content">
          <Annotate
            tag="div"
            v-for="line of chapterContent
              .trim()
              .replace(/<(div|p|li|h1|h2|h3|h4|h5|h6)/g, '\n<$1')
              .split('\n')"
            v-if="line.trim().length > 0"
            :speak="true"
            :copy="true"
          >
            <div v-html="line.trim()" />
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
      Library,
      bookThumbnail: undefined,
      bookTitle: '',
      bookAuthor: '',
      bookURL: '',
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
      this.chapterTitle = ''
      this.chapterContent = ''
      let chapter = await Library.getChapter(url)
      this.bookThumbnail = chapter.book.thumbnail
      this.bookTitle = chapter.book.title
      this.bookAuthor = chapter.book.author
      this.bookURL = chapter.book.url
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
