import alert from './alert/index.js'
import confirm from './confirm/index.js'
// import loading from './loading/index.js'

const install = function (Vue) {
  // 注册全局组件
  Vue.component(alert.name, alert)
  // Vue.component(loading.name, loading)
  Vue.component(confirm.name, confirm)
  // 添加全局API
  Vue.prototype.$myAlert = alert
  // Vue.prototype.$myLoading = loading
  Vue.prototype.$myConfirm = confirm
}
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default install
