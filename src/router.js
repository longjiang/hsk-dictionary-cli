import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/browse'
    },
    {
      path: '/browse',
      name: 'browse',
      component: () => import('./views/Browse.vue')
    },
    {
      path: '/view/:method?/:args?',
      name: 'entry',
      component: () => import('./views/Entry.vue'),
      props: true
    },
    {
      path: '/compare/:method/:args',
      name: 'browse',
      component: () => import('./views/Compare.vue')
    },
    {
      path: '/reader',
      name: 'reader',
      component: () => import('./views/Reader.vue')
    },
    {
      path: '/learn',
      name: 'learn',
      redirect: '/learn/saved'
    },
    {
      path: '/learn/:method?/:args?',
      name: 'learn-custom',
      component: () => import('./views/Learn.vue')
    },
    {
      path: '/saved-words',
      name: 'saved-words',
      component: () => import('./views/SavedWords.vue')
    },
    {
      path: '/pinyin-list',
      name: 'pinyin',
      component: () => import('./views/PinyinList.vue')
    }
  ]
})
