<template lang="html">
    <div class="my-loading-box">
        <div ref="animation" class="my-loading" v-show="showLoading"></div> 
        <!-- <div ref="animation2" class="my-pulldown" v-show="showPulldown"></div>  -->
    </div>
</template>
<script>
import lottie from 'lottie-web'
import loading from './loading.json'
// import jiazaizhong from './jiazaizhong.json'
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.anim = lottie.loadAnimation({
      container: this.$refs.animation,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loading
    })
    // this.anim2 = lottie.loadAnimation({
    //   container: this.$refs.animation2,
    //   renderer: 'svg',
    //   loop: true,
    //   autoplay: true,
    //   animationData: jiazaizhong
    // })
  },
  props: {
    showLoading: false,
    showPulldown: false,
    showToast: false
  }
}
</script>
<style lang="less">
.my-loading-box {
  // background: rgba(0, 0, 0, 0.5);
  // position: fixed;
  // left: 0;
  // top: 0;
  // width: 100%;
  // height: 100%;
  .my-loading {
    // margin-top: 3rem;
    position: absolute;
    top: 50%;
    margin-top: -80px;
    left: 50%;
    margin-left: -50px;
    width: 100px;
    height: 100px;
    // border: 1px solid red;
  }
  .my-pulldown {
    position: absolute;
    top: 44px; /*no*/
    left: 50%;
    margin-left: -30px;
    width: 60px;
    height: 60px;
  }
}
</style>