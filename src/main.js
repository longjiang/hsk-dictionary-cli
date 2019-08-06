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
import Loader from '@/lib/loader'
import Annotator from '@/lib/annotator'
import Grammar from '@/lib/grammar'
import Hanzi from '@/lib/hanzi'
import Helper from '@/lib/helper'
import Star from '@/components/Star'
import Speak from '@/components/Speak'
import PinyinButton from '@/components/PinyinButton'
import WordList from '@/components/WordList'
import ShowMoreButton from '@/components/ShowMoreButton'
import StrokeOrder from '@/components/StrokeOrder.vue'
import Merge from '@/components/Merge.vue'
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

  let loader = new Loader(['annotator', 'hanzi', 'grammar'], function() {
    Helper.loaderMessage('All data loaded.')
    $('#loader').remove()
    window.hskDictionaryApp = new Vue({
      router,
      store,
      render: h => h(HSKDictionary)
    }).$mount('#hsk-dictionary')
  })

  Annotator.load(function() {
    window.Annotator = Annotator
    loader.loaded('annotator')
  })

  Grammar.load(function() {
    window.Grammar = Grammar
    loader.loaded('grammar')
  })

  Hanzi.load(function() {
    window.Hanzi = Hanzi
    loader.loaded('hanzi')
  })
}
