import { Toast } from 'mand-mobile'
export function showToast (text) {
  Toast({
    content: text,
    position: 'bottom'
  })
}

// parseQuery (url) {
//   if(url){
//   let params = {}
//   const REG = "/[?&]([^=&#]+)=([^&#]*)/g"
//   let
//   }else{
//     return ''
//   }
// },
export function getQueryString (name, url) {
  if (!url) url = window.location.search
  name = name.replace(/[\\[\]]/g, '\\$&')
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  let results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''

  // 特殊需求定制
  if (results[2].includes('?' + name)) return getQueryString(name, results[2])
  else return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export function setItem (obj) {
  Object.keys(obj).map((k, item) => {
    window.sessionStorage.setItem(k, obj[k])
  })
}

export function saveUserInfo (jsonObj) {
  window.sessionStorage.setItem('userInfo', JSON.stringify(jsonObj))
}

export function getUserInfo () {
  let jStr = window.sessionStorage.getItem('userInfo')
  return jStr ? JSON.parse(jStr) : null
}

export function getRole () {
  let role = getUserInfo()
  if (role && role.roleList) {
    let rs = role.roleList
    // 正总
    if (rs.indexOf('90')) return '00'
    // 人力
    else if (rs.indexOf('00')) return '02'
    // 副行长
    else if (rs.indexOf('95')) return '01'
    // 行长
    else if (rs.indexOf('100')) return '03'
    // 行长
    else return '80' // 高级经理
  } else {
    return ''
  }
}

export function getSingleRole (role) {
  if (role === '11') return '02'
  else if (role === '12') return '00'
  else if (role === '13') return '06'
  else if (role === '14') return '00'
  else return role
}

// 返回状态描述
export function getStatusDesc (reqStatus) {
  switch (reqStatus) {
    case '00':
      return '负责人待审批'
    case '01':
      return '分管行领导待审批'
    case '02':
      return '人力资源部待审批'
    case '03':
      return '省行行长待审批'
    case '04':
      return '批准'
    case '05':
      return '未批准'
    case '06':
      return '办公室审批'
    case '07':
      return '行领导审批'
    case '91':
      return '分管行领导面谈' // 副行长
    case '92':
      return '流转' // 人力流转
    case '93':
      return '省行行长面谈'
    case '96':
      return '流转'
    case '97':
      return '行领导面谈'
  }
}
export function logCheck (chkType) {
  switch (chkType) {
    case '01':
      return '同意'
    case '02':
      return '不同意'
    case '90':
      return '申请'
    case '91':
      return '面谈'
    case '92':
      return '流转' // 人力流转
    case '93':
      return '面谈'
    case '96':
      return '流转'
    case '97':
      return '行领导面谈'
  }
}

/** str1 > str2 return true */
export function compareDate (str1, str2) {
  let d1 = new Date(str1)
  let d2 = new Date(str2)
  return d1.getTime() > d2.getTime()
}

export function trim (str) {
  return str.replace(/^\s+|\s+$/g, '')
}

export function ltrim (str) {
  return str.replace(/^s+/, '')
}

export function rtrim (str) {
  return str.replace(/^s+$/, '')
}
