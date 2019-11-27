import axios from 'axios'
// import { uuid } from '../common/filters/filters.js'
// import globalVar from '../common/global_var.js'
import { Toast } from 'mand-mobile'
import { DEBUG } from './config.js'

// 本地
export const PROD_URL = DEBUG
  ? '/api'
  : 'https://cloud.bankofchina.com/hb/BOCHB_LDVC/BOCHB_LDVC_SERVER/Bochb_Ldvc_Service'
// : 'https://cloud.bankofchina.com/hb/TEST/BOCHB_LDVC_SERVER/Bochb_Ldvc_Service' // 测试

export function myHttp (url, dataObject) {
  axios.defaults.timeout = 50000
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.post['Access-Control-Allow-Metclshods'] = 'POST'

  // 'MjAxOTA4MjAwMTM3MDJESkRFQUZB'
  // 'MjAxOTA4MjAwMTM3NTVIREJJSUhC'
  // 'MjAxOTA4MDkxNjIyMDFGQkpGSUNF'

  // const base64Str = DEBUG
  //   ? 'MjAxOTA4MzAxNDM2MDBISkRIQkpD'
  //   : window.sessionStorage.getItem('base64Str')
  // 公共请求

  let publicHeaderData = {
    // base64Str:base64Str
    appServiceKey: '123456'
  }
  let publicBody = {
    ehrOrgNo: '11780',
    ehrId: '6111603',
    ehrOrgName: ''
  } // body的公共请求
  Object.assign(dataObject.body, publicBody)
  if (dataObject) {
    Object.assign(publicHeaderData, dataObject)
  }
  publicHeaderData.body = JSON.stringify(publicHeaderData.body)

  let newdataObject = JSON.stringify(publicHeaderData)

  return axios
    .post(url, newdataObject)
    .then(res => {
      console.log('返回数据================')
      console.log(res)

      return Promise.resolve(res.data)
    })
    .catch(err => {
      console.log(err)
      console.log('网络异常')
    })
    .finally(() => {
      Toast.hide()
    })
}

// export default axios
