import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import drawer from './modules/drawer'
import state from './state'

import loading from './modules/loading'
import alert from './modules/alert'
import toast from './modules/toast'

import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    drawer,
    loading,
    alert,
    toast
  },
  state,
  getters,
  actions,
  mutations,
  strict: false,
  plugins: debug ? [createLogger()] : []
})

// 热重载
if (module.hot) {
  module.hot.accept(
    [
      './modules/drawer',
      './modules/loading',
      './modules/alert',
      './modules/toast'
    ],
    () => {
      store.hotUpdate({
        modules: {
          drawer: require('./modules/drawer').default,
          loading: require('./modules/loading').default,
          alert: require('./modules/alert').default,
          toast: require('./modules/toast').default
        }
      })
    }
  )
}
export default store
// const store = new Vuex.Store({
//   modules: {
//     drawer
//   },
//   state: {
//     direction: 'forward'
//   },
//   mutations: {
//     updateDirection(state, payload) {
//       console.log('updateDirection' + state, payload)
//       const {direction} = payload
//       state.direction = direction
//     }
//   }
// })
//
// export default store
