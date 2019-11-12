// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import store from './store'
import vConfig from './index'
import watermark from 'vue-watermark-directive'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css' // 本地css

import 'jquery'
import 'styles/reset.css'
// import 'styles/border.css'

import './assets/styles/semantic.min.css'

import 'lib-flexible'
// import QRCode from 'qrcodejs2'
import * as customFilters from './common/filters/filters'

// eslint-disable-next-line
// import vConsole from 'vconsole'

import globalVar from './common/global_var.js'
import cal from './common/calculation.js'
// import VueLazyLoad from 'vue-lazyload'

import plLazy from '@/components/pl-lazy/plLazy'
import { DEBUG } from './config/config.js'

// Vue.prototype.DEBUG = DEBUG
// import vueFinger from 'vue-finger-directive'
// Vue.use(vueFinger)
Vue.use(VueAwesomeSwiper)
Vue.use(mandMobile)

Vue.prototype.DEBUG = DEBUG
Vue.prototype.GLOBAL = globalVar
Vue.prototype.cal = cal

FastClick.attach(document.body)

Vue.use(vConfig)
Vue.use(VueRouter)

Vue.component('pl-lazy', plLazy)

const DEFAULT_CONFIG = {
  zIndex: 1000,
  font: '16px microsoft yahei',
  color: 'rgba(0,0,0,0.05)',
  content: 'Hello World',
  rotate: 20,
  width: 100,
  height: 100,
  repeat: true
}

Vue.config.productionTip = false
Vue.use(watermark, DEFAULT_CONFIG)
// Vue.use(VueLazyLoad, {
//   loading: require('@/assets/logo@2x.png'),
//   error: require('@/assets/logo@2x.png')
// })

Object.keys(customFilters).forEach(key => {
  Vue.filter(key, customFilters[key])
})

// 自定义指令页面title实时更新
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})
// document.addEventListener('deviceready', function () {
/* eslint-disable no-new */
new Vue({
  router,
  store,
  // QRCode,
  render: h => h(App)
}).$mount('#app-box')
// })
