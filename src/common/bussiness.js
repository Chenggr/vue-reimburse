export function resolveResult (result) {
  console.log(result)
  let newResult = []
  result.result.forEach((item, index) => {
    console.log(item['bean_' + item.type])
    let obj = {}
    switch (item.type) {
      // 火车票
      case '10200':
        obj = {
          type: item.type,
          type_msg: item.type_msg,
          invoice_no: item['bean_' + item.type].invoice_no.item_words, // 票号
          date_time: item['bean_' + item.type].date_time.item_words, // 乘车日期
          amount_little: item['bean_' + item.type].amount_little.item_words // 车票金额
        }
        newResult.push(obj)
        break;
      // 航空票
      case '10202':
        obj = {
          type: item.type,
          type_msg: item.type_msg,
          fare: item['bean_' + item.type].fare.item_words, // 票价
          fuel_surcharge: item['bean_' + item.type].fuel_surcharge.item_words // 燃油附加费
        }
        newResult.push(obj)
        break;
      default:
        break
    }
  })

  return newResult
}
