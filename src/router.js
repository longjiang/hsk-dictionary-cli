import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'browse',
      component: () => import('./views/Browse.vue')
    },
    {
      path: '/view',
      name: 'entry',
      component: () => import('./views/Entry.vue')
    },
    {
      path: '/reader',
      name: 'reader',
      component: () => import('./views/Reader.vue')
    },
    {
      path: '/learn',
      name: 'learn',
      component: () => import('./views/Learn.vue')
    },
    {
      path: '/saved-words',
      name: 'saved-words',
      component: () => import('./views/SavedWords.vue')
    }
  ]
})
