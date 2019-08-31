<template>
  <div>
    <nav class="tabs text-center">
      <router-link
        :class="{
          tab: true,
          'router-link-active':
            $route.name === 'courses' ||
            $route.name === 'textbooks-workbooks' ||
            $route.name === 'video-count' ||
            $route.name === 'pricing' ||
            $route.name === 'course-release-schedule'
        }"
        :to="{ name: 'courses' }"
        title="Courses"
      >
        <font-awesome-icon icon="graduation-cap" />Courses
      </router-link>
      <router-link
        class="tab"
        :to="{ name: 'hall-of-heroes' }"
        title="Hall of Heroes"
      >
        <font-awesome-icon icon="trophy" />Heroes
      </router-link>
      <router-link
        :class="{
          tab: true,
          'router-link-active':
            $route.name &&
            ($route.name === 'dictionary' ||
              $route.name === 'compare' ||
              $route.name === 'phrase' ||
              $route.name === 'levels' ||
              $route.name === 'idioms' ||
              $route.name === 'separable' ||
              $route.name.startsWith('explore') ||
              $route.name === 'learn' ||
              $route.name === 'saved-words')
        }"
        :to="{ name: 'dictionary' }"
        title="Lookup and compare words"
      >
        <font-awesome-icon icon="book" />Dictionary
      </router-link>
      <router-link
        class="tab"
        :to="{ name: 'grammar' }"
        title="Chinese grammar cheatsheet"
      >
        <i class="glyphicon glyphicon-list"></i>Grammar
      </router-link>
      <router-link
        :class="{
          tab: true,
          'router-link-active':
            $route.name &&
            ($route.name.startsWith('youtube') || $route.name === 'music')
        }"
        :to="{ name: 'youtube-browse' }"
        title="Learn Chinese by watching YouTube videos."
      >
        <font-awesome-icon icon="video" />Theater
      </router-link>
      <router-link
        class="tab"
        :to="{ name: 'reader' }"
        title="Read your text with annotation"
      >
        <font-awesome-icon icon="book-open" />Reader
      </router-link>
      <router-link
        class="tab"
        :to="{ name: 'articles' }"
        title="Articles related to Chinese learning"
      >
        <font-awesome-icon icon="copy" />Articles
      </router-link>
      <router-link class="tab" :to="{ name: 'contact' }" title="Contact Us">
        <font-awesome-icon icon="id-card" />Contact
      </router-link>
      <router-link
        class="tab"
        :to="{ name: 'settings' }"
        title="Settings"
      >
        <i class="glyphicon glyphicon-cog"></i>Settings
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {}
}
</script>

<style lang="scss">
.tabs {
  a svg,
  a i {
    margin-right: 0.5rem;
  }
}

.tabs {
  white-space: nowrap;
  overflow: scroll;
  overflow-y: hidden;
}

.tab {
  padding: 0.5rem 1rem;
  border-radius: 0.3rem 0.3rem 0 0;
  color: white;
  display: inline-block;
  margin-right: 0.2rem;
  border: none;
}

.tab.router-link-active,
.tab:hover {
  color: #fd4f1c;
  background: white;
  text-decoration: none;
}

.tab-saved-words.router-link-active,
.tab-saved-words:hover {
  color: #f8b61e;
}

.tab-saved-words-count[v-cloak] {
  display: none;
}

.tab-saved-words.router-link-active .tab-saved-words-count,
.tab-saved-words:hover .tab-saved-words-count {
  background: #f8b61e;
  color: white;
}
</style>
