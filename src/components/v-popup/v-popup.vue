<template>
  <div>
    <div id="popup-deal-record"
         v-transfer-dom>
      <popup v-model="popup1"
             position="bottom"
             max-height="50%">
        <div class="popup-title">选择时间
          <div class="close"
               @click="closePopup()"><img src=""
                 alt=""></div>
        </div>
        <scroller lock-x
                  height="220px"
                  ref="scrollerEvent">
          <group>
            <cell v-for="item of list"
                  is-link
                  :title="item.title"
                  :key="item.id"></cell>
          </group>
        </scroller>
      </popup>
    </div>
  </div>
</template>
<script>
import { Cell, Group, Popup, Scroller, TransferDom } from 'vux'
export default {
  /*
    TODO
    v-popup 遇到问题 未完成未使用
  */
  name: 'VPopup',
  directives: {
    TransferDom
  },
  components: {
    Cell,
    Group,
    Popup,
    Scroller
  },
  props: {
    list: Array,
    popup1: Boolean
  },
  methods: {
    closePopup () {
      this.$emit('close')
    }
  }
  // computed: {
  //   popup1 (pop) {
  //     console.log(pop)
  //     // return false
  //   }
  // }
}
</script>
<style lang="less">
#popup-deal-record {
  .weui-cell {
    padding: 16px 16px;
  }
  .vux-no-group-title {
    margin-top: 0;
  }
  .vux-popup-dialog {
    background-color: #fff;
    position: fixed;
    // top: 0;
  }
  .popup-title {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    font-size: 14px; /*no*/
    color: #999;
    margin: 10px 16px 10px 16px;

    .close {
      display: inline-block;
      position: absolute;
      right: 0;
      img {
        display: inline-block;
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>
