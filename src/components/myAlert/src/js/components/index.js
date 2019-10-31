import alert from './alert/index.js'

const install = function (Vue) {
  // 注册全局组件
  Vue.component(alert.name, alert)
  // 添加全局API
  Vue.prototype.$myAlert = alert
}
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default install
