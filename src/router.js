import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/view'
    },
    {
      path: '/browse',
      name: 'browse',
      redirect: '/explore/levels'
    },
    {
      path: '/grammar',
      name: 'grammar',
      component: () => import('./views/Grammar.vue'),
      meta: {
        title: 'Grammar Cheatsheet | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content:
              'The succint and comprehensive grammar chart, following the HSK Standard Course textbook.'
          }
        ]
      }
    },
    {
      path: '/explore/levels',
      name: 'levels',
      component: () => import('./views/Levels.vue'),
      meta: {
        title: 'HSK Words by Level | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content: 'Learn Chinese words by HSK levels (HSK 1 to HSK 6).'
          }
        ]
      }
    },
    {
      path: '/view/:method?/:arg?',
      name: 'entry',
      component: () => import('./views/Entry.vue'),
      props: true,
      meta: {
        title: 'Dictionary | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content: ''
          }
        ]
      }
    },
    {
      path: '/compare/:method/:args',
      name: 'compare',
      component: () => import('./views/Compare.vue'),
      meta: {
        title: 'Compare | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content: 'Compare two words and see how they are used differently.'
          }
        ]
      }
    },
    {
      path: '/reader/:method?/:arg?',
      name: 'reader',
      component: () => import('./views/Reader.vue'),
      meta: {
        title: 'Reader | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content:
              'Read Chinese text with pinyin annotation and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/articles',
      name: 'articles',
      redirect: '/articles/wiki/list'
    },
    {
      path: '/articles/wiki/:method?/:args?',
      name: 'articles-wiki',
      component: () => import('./views/Articles.vue'),
      meta: {
        title: 'Articles | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content:
              'Read Wiki articles about Chinese grammar and Chinese language.'
          }
        ]
      }
    },
    {
      path: '/resources/:method?/:args?',
      name: 'resources',
      component: () => import('./views/Resources.vue'),
      props: true,
      meta: {
        title: 'Resources | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content: 'User voted Chinese-learning resources.'
          }
        ]
      }
    },
    {
      path: '/articles/reddit/:method?/:args?',
      name: 'articles-reddit',
      component: () => import('./views/Reddit.vue'),
      props: true,
      meta: {
        title: 'Reddit Posts | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content: 'Read Reddit posts related to Chinese language.'
          }
        ]
      }
    },
    {
      path: '/learn/:method?/:args?',
      name: 'learn',
      component: () => import('./views/Learn.vue'),
      meta: {
        title: 'Learn | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content: 'Learn words interactively by seeing how they are used.'
          }
        ]
      }
    },
    {
      path: '/saved-words',
      name: 'saved-words',
      component: () => import('./views/SavedWords.vue'),
      meta: {
        title: 'Saved Words | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content: 'Study, manage, import, export the words you saved.'
          }
        ]
      }
    },
    {
      path: '/explore',
      name: 'explore',
      redirect: '/explore/levels'
    },
    {
      path: '/explore/roots/:arg?',
      name: 'explore-roots',
      component: () => import('./views/Roots.vue'),
      meta: {
        title: 'Roots | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content:
              'Learn some common word-building patterns. For example: ～子（桌子、屋子、个子……）'
          }
        ]
      }
    },
    {
      path: '/explore/related/:arg?',
      name: 'explore-related',
      component: () => import('./views/Related.vue'),
      meta: {
        title: 'Related Words | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content: 'For any given word, find words related ot it.'
          }
        ]
      }
    },
    {
      path: '/explore/topics',
      name: 'explore-topics',
      component: () => import('./views/Topics.vue'),
      meta: {
        title: 'Words by Topic | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content: 'Explore new Chinese words by topics'
          }
        ]
      }
    },
    {
      path: '/pinyin-list',
      name: 'pinyin',
      component: () => import('./views/PinyinList.vue'),
      meta: {
        title: 'Pinyin List | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content:
              'Get a list of pinyin transcriptions for the list of words you provide.'
          }
        ]
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
      meta: {
        title: 'Settings | Chinese Learning Wiki',
        metaTags: [
          {
            name: 'description',
            content:
              'Change preferences: turn pinyin on or off, use simplified or traditional characters'
          }
        ]
      }
    }
  ]
})
