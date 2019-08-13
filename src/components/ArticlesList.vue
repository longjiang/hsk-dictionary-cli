<template>
  <ul class="articles list-unstyled">
    <li v-for="article in articles" class="article-list-item">
      <a :href="article.url"
        >
        <img v-if="article.thumbnail" :src="article.thumbnail" alt="" />
        <PinyinButton />
        <h5 class="article-list-item-title">
          {{ article.title
          }}<a
            :href="`${Config.wikiAdmin}collections/articles/${article.id}`"
            class="btn article-list-item-edit-btn"
            target="_blank"
            >Edit</a
          >
        </h5>
        <PinyinButton />
        <div v-html="article.body" class="article-list-item-body"></div
      ></a>
    </li>
  </ul>
</template>

<script>
import Config from '@/lib/config'
export default {
  props: {
    articles: {
      default: []
    }
  },
  data() {
    return {
      Config
    }
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
