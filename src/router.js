import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/saved-words'
    },
    {
      path: '/browse',
      name: 'browse',
      component: () => import('./views/Browse.vue')
    },
    {
      path: '/view/:method?/:arg?',
      name: 'entry',
      component: () => import('./views/Entry.vue'),
      props: true
    },
    {
      path: '/compare/:method/:args',
      name: 'compare',
      component: () => import('./views/Compare.vue')
    },
    {
      path: '/reader/:method?/:arg?',
      name: 'reader',
      component: () => import('./views/Reader.vue')
    },
    {
      path: '/articles/:method?/:args?',
      name: 'articles',
      component: () => import('./views/Articles.vue')
    },
    {
      path: '/learn/:method?/:args?',
      name: 'learn',
      component: () => import('./views/Learn.vue')
    },
    {
      path: '/saved-words',
      name: 'saved-words',
      component: () => import('./views/SavedWords.vue')
    },
    {
      path: '/explore',
      name: 'explore',
      redirect: '/explore/roots'
    },
    {
      path: '/explore/roots/:arg?',
      name: 'explore-roots',
      component: () => import('./views/Roots.vue')
    },
    {
      path: '/explore/related/:arg?',
      name: 'explore-related',
      component: () => import('./views/Related.vue')
    },
    {
      path: '/explore/topics',
      name: 'explore-topics',
      component: () => import('./views/Topics.vue')
    },
    {
      path: '/pinyin-list',
      name: 'pinyin',
      component: () => import('./views/PinyinList.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue')
    }
  ]
})
