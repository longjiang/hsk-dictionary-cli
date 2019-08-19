<template>
  <div>
    <nav class="tabs text-center">
      <router-link class="tab" :to="{ name: 'courses' }" title="Courses">
        <font-awesome-icon icon="graduation-cap" /> Courses
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
            $route.name === 'dictionary' || $route.name === 'compare'
        }"
        :to="{ name: 'dictionary' }"
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
        <font-awesome-icon icon="book-open" /> Reader
      </router-link>
      <router-link
        class="tab"
        :to="{ name: 'articles' }"
        title="Articles related to Chinese learning"
      >
        <font-awesome-icon icon="copy" /> Articles
      </router-link>
      <router-link class="tab" :to="{ name: 'contact' }" title="Contact Us">
        <font-awesome-icon icon="id-card" /> Contact
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
  methods: {}
}
</script>
