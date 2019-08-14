<template>
  <ul class="articles list-unstyled">
    <li v-for="article in articles" class="article-list-item updown">
      <div class="updown-head">
        <font-awesome-icon icon="arrow-up" />
        <div>{{ article.ups }}</div>
        <font-awesome-icon icon="arrow-down" />
      </div>
      <a
        :href="
          `#/articles/reddit/view/${article.id},${encodeURIComponent(
            article.title
          )}`
        "
        class="media"
      >
        <img
          class="img-fluid"
          v-if="article.post_hint === 'image'"
          :src="article.url"
        />
        <div class="media-body">
          <Annotate tag="h5" class="article-list-item-title">
            {{
              article.title
                .split(' ')
                .splice(0, 15)
                .join(' ') + '...'
            }}
          </Annotate>
          <div
            v-html="Helper.unescape(article.selftext_html)"
            class="article-list-item-body"
          ></div>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
import $ from 'jquery'
import Config from '@/lib/config'
import Helper from '@/lib/helper'

export default {
  props: {
    path: {
      type: String
    },
    edit: {
      default: false
    }
  },
  created() {
    let cacheLife = 3600 // clear cache every hour
    $.getJSON(
      `${Config.jsonProxy}?cache_life=${cacheLife}&url=https://www.reddit.com/${
        this.path
      }.json`,
      response => {
        this.articles = response.data.data.children.map(item => item.data)
      }
    )
    // console.log(this.articles)
  },
  data() {
    return {
      Config,
      Helper,
      articles: []
    }
  }
}
</script>

<style scoped>
</style>
