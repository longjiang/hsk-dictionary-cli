<template>
  <div class="main mt-5 mb-5">
    <div v-if="method === 'list' && articles && articles.length > 0" class="container">
      <div class="row">
        <div class="col-sm-12 col-md-8">
          <h3 class="mb-5">Reddit Posts Related to Chinese-Language Learning</h3>
          <ArticlesList :articles="articles" />
        </div>
        <div class="col-sm-12 col-md-4">
          <h4 class="mb-5">About Reddit</h4>
          <hr />
          <p>Lorem ipsum dolor amet, but pain is sometimes neccessary?</p>
        </div>
      </div>
    </div>
    <div v-if="method === 'view' && article" class="container">
      <div class="row">
        <div class="col-sm-12">
          <PinyinButton />
          <h3>{{ article.title }}</h3>
          <hr />
          <div
            v-if="article.media && article.media.oembed"
            v-html="unescape(article.media.oembed.html)"
          ></div>
          <img
            v-if="
              article.post_hint === 'image'
            "
            :src="article.redditURL"
            alt
          />
          <PinyinButton />
          <article v-html="article.body"></article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Config from '@/lib/config'
import ArticlesList from '@/components/ArticlesList.vue'

export default {
  components: {
    ArticlesList
  },
  props: ['method', 'args'],
  data() {
    return {
      articles: [],
      article: undefined,
      Config
    }
  },
  watch: {
    $route() {
      if (this.$route.name === 'articles-reddit') {
        this.route()
      }
    }
  },
  methods: {
    normalizeRedditArticle(data) {
      data.body = data.selftext_html
      data.redditURL = data.url
      data.url = `#/articles/reddit/view/${data.id},encodeURIComponent(${data.title})`
      return data
    },
    unescape(html) {
      return $('<div/>')
        .html(html)
        .text()
    },
    route() {
      $('#hsk-dictionary')[0].scrollIntoView()
      if (this.method) {
        if (this.method === 'list') {
          this.articles = []
          $.getJSON(
            `${Config.proxy}?https://www.reddit.com/r/ChineseLanguage/top.json`,
            response => {
              this.articles = response.data.data.children.map(item =>
                this.normalizeRedditArticle(item.data)
              )
            }
          )
        } else if (this.method === 'view' && this.args) {
          let id = this.args.split(',')[0]
          let alreadyHaveArticle = this.articles.find(item => item.id === id)
          if (alreadyHaveArticle) {
            this.article = alreadyHaveArticle
          } else {
            $.getJSON(
              `${Config.proxy}?https://www.reddit.com/comments/${id}/.json`,
              response => {
                let article = this.normalizeRedditArticle(
                  response.data[0].data.children[0].data
                )
                console.log(article)
                this.article = article
              }
            )
          }
        }
      } else {
        location.hash = '#/articles/reddit/list'
      }
    }
  },
  created() {
    this.route()
  }
}
</script>

<style></style>
