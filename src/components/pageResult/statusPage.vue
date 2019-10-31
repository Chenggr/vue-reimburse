<template>
  <div class="page-result">
    <img :src="imgUrl" />
    <span>{{text}}</span>
  </div>
</template>
<script>
export default {
  name: 'StatusPage',
  props: {
    text: {
      type: String,
      default: '暂无数据'
    },
    imgUrl: {
      type: String,
      default: require('@/assets/images/result.png')
    }
  }
}
</script>
<style lang="less">
.page-result {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // visibility: hidden;
  img {
    outline: 0;
    border: none;
    max-width: 32%;
    max-height: 32%;
  }
  span {
    display: inline-block;
    color: #a5a5a5;
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>

