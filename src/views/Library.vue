<template>
  <div class="youtube-browse container pt-5 pb-5 main">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="mb-5 text-center">Library</h1>
        <p class="text-center lead" style="margin-bottom: 5rem">
          This is where you can enjoy reading a variety of Chinese books with
          the help of pinyin annotation and dictionary tools.
        </p>
        <ul class="list-unstyled p-0 mb-5 booklists">
          <li v-for="booklist in booklists" class="text-center mb-5">
            <a
              class="link-unstyled"
              :href="`#/book/list/${encodeURIComponent(booklist.url)}`"
            >
              <img :src="`/img/books-${Math.floor(Math.random() * 10)}.png`" class="shadowed book-thumb mb-4" />
              <h5 class="mt-3">
                <b>{{ booklist.title }}</b>
              </h5>
              <p class="mb-0" style="color: #aaa">
                Source: {{ Library.source(booklist.url).name }}
              </p></a
            >
          </li>
        </ul>

        <h4 class="mt-5 mb-5 text-center">
          Read
          <em>any</em> book by pasting the URL
        </h4>

        <div class="jumbotron bg-light pt-4 pb-3 mt-3 mb-3">
          <SimpleSearch
            placeholder="Enter the URL of a book from one of the above sites"
            :action="
              url => {
                location.hash = '#/book/index/' + encodeURIComponent(url)
              }
            "
            class="mb-3"
            ref="search"
          />
          <p>
            We can work with these content providers. <b>Copy paste</b> URLs
            like the following into the above text box and enjoy reading!
          </p>
          <ul>
            <li>
              Wiki Source, example URL:
              <code>https://<b>zh.wikisource.org</b>/wiki/西遊記</code>
            </li>
            <li>
              Luoxia, example URL:
              <code>https://<b>www.luoxia.com</b>/banshengyuan/</code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Library from '@/lib/library'
import SimpleSearch from '@/components/SimpleSearch'

export default {
  components: {
    SimpleSearch
  },
  props: {
    args: {
      type: String
    }
  },
  data() {
    return {
      Library,
      location,
      booklists: [
        {
          title: 'Classics',
          url: 'https://zh.wikisource.org/wiki/Portal:%E5%85%B8%E7%B1%8D'
        },
        {
          title: 'Great Works of Literature',
          url: 'https://www.luoxia.com/jingdian/'
        },
        {
          title: 'Classical Novels',
          url: 'https://zh.wikisource.org/wiki/Portal:%E5%B0%8F%E8%AF%B4'
        },
        {
          title: 'Poetry',
          url: 'https://zh.wikisource.org/wiki/Portal:%E8%AF%97%E6%AD%8C'
        },
        {
          title: 'Prose',
          url: 'https://zh.wikisource.org/wiki/Portal:%E6%95%A3%E6%96%87'
        },
        {
          title: 'History',
          url: 'https://zh.wikisource.org/wiki/Portal:%E5%8F%B2%E6%9B%B8'
        },
        {
          title: 'Religion and Scripture',
          url: 'https://zh.wikisource.org/wiki/Portal:%E5%AE%97%E6%95%99'
        },
        {
          title: 'Romance',
          url: 'https://www.luoxia.com/yanqing/'
        },
        {
          title: 'Mystery',
          url: 'https://www.luoxia.com/xuanyi/'
        },
        {
          title: 'Film Original',
          url: 'https://www.luoxia.com/yuanzhu/'
        },
        {
          title: 'Martial Arts Stories by Jin Yong',
          url: 'https://www.luoxia.com/jinyong/'
        },
        {
          title: 'Translated International Classics',
          url: 'https://www.luoxia.com/mingzhu/'
        },
        {
          title: 'More from Luoxia.com',
          url: 'https://www.luoxia.com/'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.booklists {
  display: flex;
  flex-wrap: wrap;
}
.booklists li {
  flex: 1;
  min-width: 15rem;
}
</style>
