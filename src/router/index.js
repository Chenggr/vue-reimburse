import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes
})
// 根据当前 route 位置，更改 header.title 的切换方向
sessionStorage.clear()
sessionStorage.setItem('/', 0)
let historyCount = parseInt(sessionStorage.getItem('historyCount'), 10) || 0

router.beforeEach((to, from, next) => {
  const toIndex = sessionStorage.getItem(to.path)
  const fromIndex = sessionStorage.getItem(from.path)

  if (toIndex) {
    if (
      !fromIndex ||
      parseInt(toIndex, 10) > parseInt(fromIndex, 10) ||
      (toIndex === '0' && fromIndex === '0')
    ) {
      store.commit('updateDirection', { direction: 'forward' })
    } else {
      store.commit('updateDirection', { direction: 'reverse' })
    }
  } else {
    historyCount += 1
    sessionStorage.setItem('historyCount', historyCount)
    to.path !== '/' && sessionStorage.setItem(to.path, historyCount)
    store.commit('updateDirection', { direction: 'forward' })
  }

  next()
})

// 更新 html.title
router.afterEach(route => {
  const pre = ''
  const { title } = route.meta
  document.title = title ? `${pre}  ${title}` : pre
})

export default router
