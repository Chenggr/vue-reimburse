export function dateFormat (fmt, date) {
  let ret
  let opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
}

export function get3MonthBefor () {
  /* eslint-disable */
  var resultDate, year, month, date, hms
  var currDate = new Date()
  year = currDate.getFullYear()
  month = currDate.getMonth() + 1
  date = currDate.getDate()
  hms =
    currDate.getHours() +
    ':' +
    currDate.getMinutes() +
    ':' +
    (currDate.getSeconds() < 10
      ? '0' + currDate.getSeconds()
      : currDate.getSeconds())
  switch (month) {
    case 1:
    case 2:
    case 3:
      month += 9
      year--
      break
    default:
      month -= 3
      break
  }
  month = month < 10 ? '0' + month : month

  resultDate = year + ',' + month + ',' + date // resultDate = year + '-' + month + '-' + date + ' ' + hms
  return resultDate
}
