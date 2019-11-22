<template>
  <div class="view">
    <h1>123123</h1>
    <h1>123123</h1>

    <pullup />
  </div>
</template>

<script>
import Pullup from './components/pullup.vue'
export default {
  components: {
    Pullup
  }
}
</script>

<style lang="less">
.view {
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  // padding: 20px;
  background: #fff;
  transform: translate3d(0, 0, 0);
  padding-bottom: 44px;
}
</style>