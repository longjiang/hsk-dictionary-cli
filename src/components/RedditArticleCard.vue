<template>
  <article class="updown article">
    <div class="updown-head">
      <font-awesome-icon icon="arrow-up" />
      <div>{{ article.ups }}</div>
      <font-awesome-icon icon="arrow-down" />
    </div>
    <div class="updown-body media">
      <img v-if="article.post_hint === 'image'" :src="article.url" class="img-fluid" />
      <video
        v-if="article.post_hint === 'hosted:video'"
        :src="article.media.reddit_video.fallback_url"
        class="img-fluid"
        :autoplay="article.media.reddit_video.is_gif"
        :loop="article.media.reddit_video.is_gif"
        preload="auto"
      ></video>
      <div class="media-body">
        <Annotate tag="h4" class="article-title">{{ article.title }}</Annotate>
        <div
          v-if="article.media && article.media.oembed"
          v-html="Helper.unescape(article.media.oembed.html)"
        ></div>
        <Annotate tag="div" v-html="Helper.unescape(article.selftext_html)" class="article-body"></Annotate>
      </div>
    </div>
  </article>
</template>

<script>
import Helper from '@/lib/helper'

export default {
  props: ['article'],
  data() {
    return {
      Helper
    }
  },
  methods: {},
  created() {}
}
</script>

<style>
.updown {
  display: flex;
}

.updown-head {
  flex: 0;
  text-align: center;
  padding: 1rem;
  background: #fff0ec;
}

.updown-body {
  flex: 1;
}
</style>
