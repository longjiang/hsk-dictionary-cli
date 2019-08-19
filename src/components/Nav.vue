<template>
  <div>
    <nav class="tabs text-center">
      <router-link class="tab" :to="{ name: 'about' }" title="About Us">
        <font-awesome-icon icon="info" /> About
      </router-link>
      <router-link
        class="tab"
        :to="{ name: 'hall-of-heroes' }"
        title="Hall of Heroes"
      >
        <font-awesome-icon icon="trophy" /> Heroes
      </router-link>
      <router-link
        :class="{
          tab: true,
          'router-link-active':
            $route.name === 'entry' || $route.name === 'compare'
        }"
        :to="{ name: 'entry' }"
        title="Lookup and compare words"
      >
        <i class="glyphicon glyphicon-font"></i> Vocabulary
      </router-link>
      <router-link
        class="tab"
        :to="{ name: 'grammar' }"
        title="Chinese grammar cheatsheet"
      >
        <i class="glyphicon glyphicon-list"></i> Grammar
      </router-link>
      <router-link
        class="tab"
        :to="{ name: 'reader' }"
        title="Read your text with annotation"
      >
        <font-awesome-icon icon="book" /> Reader
      </router-link>
      <router-link
        class="tab"
        :to="{ name: 'articles' }"
        title="Articles related to Chinese learning"
      >
        <font-awesome-icon icon="copy" /> Articles
      </router-link>
      <router-link
        class="tab tab-info"
        :to="{ name: 'settings' }"
        title="Settings"
      >
        <i class="glyphicon glyphicon-cog"></i> Settings
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    savedWordsCount() {
      let count = this.$store.getters.savedWordCount()
      // eslint-disable-next-line vue/no-parsing-error
      return count < 100 ? count : '多'
    }
  }
}
</script>
