<template>
  <ul class="articles list-unstyled">
    <li v-for="article in articles" class="article-list-item">
      <a :href="article.url" class="media"
        ><img
          v-if="article.thumbnail && article.thumbnail.startsWith('http')"
          :src="article.thumbnail"
          class="mr-2"/>
        <div class="media-body">
          <PinyinButton />
          <h5 class="article-list-item-title">
            {{ article.title
            }}<a
              v-if="edit"
              :href="`${Config.wikiAdmin}collections/articles/${article.id}`"
              class="btn article-list-item-edit-btn"
              target="_blank"
              >Edit</a
            >
          </h5>
          <PinyinButton />
          <div v-html="article.body" class="article-list-item-body"></div></div
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
    },
    edit: {
      default: false
    }
  },
  data() {
    return {
      Config
    }
  }
}
</script>

<style scoped>
</style>
