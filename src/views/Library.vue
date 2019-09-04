<template>
  <div class="container pt-5 pb-5 main" id="library">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="mb-5 text-center">Library</h1>
        <p class="text-center lead" style="margin-bottom: 5rem">
          This is where you can enjoy reading a variety of Chinese books with
          the help of pinyin annotation and dictionary tools.
        </p>
        <ul class="list-unstyled p-0 mb-5 booklists">
          <li v-for="booklist in booklists" class="text-center mb-5">
            <a class="link-unstyled" :href="`#/book/list/${encodeURIComponent(booklist.url)}`">
              <img
                :src="`/img/books-${Math.floor(Math.random() * 10)}.png`"
                class="shadowed book-thumb mb-4"
              />
              <h5 class="mt-3">
                <b>{{ booklist.title }}</b>
              </h5>
              <p class="mb-0" style="color: #aaa">Source: {{ Library.source(booklist.url).name }}</p>
            </a>
          </li>
        </ul>
        <h1 class="text-center" style="margin-bottom: 6rem">Authors</h1>
        <ul class="list-unstyled p-0 mb-5 booklists">
          <li v-for="booklist in authors" class="text-center mb-5">
            <a class="link-unstyled" :href="`#/book/list/${encodeURIComponent(booklist.url)}`">
              <img
                :src="`/img/books-${Math.floor(Math.random() * 10)}.png`"
                class="shadowed book-thumb mb-4"
              />
              <h5 class="mt-3">
                <Annotate tag="b">{{ booklist.title }}</Annotate>
              </h5>
              <p class="mb-0" style="color: #aaa">Source: {{ Library.source(booklist.url).name }}</p>
            </a>
          </li>
        </ul>

        <h1 class="text-center" style="margin-bottom: 6rem">Wikipedia</h1>
        <ul class="list-unstyled p-0 mb-5 booklists">
          <li v-for="booklist in wikipedia" class="text-center mb-5">
            <a class="link-unstyled" :href="`#/book/list/${encodeURIComponent(booklist.url)}`">
              <img
                :src="`/img/books-${Math.floor(Math.random() * 10)}.png`"
                class="shadowed book-thumb mb-4"
              />
              <h5 class="mt-3">
                <Annotate tag="b">{{ booklist.title }}</Annotate>
              </h5>
            </a>
          </li>
        </ul>

        <h1 class="text-center mb-4">Graded Readers</h1>

        <p class="text-center lead mb-5">More graded readers from around the web.</p>
        <ul class="cards list-unstyled">
          <li class="text-center card" v-for="item in externalGradedReaders">
            <a :href="item.url" class="link-unstyled">
              <h5 class="mb-3">
                {{ item.title }}
                <font-awesome-icon icon="external-link-alt" />
              </h5>
              <div style="color: #aaa">{{ item.description }}</div>
            </a>
          </li>
        </ul>

        <h1 class="text-center mt-5 mb-4">Custom Reading</h1>

        <p class="text-center lead mb-5">
          Read
          <em>any</em> book by pasting the URL
        </p>

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
            We can work with these content providers.
            <b>Copy paste</b> URLs
            like the following into the above text box and enjoy reading!
          </p>
          <ul>
            <li v-for="source in Library.sources">
              {{ source.name }}, example URL:
              <code v-html="`${source.example}`"></code>
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
      wikipedia: [
        {
          title: 'Categorized Articles on Wikipedia',
          url:
            'https://zh.wikipedia.org/wiki/Wikipedia:%E5%88%86%E9%A1%9E%E7%B4%A2%E5%BC%95'
        }
      ],
      externalGradedReaders: [
        {
          title: 'Chinese Reading Practice',
          url: 'http://chinesereadingpractice.com/',
          description:
            'Short writings of various kinds for beginner, intermediate and advanced levels.'
        },
        {
          title: 'Du Chinese',
          url: 'https://www.duchinese.net/lessons',
          description: 'Graded articles, some are free, others are paid.'
        },
        {
          title: 'The Chairman’s Bao',
          url: 'https://www.thechairmansbao.com',
          description: 'Graded articles, some are free, others are paid.'
        },
        {
          title: '轻松猫 Qingsong Mao',
          url: 'http://www.blcup.com/smartcat/index.html',
          description:
            'Graded Chinese readers for various levels with Audio. From BLCUP. Only audio is available on the web. Text is available for purchase from their store.'
        },
        {
          title: 'A lot of resources at r/zhResources',
          url:
            'https://www.reddit.com/r/zhResources/collection/fb6ed9ea-c736-4fbd-901c-84aae65ebd0f/',
          description:
            'For more categorized reading resouces, visit the subreddit r/zhResources.'
        }
      ],
      booklists: [
        {
          title: 'Biographies',
          url: 'https://www.51shucheng.net/zhuanji'
        },
        {
          title: 'Classics',
          url: 'https://zh.wikisource.org/wiki/Portal:%E5%85%B8%E7%B1%8D'
        },
        {
          title: 'Classical Novels',
          url: 'https://zh.wikisource.org/wiki/Portal:%E5%B0%8F%E8%AF%B4'
        },
        {
          title: 'Detective',
          url: 'https://www.51shucheng.net/zhentan'
        },
        {
          title: 'History',
          url: 'https://zh.wikisource.org/wiki/Portal:%E5%8F%B2%E6%9B%B8'
        },
        {
          title: 'Film Original',
          url: 'https://www.luoxia.com/yuanzhu/'
        },
        {
          title: 'Literature (Mixed)',
          url: 'https://www.luoxia.com/jingdian/'
        },
        {
          title: 'Literature (Modern and Contemporary)',
          url: 'https://www.51shucheng.net/xiandai'
        },
        {
          title: 'Mystery',
          url: 'https://www.luoxia.com/xuanyi/'
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
          title: 'Religion and Scripture',
          url: 'https://zh.wikisource.org/wiki/Portal:%E5%AE%97%E6%95%99'
        },
        {
          title: 'Romance',
          url: 'https://www.luoxia.com/yanqing/'
        },
        {
          title: 'Science Fiction',
          url: 'https://www.51shucheng.net/kehuan'
        },
        {
          title: 'Translated International Classics',
          url: 'https://www.luoxia.com/mingzhu/'
        },
        {
          title: 'Young Readers',
          url: 'https://www.51shucheng.net/qingchun'
        }
      ],
      sources: [
        {
          title: 'More from Luoxia.com',
          url: 'https://www.luoxia.com/'
        }
      ],
      authors: [
        {
          title: '郭敬明',
          url: 'https://www.51shucheng.net/zuojia/guojingming'
        },
        {
          title: '韩寒',
          url: 'https://www.51shucheng.net/zuojia/hanhan'
        },
        {
          title: '金庸',
          url: 'https://www.luoxia.com/jinyong/'
        },
        {
          title: '金庸',
          url: 'https://www.51shucheng.net/zuojia/jinyong'
        },
        {
          title: '刘慈欣',
          url: 'https://www.51shucheng.net/zuojia/liucixin'
        },
        {
          title: '路遥',
          url: 'https://www.51shucheng.net/zuojia/luyao'
        },
        {
          title: '路遥',
          url: 'https://www.51shucheng.net/zuojia/luyao'
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
