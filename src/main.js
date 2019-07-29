import Vue from 'vue'
import HSKDictionary from './HSKDictionary.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Loader from '@/lib/loader'
import CEDICT from '@/lib/cedict'
import Grammar from '@/lib/grammar'
import HSK from '@/lib/hsk'
import Helper from '@/lib/helper'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/hsk-dictionary.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

let loader = new Loader(['hsk', 'cedict', 'grammar'], function() {
  Helper.loaderMessage('All data loaded.')
  new Vue({
    router,
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
