<template>
  <div class="my-screen">
    <div class="title">选择金额</div>
    <div class="wrap">
      <div class="item-wrap">
        <div class="item">全部</div>
      </div>
      <div class="item-wrap">
        <div class="item">少于1000元</div>
      </div>
      <div class="item-wrap">
        <div class="item">1000-5000</div>
      </div>
      <div class="item-wrap">
        <div class="item">5000-10000</div>
      </div>
    </div>
    <div class="input-money-wrap">
      <md-input-item title=""
                     type="money"
                     v-model="minMoney"
                     @keydown="onInputKeydown"
                     @change="onInputChange"
                     placeholder="最低金额"></md-input-item>
      <span class="line-box">
        <span class="line"></span>
      </span>
      <md-input-item title=""
                     type="money"
                     v-model="maxMoney"
                     @keydown="onInputKeydown"
                     @change="onInputChange"
                     placeholder="最高金额"></md-input-item>
    </div>
    <div class="wrap wrap-type">
      <div class="item-wrap">
        <div class="item">全部</div>
      </div>
      <div class="item-wrap">
        <div class="item">综合保障</div>
      </div>
      <div class="item-wrap">
        <div class="item">费用差旅</div>
      </div>
      <div class="item-wrap">
        <div class="item">经营费用</div>
      </div>
    </div>
    <div class="btns">
      <div class="btn">重置</div>
      <div class="btn">确认</div>
    </div>
  </div>
</template>  
<script>
export default {
  name: 'MyScreen',
  data () {
    return {
      minMoney: '',
      maxMoney: ''
    }
  },
  methods: {
    onInputKeydown (name, event) {
      console.log(`[Mand Mobile InputItem keydown] ${event.keyCode}`)
    },
    onInputChange (name, value) {
      console.log(`[Mand Mobile InputItem change] ${value}`)
    }
  }
}
</script>
<style lang="less">
.my-screen {
  height: 100%;
  position: relative;
  .btns {
    width: 100%;
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: space-around;
    .btn {
      text-align: center;
      width: 60px;
      border-radius: 4px;
      border: 1px solid #999;
      padding: 4px 8px;
    }
  }
  .title {
    padding: 8px 4px 4px 4px;
    font-size: 14px;
  }
  .wrap {
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
  }
  .wrap-type {
    padding-top: 20px;
  }
  .line-box {
    width: 20px;
  }

  .item-wrap {
    width: 33.3%;

    .item {
      padding: 4px 4px;
      margin: 6px 4px;
      border-radius: 4px;
      border: 1px solid #999;
      text-align: center;
    }
  }

  .input-money-wrap {
    padding: 16px 0;
    display: flex;
    justify-content: space-around;
    height: 40px;
    .line-box {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 100%;

      .line {
        position: absolute;
        top: 50%;
        display: inline-block;
        width: 20px;
        height: 1px;
        border-top: 1px solid #333;
      }
    }
    .md-field-item {
      height: 40px;
    }
    .md-field-item-content {
      height: 40px;
      min-height: 40px;
      .md-field-item {
        height: 40px;
      }
      .md-field-item-content {
        height: 40px;
        min-height: 40px;
      }
    }
    .md-input-item-input {
      height: 40px;
      min-height: 40px;
    }
    .md-field-item {
      font-size: 14px;
      width: 40%;
      display: inline-block;
    }
    .md-input-item.left .md-input-item-fake,
    .md-input-item.left .md-input-item-input {
      text-align: center;
    }
    .md-field-item-control {
      ::-webkit-input-placeholder {
        color: #999;
        font-size: 14px;
        text-align: center;
      }
      ::-moz-placeholder {
        font-size: 14px;
        text-align: center;
      }
      :-ms-input-placeholder {
        font-size: 14px;
        text-align: center;
      }
      :-moz-placeholder {
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
</style>