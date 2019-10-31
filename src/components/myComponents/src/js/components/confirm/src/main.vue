<template>
  <transition name="ec">
    <div v-if="show"
         class="ec">
      <div class="ec-box">
        <div class="ec-box-container">
          <div class="ec-box-inner">
            <div class="ec-title"
                 v-if="title">
              <img src="../../../../../../../assets/images/home/ic_error.png"
                   alt=""> {{title}}
            </div>
            <div class="ec-content">{{content}}</div>
            <div class="ec-box-buttons">

              <div class="ec-btn-cancel"
                   @click="success">{{submitText}}</div>
              <div class="ec-btn-success"
                   @click="cancel">{{cancelText}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>

import router from '@/router/index.js'
export default {
  data () {
    return {
      name: 'ec-alert',
      show: false,
      title: '提示',
      content: '',
      submitText: '确定',
      cancelText: '取消',
      isBack: false
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {

    success () {
      this.show = false
      console.log('successFn')
    },
    cancel () {
      console.log('this.goOrder')
      console.log(this.goOrder)
      if (this.isBack) {
        this.show = false
      } else {
        this.show = false
        router.push('/')
      }
    }
  }
}
</script>
<style lang="less">
.ec {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  .ec-box {
    width: 80%;
    max-width: 260px;
    height: 160px;

    position: absolute;
    top: 50%;
    transform: translateY(-100px);
    left: 0;
    right: 0;
    margin: auto;
    background: #fff;
    box-sizing: border-box;
    border-radius: 4px;
  }
  .ec-box-container {
    position: relative;
    height: 100%;
    background-color: #f5f5f5;
    border-radius: 4px;
  }
  .ec-title {
    display: flex;
    align-items: center;
    padding: 18px 16px;

    font-size: 14px;
    font-weight: 700;
    height: 18px;
    color: #333;
    img {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  }
  .ec-content {
    padding: 24px 16px;
    line-height: 24px;
    color: #222;
    font-size: 16px;
    text-align: center;
  }
  .ec-box-buttons {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
  }
  .ec-btn-success {
    height: 100%;
    width: 50%;
    background: #ffe100;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: #222;
    margin: 0;
    padding: 10px 15px;
    border-bottom-right-radius: 4px;
  }
  .ec-btn-cancel {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    text-align: center;
    color: #1f2d3d;
    margin: 0;
    padding: 10px 15px;
    border-bottom-left-radius: 4px;
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

