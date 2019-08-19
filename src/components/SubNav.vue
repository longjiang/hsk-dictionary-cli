<template>
  <div>
    <nav
      class="secondary-menu text-center"
      v-if="$route.path === '/browse' || $route.path.startsWith('/explore')"
    >
      <router-link class="secondary-menu-item" :to="{ name: 'browse' }">
        <i class="glyphicon glyphicon-signal"></i>
        HSK Levels
      </router-link>
      <router-link class="secondary-menu-item" :to="{ name: 'explore-roots' }">
        <i class="glyphicon glyphicon-grain"></i>
        Roots
      </router-link>
      <router-link class="secondary-menu-item" :to="{ name: 'explore-topics' }">
        <i class="glyphicon glyphicon-certificate"></i>
        Topics
      </router-link>
      <router-link
        class="secondary-menu-item"
        :to="{ name: 'explore-related' }"
      >
        <i class="glyphicon glyphicon-fullscreen"></i>
        Related
      </router-link>

      <router-link class="secondary-menu-item" :to="{ name: 'saved-words' }">
        <i class="glyphicon glyphicon-star"></i> Saved
        <span class="tab-saved-words-count" v-cloak>
          {{ savedWordsCount() }}
        </span>
      </router-link>
    </nav>

    <nav
      class="secondary-menu text-center"
      v-if="$route.name && $route.name.startsWith('articles')"
    >
      <router-link class="secondary-menu-item" :to="{ name: 'articles-wiki' }">
        <font-awesome-icon :icon="['fas', 'file-word']" />
        From Our Wiki
      </router-link>
      <router-link
        class="secondary-menu-item"
        :to="{ name: 'articles-reddit' }"
      >
        <font-awesome-icon :icon="['fab', 'reddit']" />
        From Reddit
      </router-link>
    </nav>
  </div>
</template>
