<template>
  <div class="container main pt-5 pb-5" id="library-browse">
    <h1 class="mb-5">Book List</h1>
    <SimpleSearch
      placeholder="Enter the URL of a book list from a variety of eBook websites"
      :action="
        url => {
          location.hash = '#/book/list/' + encodeURIComponent(url)
        }
      "
      ref="search"
      class="mb-5"
    />
    <ul class="list-unstyled booklist">
      <li v-for="book in booklist" class="booklist-item text-center">
        <a :href="`#/book/index/${encodeURIComponent(book.url)}`" class="link-unstyled"
          >
          <img
            :src="
              book.thumbnail
                ? `${Config.imageProxy}?${book.thumbnail}`
                : `/img/book-thumb-${Math.floor(Math.random() * 10)}.jpg`
            "
            alt="Book cover"
            class="mb-4 shadow book-thumb"
          />
          <div>{{ book.title }}</div></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import Config from '@/lib/config'
import Library from '@/lib/library'
import SimpleSearch from '@/components/SimpleSearch'

export default {
  props: {
    args: {
      type: String
    },
    method: {
      type: String
    }
  },
  components: {
    SimpleSearch
  },
  data() {
    return {
      Config,
      location,
      booklist: []
    }
  },
  watch: {
    args() {
      this.updateURL()
    }
  },
  methods: {
    async updateURL() {
      $('#library-browse')[0].scrollIntoView()
      let url = decodeURIComponent(this.args)
      this.$refs.search.text = url
      this.booklist = []
      this.booklist = await Library.getBooklist(url)
    }
  },
  async mounted() {
    if (this.method === 'browse') {
      this.updateURL()
    }
  }
}
</script>

<style lang="scss">
.booklist {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.booklist-item {
  flex: 1;
  min-width: 10rem;
  margin: 1rem;
  border-radius: 0.3rem;
}
.booklist-item-thumb {
  width: 5rem;
  height: calc(5rem * 1.33);
  display: inline-block;
}
</style>
