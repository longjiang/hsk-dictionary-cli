import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'css-percentage-circle'
import '@/assets/css/annotator.css'
import '@/assets/css/chinesezerotohero.css'
import '@/vendor/css-spinners/spinner/heartbeat.css'
import '@/vendor/css-spinners/spinner/inner-circles.css'
import '@/vendor/glyphicons/css/glyphicons.css'
import Vue from 'vue'
import ChineseZeroToHero from './ChineseZeroToHero.vue'
import Test from './Test.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Star from '@/components/Star'
import Speak from '@/components/Speak'
import PinyinButton from '@/components/PinyinButton'
import WordList from '@/components/WordList'
import ShowMoreButton from '@/components/ShowMoreButton'
import StrokeOrder from '@/components/StrokeOrder.vue'
import Merge from '@/components/Merge.vue'
import Loader from '@/components/Loader.vue'
import Annotate from '@/components/Annotate'
// import Annotate from '@/components/Annotate'
import store from './store'
import $ from 'jquery'
import VueWorker from 'vue-worker'
import VueObserveVisibility from 'vue-observe-visibility'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueWorker)
Vue.use(VueObserveVisibility)

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { SimpleSVG } from 'vue-simple-svg'

library.add(fab, fas) // fontawesome, add the 'fab-reddit' icon

if (location.hash === '#/test') {
  $('#loader').remove()
  window.testApp = new Vue({
    render: h => h(Test)
  }).$mount('#test')
} else {
  Vue.component('Star', Star)
  Vue.component('Speak', Speak)
  Vue.component('PinyinButton', PinyinButton)
  Vue.component('ShowMoreButton', ShowMoreButton)
  Vue.component('StrokeOrder', StrokeOrder)
  Vue.component('Merge', Merge)
  Vue.component('WordList', WordList)
  Vue.component('Loader', Loader)
  Vue.component('Annotate', Annotate)
  Vue.component('font-awesome-icon', FontAwesomeIcon)
  Vue.component('simple-svg', SimpleSVG)

  // https://alligator.io/vuejs/vue-router-modify-head/
  // This callback runs before every route change, including on page load.
  router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched
      .slice()
      .reverse()
      .find(r => r.meta && r.meta.title)

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched
      .slice()
      .reverse()
      .find(r => r.meta && r.meta.metaTags)
    const previousNearestWithMeta = from.matched
      .slice()
      .reverse()
      .find(r => r.meta && r.meta.metaTags)

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
      el => el.parentNode.removeChild(el)
    )

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next()

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags
      .map(tagDef => {
        const tag = document.createElement('meta')

        Object.keys(tagDef).forEach(key => {
          tag.setAttribute(key, tagDef[key])
        })

        // We use this to track which meta tags we create, so we don't interfere with other ones.
        tag.setAttribute('data-vue-router-controlled', '')

        return tag
      })
      // Add the meta tags to the document head.
      .forEach(tag => document.head.appendChild(tag))

    next()
  })

  window.ChineseZeroToHeroApp = new Vue({
    router,
    store,
    render: h => h(ChineseZeroToHero)
  }).$mount('#chinesezerotohero')
}
