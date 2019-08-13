<template>
  <div class="main mt-5 mb-5">
    <div
      v-if="method === 'list' && articles && articles.length > 0"
      class="container"
    >
      <div class="row">
        <div class="col-sm-12 col-md-8">
          <h3 class="mb-5">
            Reddit Posts Related to Chinese-Language Learning
          </h3>
          <ArticlesList :articles="articles" />
        </div>
        <div class="col-sm-12 col-md-4">
          <h4 class="mb-5">About Reddit</h4>
          <hr />
          <p>
            Lorem ipsum dolor amet, but pain is sometimes neccessary?
          </p>
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
  data() {
    return {
      articles: [],
      article: undefined,
      method: undefined,
      args: undefined,
      Config
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
      $('#hsk-dictionary')[0].scrollIntoView()
      if (this.$route.params.method) {
        this.method = this.$route.params.method
        if (this.method === 'list') {
          this.articles = []
          $.getJSON(`${Config.wiki}items/articles`, response => {
            this.articles = response.data
          })
        } else if (this.method === 'view' && this.$route.params.args) {
          this.args = this.$route.params.args.split(',')
          this.article = undefined
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

<style></style>
