<template>
  <div id="app">
    <v-header slot="header"></v-header>
    <transition :name="routerTransition">
      <router-view class="router-view" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',

  computed: {
    ...mapState([
      'direction'
    ]),
    routerTransition () {
      const pre = 'vux-pop-'
      const forward = `${pre}in`
      const reverse = `${pre}out`
      return this.direction === 'forward' ? forward : reverse
    }
  }
}
</script>

<style lang="less">
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

.mint-indicator-wrapper {
  z-index: 2147483647;
}
.mint-toast {
  z-index: 2147483647 !important;
}

#header-one-card {
  z-index: 499 !important;
  .right-color {
    display: flex;
    align-items: center;
    img {
      width: 22px;
      height: 22px;
    }
    .guanbi-img {
      display: inline-block;
      margin-left: 20px;
    }
  }
  .left-color {
    display: flex;
    align-items: center;

    span {
      display: inline-block;
    }
    img {
      display: inline-block;
      width: 22px;
      height: 22px;
    }
  }
  img {
    width: 20px;
    height: 20px;
  }
  .vux-header-right {
    color: #222;
  }
  .vux-header-title {
    color: #222;
  }
}

// routerTransition 的样式
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  position: absolute;
  // top: 46px;
  top: 0;
  height: 100%;
  backface-visibility: hidden;
  perspective: 1000;

  transition: all 0.3s;
  will-change: transform;
}

.vux-pop-out-enter,
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active,
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
body {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  background: #efefef;
}

// #app {
//   height: 100%;
// }

// 公共样式
.router-view {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: 44px;

  background: #efefef;
}
</style>
