import axios from 'axios'
// import { uuid } from '../common/filters/filters.js'
// import globalVar from '../common/global_var.js'
import { Toast } from 'mand-mobile'
import { DEBUG } from './config.js'
export const IS_PROD = false // 是否是生产地址

// 本地
export const PROD_URL = DEBUG
  ? '/api'
  : 'https://cloud.bankofchina.com/hb/BOCHB_LDVC/BOCHB_LDVC_SERVER/Bochb_Ldvc_Service'
  // : 'https://cloud.bankofchina.com/hb/TEST/BOCHB_LDVC_SERVER/Bochb_Ldvc_Service' // 测试

// 测试
// export const PROD_URL =
// '/BOCHB_ETCAPPLY_SERVER/Bochb_EtcApply_Service/EtcApply_Service_BocApp'
// 测试
// export const PROD_URL =
//   'https://cloud.bankofchina.com/hb/TEST/BOCHB_ETCAPPLY_SERVER/Bochb_EtcApply_Service/EtcApply_Service_BocApp'
// 生产
// export const PROD_URL =
//   'https://cloud.bankofchina.com/hb/BOCHB_ETC/BOCHB_ETCAPPLY_SERVER/Bochb_EtcApply_Service/EtcApply_Service_BocApp'

export function myHttp (url, dataObject) {
  axios.defaults.timeout = 10000
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.post['Access-Control-Allow-Metclshods'] = 'POST'
  // axios.defaults.headers.post = {
  //   CipherText: globalVar.cipherText
  // }

  // axios.defaults.transformRequest = [\
  //   function(data) {
  //     let publicHeaderData = {
  //       // AppId: 'ETCH5',
  //       // tranUuid: uuid(32, 16)
  //     }
  //     if (data) {
  //       Object.assign(data, publicHeaderData)
  //     }
  //     return data
  //   }
  // ]
  console.log(dataObject)
  // 'MjAxOTA4MjAwMTM3MDJESkRFQUZB'
  // 'MjAxOTA4MjAwMTM3NTVIREJJSUhC'
  // 'MjAxOTA4MDkxNjIyMDFGQkpGSUNF'
  const base64Str = DEBUG
    ? 'MjAxOTA4MzAxNDM2MDBISkRIQkpD'
    : window.sessionStorage.getItem('base64Str')
  // 公共请求
  let publicHeaderData = {
    // body: {
    //   appId: 'ETCH5',
    //   tranUuid: uuid(32, 16),
    //   rtnCode: '',
    //   rtnMsg: '',
    //   // functionId: dataObject.functionId
    //   tokenId: dataObject.tokenId
    // }
    // base64Str: window.sessionStorage.getItem('base64Str')
    base64Str: base64Str
  }

  if (dataObject) {
    Object.assign(publicHeaderData, dataObject)
  }
  // Object.assign(publicHeaderData.tokenId, dataObject)
  // console.log('请求数据===========' + url)
  // console.log(publicHeaderData.base64Str)

  // let newdataObject = JSON.stringify({ body: publicHeaderData.body })
  let newdataObject = JSON.stringify(publicHeaderData)
  // console.log('params')
  // console.log(newdataObject)
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
