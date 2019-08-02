import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/hsk-dictionary.css'
import '@/vendor/css-spinners/spinner/heartbeat.css'
import '@/vendor/css-spinners/spinner/inner-circles.css'
import '@/vendor/glyphicons/css/glyphicons.css'
import '@/vendor/annotator-js/css/annotator.css'
import Vue from 'vue'
import HSKDictionary from './HSKDictionary.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Loader from '@/lib/loader'
import CEDICT from '@/lib/cedict'
import Grammar from '@/lib/grammar'
import HSK from '@/lib/hsk'
import Helper from '@/lib/helper'
import Star from '@/components/Star'
import Speak from '@/components/Speak'
import PinyinButton from '@/components/PinyinButton'
import ShowMoreButton from '@/components/ShowMoreButton'
import Merge from '@/components/Merge'
import store from './store'
import $ from 'jquery'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.component('Star', Star)
Vue.component('Speak', Speak)
Vue.component('PinyinButton', PinyinButton)
Vue.component('ShowMoreButton', ShowMoreButton)
Vue.component('Merge', Merge)

let loader = new Loader(['hsk', 'cedict', 'grammar'], function() {
  Helper.loaderMessage('All data loaded.')
  $('#loader').remove()
  window.hskDictionaryApp = new Vue({
    router,
    store,
    render: h => h(HSKDictionary)
  }).$mount('#hsk-dictionary')
})

HSK.load(function() {
  window.HSK = HSK
  loader.loaded('hsk')
})

CEDICT.load(function() {
  window.CEDICT = CEDICT
  loader.loaded('cedict')
})

Grammar.load(function() {
  loader.loaded('grammar')
})
