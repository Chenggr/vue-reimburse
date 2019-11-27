import { Toast } from 'mand-mobile'
export function showToast (text) {
  Toast({
    content: text,
    position: 'bottom'
  })
}

export function uuid (len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    ''
  )
  let uuid = []
  let i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    // rfc4122, version 4 form
    var r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

// 获取base64图片大小，返回kb数字
export function showSize (base64url) {
  // 把头部去掉
  var str
  if (base64url.indexOf('data:image/png;base64,') != -1) {
    str = base64url.replace('data:image/png;base64,', '')
  } else if (base64url.indexOf('data:image/jpeg;base64,') != -1) {
    str = base64url.replace('data:image/jpeg;base64,', '')
  } else if (base64url.indexOf('data:image/jpg;base64,') != -1) {
    str = base64url.replace('data:image/jpg;base64,', '')
  }

  // 找到等号，把等号也去掉
  var equalIndex = str.indexOf('=')
  if (str.indexOf('=') > 0) {
    str = str.substring(0, equalIndex)
  }
  // 原来的字符流大小，单位为字节
  var strLength = str.length
  // 计算后得到的文件流大小，单位为字节
  var fileLength = parseInt(strLength - (strLength / 8) * 2)
  // 由字节转换为kb
  var size = ''
  size = (fileLength / 1024).toFixed(2)
  var sizeStr = size + '' // 转成字符串
  var index = sizeStr.indexOf('.') // 获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2) // 获取小数点后两位的值
  if (dou == '00') {
    // 判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size
}

export function dealImage (base64, w, callback) {
  var newImage = new Image()
  var quality = 1 // 压缩系数0-1之间
  newImage.src = base64
  newImage.setAttribute('crossOrigin', 'Anonymous') // url为外域时需要
  var imgWidth, imgHeight
  newImage.onload = function () {
    imgWidth = this.width
    imgHeight = this.height
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    if (Math.max(imgWidth, imgHeight) > w) {
      if (imgWidth > imgHeight) {
        canvas.width = w
        canvas.height = (w * imgHeight) / imgWidth
      } else {
        canvas.height = w
        canvas.width = (w * imgWidth) / imgHeight
      }
    } else {
      canvas.width = imgWidth
      canvas.height = imgHeight
      quality = 0.6
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
    var base64 = canvas.toDataURL('image/jpeg', quality) // 压缩语句
    // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
    // while (base64.length / 1024 > 150) {
    // 	quality -= 0.01;
    // 	base64 = canvas.toDataURL("image/jpeg", quality);
    // }
    // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
    // while (base64.length / 1024 < 50) {
    // 	quality += 0.001;
    // 	base64 = canvas.toDataURL("image/jpeg", quality);
    // }
    callback(base64) // 必须通过回调函数返回，否则无法及时拿到该值
  }
}

export function currentTime () {
  let myDate = new Date()
  console.log(myDate.getHours())
  console.log(myDate.getMinutes())
  console.log(myDate.getSeconds())
  console.log(myDate.toLocaleTimeString())
  return myDate.toLocaleTimeString()
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
