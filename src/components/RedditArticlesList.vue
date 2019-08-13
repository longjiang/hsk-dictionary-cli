<template>
  <ul class="articles list-unstyled">
    <li v-for="article in articles" class="article-list-item">
      <a
        :href="
          `#/articles/reddit/view/${article.id},encodeURIComponent(${
            article.title
          })`
        "
        class="media"
        ><img
          class="img-fluid"
          v-if="article.post_hint === 'image'"
          :src="article.url"/>
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
          ></div></div
      ></a>
    </li>
  </ul>
</template>

<script>
import Config from '@/lib/config'
import Annotate from '@/components/Annotate'
import Helper from '@/lib/helper'

export default {
  components: {
    Annotate
  },
  props: {
    articles: {
      default: []
    },
    edit: {
      default: false
    }
  },
  created() {
    console.log(this.articles)
  },
  data() {
    return {
      Config,
      Helper
    }
  }
}
</script>

<style scoped>
.media {
  width: 100%;
  display: block;
  overflow: hidden;
}

.media-body {
  padding: 1.5rem;
}

.article-list-item {
  list-style: none;
  margin-bottom: 1rem;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  overflow: hidden;
}

.article-list-item-title {
  border-bottom: 1px solid #ececec;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  color: #fd4f1c;
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

.article-list-item-body img {
  display: none;
}

a.article-list-item-edit-btn {
  float: right;
  background: #cecece;
  color: white;
}

a.article-list-item-edit-btn:hover {
  float: right;
  background: #fd4f1c;
  color: white;
}
</style>
