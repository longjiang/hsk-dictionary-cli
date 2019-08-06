import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/hsk-dictionary.css'
import '@/vendor/css-spinners/spinner/heartbeat.css'
import '@/vendor/css-spinners/spinner/inner-circles.css'
import '@/vendor/glyphicons/css/glyphicons.css'
import '@/vendor/annotator-js/css/annotator.css'
import Vue from 'vue'
import HSKDictionary from './HSKDictionary.vue'
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
import store from './store'
import $ from 'jquery'
import VueWorker from 'vue-worker'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueWorker)

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

  window.hskDictionaryApp = new Vue({
    router,
    store,
    render: h => h(HSKDictionary)
  }).$mount('#hsk-dictionary')
}
