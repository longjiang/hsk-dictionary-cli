<template>
  <div class="col-sm-12" v-if="article">
    <article>
      <Annotate tag="h3">{{ article.title }}</Annotate>
      <hr />
      <div
        v-if="article.media && article.media.oembed"
        v-html="Helper.unescape(article.media.oembed.html)"
      ></div>
      <img v-if="article.post_hint === 'image'" :src="article.url" alt />
      <Annotate
        tag="div"
        v-html="Helper.unescape(article.selftext_html)"
      ></Annotate>
    </article>
    <div>
      <hr class="mt-5 mb-5">
      <h4>Comments</h4>
      <div v-for="comment in comments">
        <h6>{{ comment.author}} </h6>
        <Annotate v-html="Helper.unescape(comment.body_html)"></Annotate>
        <hr>
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
    $.getJSON(
      `${Config.proxy}?https://www.reddit.com/comments/${this.articleId}/.json`,
      response => {
        let article = response.data[0].data.children[0].data
        // console.log(article)
        this.article = article
        let comments = response.data[1].data.children.map(item => item.data)
        // console.log(comments)
        this.comments = comments
      }
    )
  }
}
</script>

<style></style>
