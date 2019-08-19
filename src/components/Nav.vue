<template>
  <div>
    <nav class="tabs text-center">
      <router-link class="tab" :to="{ name: 'home' }" title="Home page">
        <i class="glyphicon glyphicon-font"></i> Home
      </router-link>
      <router-link
        class="tab"
        :to="{ name: 'hall-of-heroes' }"
        title="Hall of Heroes"
      >
        <i class="glyphicon glyphicon-font"></i> Hall of Heroes
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
        <i class="glyphicon glyphicon-font"></i> Dictionary
      </router-link>
      <router-link
        class="tab"
        :to="{ name: 'explore' }"
        title="Explore words by level and topic"
      >
        <i class="glyphicon glyphicon-book"></i>
        Wordbook
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
        <i class="glyphicon glyphicon-file"></i> Reader
      </router-link>
      <router-link class="tab" :to="{ name: 'learn' }" title="Learn new words">
        <i class="glyphicon glyphicon-blackboard"></i> Learn
      </router-link>
      <router-link
        class="tab"
        :to="{ name: 'articles' }"
        title="Articles related to Chinese learning"
      >
        <i class="glyphicon glyphicon-menu-hamburger"></i> Articles
      </router-link>
      <router-link class="tab tab-saved-words" :to="{ name: 'saved-words' }">
        <i class="glyphicon glyphicon-star"></i> Saved
        <span class="tab-saved-words-count" v-cloak>
          {{ savedWordsCount() }}
        </span>
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
