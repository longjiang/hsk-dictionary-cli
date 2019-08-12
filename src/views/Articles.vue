<template>
  <div class="main mt-5">
    <div
      v-if="method === 'list' && articles && articles.length > 0"
      class="container"
    >
      <div class="row">
        <div class="col-sm-12">
          <h3 class="mb-5">Wiki Articles</h3>
          <li v-for="article in articles" class="article-list-item">
            <PinyinButton/>
            <a :href="`#/articles/view/${article.id},${article.title}`"
              ><h5 class="article-list-item-title">{{ article.title }}</h5>
              <div v-html="article.body" class="article-list-item-body"></div
            ></a>
          </li>
        </div>
      </div>
    </div>
    <div v-if="method === 'view' && article" class="container">
      <div class="row">
        <div class="col-sm-12">
          <PinyinButton/>
          <h3>{{ article.title }}</h3>
          <hr />
          <PinyinButton/>
          <article v-html="article.body"></article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Config from '@/lib/config'

export default {
  data() {
    return {
      articles: [],
      article: undefined,
      method: undefined,
      args: undefined
    }
  },
  watch: {
    $route() {
      if (this.$route.name === 'articles') {
        this.route()
      }
    }
  },
  methods: {
    route() {
      console.log('routing?')
      $('#hsk-dictionary')[0].scrollIntoView()
      if (this.$route.params.method) {
        this.method = this.$route.params.method
        console.log('method', this.method)
        if (this.method === 'list') {
          this.articles = []
          console.log('getting directus?')
          $.getJSON(`${Config.wiki}items/articles`, response => {
            this.articles = response.data
          })
        } else if (this.method === 'view' && this.$route.params.args) {
          this.args = this.$route.params.args.split(',')
          this.article = undefined
          console.log('article', this.args[0])
          $.getJSON(
            `${Config.wiki}items/articles/${this.args[0]}`,
            response => {
              this.article = response.data
            }
          )
        }
      } else {
        location.hash = '#/articles/list'
      }
    }
  },
  created() {
    this.route()
  }
}
</script>

<style>
.article-list-item {
  list-style: none;
  margin-bottom: 1rem;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  padding: 1.5rem;
}

.article-list-item-title {
  border-bottom: 1px solid #ececec;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.article-list-item-body {
  max-height: 10rem;
  overflow: hidden;
  font-size: 1rem;
  -webkit-mask-image: linear-gradient(180deg, #000 60%, transparent);
  mask-image: linear-gradient(180deg, #000 60%, transparent);
}

.article-list-item-body * {
  font-size: 1rem;
}

.article-list-item a {
  color: inherit;
}

.article-list-item a:hover {
  color: inherit;
  text-decoration: none;
}
</style>
