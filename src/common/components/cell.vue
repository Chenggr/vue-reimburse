<template>
  <div class="my-cell">
    <div class="title">
      {{title}}
    </div>
    <div class="wrap">
      <div class="img-wrap">
        <div class="img"></div>
      </div>
      <div class="content">
        <div class="department">{{department}}</div>
        <div class="username">{{username}}</div>
      </div>
    </div>
    <div class="opinion-wrap">
      <div class="blank"></div>
      <div class="opinion"
           v-if="opinion">审批意见：{{opinion}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyCell',
  props: {
    title: {
      type: String,
      default: ''
    },
    department: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: ''
    },
    opinion: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less">
.my-cell {
  max-height: 100px;
  position: relative;
  margin: 0 16px;
  padding-bottom: 16px;
  &::before {
    content: "";
    position: absolute;
    z-index: 2;
    -webkit-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
    -webkit-transform: scaleY(0.5) translateY(100%);
    transform: scaleY(0.5) translateY(100%);
    bottom: 0;
    left: 0;
    right: auto;
    top: auto;
    width: 100%;
    border-bottom: 0.02667rem solid #e2e4ea;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
  }
  .title {
    font-size: 14px;
    font-weight: bold;
  }
  .wrap {
    margin-top: 6px;
    display: flex;
    .img-wrap {
      width: 40px;
      .img {
        width: 32px;
        height: 32px;
        background: rgba(236, 233, 233, 1);
      }
    }
  }
  .opinion-wrap {
    display: flex;
    margin-top: 14px;
    .blank {
      width: 40px;
    }
    .opinion {
      background: rgba(236, 233, 233, 1);
      width: 100%;
    }
  }
}
</style>