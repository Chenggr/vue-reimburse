// 金额货币
const digitsRE = /(\d{3})(?=\d)/g
let money = (value, currency, decimals) => {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  // currency = currency != null ? currency : '￥' // 数字前$符
  currency = currency != null ? currency : ''
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  var i = _int.length % 3
  // var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? '' : '') : ''
  var _float = decimals ? stringified.slice(-1 - decimals) : ''
  var sign = value < 0 ? '-' : ''
  return (
    // sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
    sign + currency + head + _int.slice(i).replace(digitsRE, '$1') + _float
  )
}
let filterDate = () => {
  var date = new Date()
  var seperator1 = '-'
  var seperator2 = ':'
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    ' ' +
    date.getHours() +
    seperator2 +
    date.getMinutes() +
    seperator2 +
    date.getSeconds()
  return currentdate
}

let uuid = (len, radix) => {
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
export { money, filterDate, uuid }
