<template>
  <transition name="ec">
    <div v-if="!isSignIn">
      <div v-if="show"
           class="ec-alert">
        <div class="ec-box">
          <div class="ec-box-inner">
            <div class="img-close"
                 @click="success"><img src="@/assets/images/my/tankuangquxiao.png"
                   alt=""></div>
            <div class="img-content"
                 @click="goRouter">
              <img :src="content"
                   alt="">
            </div>
            <!-- <div class="ec-title"
               v-if="title">{{title}}</div>
          <div class="ec-content">{{content}}</div>
          <div class="ec-box-buttons">
            <span class="ec-btn-success"
                  @click="success">{{submitText}}</span>
          </div> -->
          </div>
        </div>
      </div>
    </div>
    <div v-if="isSignIn">
      <div v-if="show"
           class="ec-alert">
        <div class="ec-box">
          <div class="ec-box-inner"
               style="height:100%;">
            <div class="img-close"
                 @click="success"><img src="@/assets/images/my/tankuangquxiao.png"
                   alt=""></div>
            <div class="img-content">
              <div class="top-img">
                <img v-if="type == 'Points'"
                     src="@/assets/images/my/signin/huodeEdou@2x.png"
                     alt="">
                <img v-if="type == 'Cash'"
                     src="@/assets/images/my/signin/jianglijin2@2x.png"
                     alt="">
              </div>
              <div class="desc-1">
                {{desc1}}
              </div>
              <div class="desc-2">
                {{desc2}}
              </div>
            </div>
            <div class="my-btn"
                 @click="goSign"
                 v-if="type == 'Points'">
              <div class="btn">前往查看</div>
            </div>
            <div class="my-btn"
                 @click="goBounty"
                 v-if="type == 'Cash'">
              <div class="btn">前往查看</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import router from '@/router/index.js'
import store from '@/store'
export default {
  data () {
    return {
      isSignIn: false,
      name: 'ec-alert',
      show: false,
      title: '提示',
      content: '',
      submitText: '确定',
      cancelText: '取消',
      goPath: '',
      type: '',
      advNativeParam: '',
      desc1: '',
      desc2: ''
    }
  },

  mounted () {

  },
  computed: {
    ...mapGetters([
      'amuseInfo'
    ])
  },
  methods: {
    ...mapMutations({
      'setAmuseInfo': 'SET_AMUSE_INFO',
      'setParmsData': 'SET_PARMS_DATA'

    }),
    success () {
      this.show = false
    },
    goSign () {
      if (router.history.current.name === 'signIn') {
        this.show = false
      } else {
        this.show = false
        router.push('/signIn')
      }
    },
    goBounty () {
      this.show = false
      router.push('/bounty')
    },
    goRouter () {
      if (this.type === 'WEB') {
        let advNativeParam = JSON.parse(this.advNativeParam)
        window.location.href = advNativeParam.URL_APP_ID
      } else if (this.type === 'URL') {

      } else if (this.type === 'NAT_YLCZ') {
        let advNativeParam = JSON.parse(this.advNativeParam)
        this.show = false
        store.commit('SET_AMUSE_INFO', { productId: advNativeParam.PRODUCT_ID, productName: advNativeParam.ACTION_TITLE })

        router.push('/amusementDetail')
      } else if (this.type === 'NAT_SPXQ') {
        let advNativeParam = JSON.parse(this.advNativeParam)
        this.show = false
        store.commit('SET_PARMS_DATA',
          { itemData: { params: { PRODUCT_ID: advNativeParam.PRODUCT_ID, BLOCK_ID: advNativeParam.MALL_ACTION } } })

        router.push('/productDetail')
      } else if (this.type === 'NAT_WDJLJ') {
        this.show = false
        router.push('/my')
      } else if (this.type === 'NAT_YHQ') {
        this.show = false
        router.push('/coupon')
      } else {
        this.show = false
        router.push('/coupon')
      }
    }

  }
}
</script>
<style lang="less">
.ec-alert {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  .ec-box {
    // width: 80%;
    width: 300px; /*no*/
    height: 416px; /*no*/
    max-width: 400px;
    top: 50%;
    transform: translateY(-208px); /*no*/
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    background: #fff;
    box-sizing: border-box;
    // padding: 20px;
    // border-radius: 6px;
    .ec-box-inner {
      position: relative;
      .img-close {
        position: absolute;
        top: -40px;
        right: 0;
        width: 40px;
        height: 40px;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .my-btn {
        width: 100%;
        position: absolute;
        bottom: 16px;
        height: 40px;
        padding: 0 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #ffdb26;
          border-radius: 4px;
          font-size: 16px; /*no*/
        }
      }
      .img-content {
        .top-img {
          padding-top: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 150px;
            height: auto;
          }
        }
        .desc-1 {
          margin-top: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px; /*no*/
          color: #222;
        }
        .desc-2 {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px; /*no*/
          color: #999;
        }
        img {
          width: 300px; /*no*/
          height: 416px; /*no*/
        }
      }
    }
  }
  .ec-title {
    padding-left: 0;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 700;
    height: 18px;
    color: #333;
  }
  .ec-content {
    padding: 14px 0;
    line-height: 24px;
    color: #48576a;
    font-size: 14px;
  }
  .ec-box-buttons {
    text-align: right;
  }
  .ec-btn-success {
    background: #20a0ff;
    border-color: #20a0ff;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: #fff;
    margin: 0;
    padding: 10px 15px;
    border-radius: 4px;
  }
  .ec-btn-cancel {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c4c4c4;
    color: #1f2d3d;
    margin: 0;
    padding: 10px 15px;
    border-radius: 4px;
  }
}
// .ec-enter {
//   opacity: 0;
//   .ec-box {
//     transform: scale(0);
//   }
// }
// .ec-enter-active {
//   transition: opacity 0.4s;
//   .ec-box {
//     transition: transform 0.4s;
//   }
// }
// .ec-leave-active {
//   transition: opacity 0.2s;
//   .ec-box {
//     transition: transform 0.2s;
//   }
// }
// .ec-leave-active {
//   opacity: 0;
// }
</style>

