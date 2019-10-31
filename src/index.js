import vComponents from './components'
import Axios from 'axios'
import { Indicator, Toast } from 'mint-ui'

// 配置 Axios 拦截器

Axios.interceptors.request.use(
  config => {
    Indicator.open()
    return config
  },
  err => {
    Toast({
      message: '网络异常',
      position: 'middle',
      duration: 1500
    })
    return Promise.reject(err)
  }
)

Axios.interceptors.response.use(
  res => {
    Indicator.close()
    return res
  },
  err => {
    Indicator.close()
    Toast({
      message: '网络异常',
      position: 'middle',
      duration: 1500
    })
    return Promise.reject(err)
  }
)

// 需要 vue.use 的项
const install = Vue => {
  Vue.use(vComponents)
}

export default {
  install
}
