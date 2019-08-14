<template>
  <div class="col-sm-12" v-if="article">
    <article class="updown article-list-item">
      <div class="updown-head">
        <font-awesome-icon icon="arrow-up" />
        <div>{{ article.ups }}</div>
        <font-awesome-icon icon="arrow-down" />
      </div>
      <div class="updown-body media">
        <img
          v-if="article.post_hint === 'image'"
          :src="article.url"
          class="img-fluid"
        />
        <video
          v-if="article.post_hint === 'hosted:video'"
          :src="article.media.reddit_video.fallback_url"
          class="img-fluid"
          :autoplay="article.media.reddit_video.is_gif"
          :loop="article.media.reddit_video.is_gif"
          preload="auto"
        ></video>
        <div class="media-body">
          <Annotate tag="h3">{{ article.title }}</Annotate>
          <div
            v-if="article.media && article.media.oembed"
            v-html="Helper.unescape(article.media.oembed.html)"
          ></div>
          <Annotate
            tag="div"
            v-html="Helper.unescape(article.selftext_html)"
          ></Annotate>
        </div>
      </div>
    </article>
    <div>
      <div class="mt-5 mb-5 p-5 text-center shadow">
        <p>
          To participate, go to reddit.com/<a
            :href="
              `https://www.reddit.com/${
                article.subreddit_name_prefixed
              }/comments/cpdv8t`
            "
            ><b>{{ article.subreddit_name_prefixed }}</b></a
          >
          directly.
        </p>
        <a
          :href="`https://www.reddit.com/r/ChineseLanguage/comments/cpdv8t`"
          class="btn btn-danger"
          >Go to r/ChineseLanguage</a
        >
      </div>

      <div v-for="comment in comments">
        <h6>{{ comment.author }}</h6>
        <Annotate v-html="Helper.unescape(comment.body_html)"></Annotate>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Config from '@/lib/config'
import Helper from '@/lib/helper'

export default {
  props: ['articleId'],
  data() {
    return {
      comments: [],
      article: undefined,
      Config,
      Helper
    }
  },
  methods: {},
  created() {
    let cacheLife = 3600 // clear cache every hour
    $.getJSON(
      `${
        Config.jsonProxy
      }?cache_life=${cacheLife}&url=https://www.reddit.com/comments/${
        this.articleId
      }/.json`,
      response => {
        let article = response.data[0].data.children[0].data
        console.log(article, 'article')
        this.article = article
        let comments = response.data[1].data.children.map(item => item.data)
        // console.log(comments, 'comments')
        this.comments = comments
      }
    )
  }
}
</script>

<style scoped></style>
