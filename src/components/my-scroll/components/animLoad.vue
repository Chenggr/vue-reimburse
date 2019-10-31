<template>
  <div>

    <div ref="animation"
         class="my-pulldown"></div>
  </div>
</template>
<script>
import lottie from 'lottie-web'
import jiazaizhong from '@/components/myComponents/myLoading/jiazaizhong.json'
export default {
  mounted () {
    this.anim = lottie.loadAnimation({
      container: this.$refs.animation,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: jiazaizhong
    })
  }
}
</script>
