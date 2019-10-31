export function weixinShare () {
  alert('调用微信分享')
  window.c_plugins.merchantBridge.weixinShare(
    function () {
      alert('suc')
    },
    function (err) {
      alert(err.message || err || '网络错误，请检查网络连接')
    },
    {
      url: 'www.boc.cn',
      title: '中国银行',
      description: '中国银行网银客户端',
      img: ''
    }
  )
}
