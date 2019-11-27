// 压缩方法
function dealImage (base64, w, callback) {
  var newImage = new Image()
  var quality = 0.6 //压缩系数0-1之间
  newImage.src = base64
  newImage.setAttribute('crossOrigin', 'Anonymous') //url为外域时需要
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
    var base64 = canvas.toDataURL('image/jpeg', quality) //压缩语句
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
    callback(base64) //必须通过回调函数返回，否则无法及时拿到该值
  };
}

// 使用压缩
dealImage(oldBase64, 800, printing)
function printing (base64) {
  console.log('压缩后', base64.length / 1024)
}

// 获取base64图片大小，返回kb数字
function showSize (base64url) {
  // 把头部去掉
  var str = base64url.replace('data:image/png;base64,', '')
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
  var size = '';
  size = (fileLength / 1024).toFixed(2)
  var sizeStr = size + ''; // 转成字符串
  var index = sizeStr.indexOf('.') //获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2) //获取小数点后两位的值
  if (dou == '00') {
    // 判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size
}
var size = showSize(imagebase64)

// 字节数转化为kb,MB,GB
function change (limit) {
  var size = '';
  if (limit < 0.1 * 1024) {
    // 小于0.1KB，则转化成B
    size = limit.toFixed(2) + 'B';
  } else if (limit < 0.1 * 1024 * 1024) {
    // 小于0.1MB，则转化成KB
    size = (limit / 1024).toFixed(2) + 'KB';
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    // 小于0.1GB，则转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + 'MB';
  } else {
    // 其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  }

  var sizeStr = size + ''; // 转成字符串
  var index = sizeStr.indexOf('.') //获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2) //获取小数点后两位的值
  if (dou == '00') {
    // 判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size
}
