<template>
  <div v-watermark="'ABC'">
    <h1>demo</h1>
    <md-button @click="_requestTest()">测试</md-button>
    <br>
    <nav-bar title="标题"
             left-text="返回"
             right-text="按钮"
             left-arrow
             @click-left="onClickLeft"
             @click-right="onClickRight" />
    <x-button type="primary"
              action-type="button">submit</x-button>
    <br>
    <div @dblclick="doubleClick">doubleClick</div>
    <br>
    <div @click="onClick">onClick</div>
    <br>
    <div v-doubleTap="{methods: doubleTap, arg: {index:4,item:'doubleTap'}}">doubleTap</div>
    <h1>123</h1>
    <h1>123</h1>
    <h1>123</h1>
    <h1>123</h1>
    <h1>123</h1>
    <h1>123</h1>
    <h1>123</h1>
    <h1>123</h1>
    <h1>123</h1>
    <h1>123</h1>
    <h1>123</h1>
    <h1>123</h1>
    <h1>123</h1>
  </div>
</template>
<script>
import { XButton } from 'vux'
import { NavBar } from 'vant'
import { myHttp, PROD_URL } from 'config/http'
import { Toast, Button } from 'mand-mobile'
export default {
  name: 'demo',
  components: {
    [Toast.name]: Toast,
    [Button.name]: Button,
    NavBar,
    XButton
  },
  data () {
    return {
      arg: { index: 10, item: 'test' }
    }
  },
  created () {
    // this._requestTest()
  },
  methods: {
    doubleTap (e, args) {
      var self = this
      self.msg = 'doubleTap'
      console.log('tap index:' + args.index + 'item:' + args.item)
    },
    onClick () {
      console.log('onClick')
    },
    doubleClick () {
      console.log('doubleClick')
    },
    onClickLeft () {
      Toast('返回')
    },
    onClickRight () {
      Toast('按钮')
    },
    _requestTest () {
      myHttp(PROD_URL + '/VAC001',
        {
          // tokenId: window.localStorage.getItem('tokenId')
          tokenId: '12335'
        }).then(res => {
          if (res.rtnCode === '0000') {
            Toast.info(res.data.appName)
          } else {
            Toast.info(res.rtnMsg)
          }
        })
    }
  }

}
</script>
