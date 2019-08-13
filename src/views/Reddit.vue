<template>
  <div class="main mt-5 mb-5">
    <div
      v-if="method === 'list' && articles && articles.length > 0"
      class="container"
    >
      <div class="row">
        <div class="col-sm-12 col-md-8">
          <h3 class="mb-5">
            Reddit Posts under
            <a href="https://www.reddit.com/r/ChineseLanguage"
              >r/ChineseLanguage</a
            >
          </h3>
          <RedditArticlesList :articles="articles" />
        </div>
        <div class="col-sm-12 col-md-4">
          <h4 class="mb-5">About Reddit</h4>
          <hr />
          <p>
            This is a community for people studying or teaching Chinese - or
            just interested in the language. Please post interesting links,
            language learning advice, or questions about the Chinese language.
            To participate and create new content,
            <a href="https://www.reddit.com/r/ChineseLanguage/"
              >visit the community on Reddit</a
            >.
          </p>
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
          <img v-if="article.post_hint === 'image'" :src="article.url" alt />
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
import RedditArticlesList from '@/components/RedditArticlesList.vue'

export default {
  components: {
    RedditArticlesList
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
    route() {
      $('#hsk-dictionary')[0].scrollIntoView()
      if (this.method) {
        if (this.method === 'list') {
          this.articles = []
          $.getJSON(
            `${Config.proxy}?https://www.reddit.com/r/ChineseLanguage/top.json`,
            response => {
              this.articles = response.data.data.children.map(item => item.data)
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
