<template>
  <div class="my-screen">
    <div class="title">选择金额</div>
    <div class="wrap">
      <div class="item-wrap"
           v-for="(option,index) of options1"
           :key="index">
        <div class="item"
             :class="{'click-item':option.isClick}"
             @click="clickOption1(option,index)">{{option.name}}</div>
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
      <div class="item-wrap"
           v-for="(option,index) of options2"
           :key="index">
        <div class="item"
             :class="{'click-item':option.isClick}"
             @click="clickOption2(option,index)">{{option.name}}</div>
      </div>

    </div>
    <div class="btns">
      <div class="btn"
           @click="reset">重置</div>
      <div class="btn"
           @click="sure">确认</div>
    </div>
  </div>
</template>  
<script>
export default {
  name: 'MyScreen',
  data () {
    return {
      minMoney: '',
      maxMoney: '',

      checkedObj1: {},
      checkedObj2: {}

    }
  },
  props: {
    options1: {
      type: Array,
      default: []
    },
    options2: {
      type: Array,
      default: []
    }
  },
  methods: {
    sure () {
      this.options1.forEach((item, index) => {
        if (item.isClick) {
          this.checkedObj1 = item
        }
      })
      this.options2.forEach((item, index) => {
        if (item.isClick) {
          this.checkedObj2 = item
        }
      })
      this.$emit('sure', this.checkedObj1, this.checkedObj2)
    },
    reset () {
      this.$emit('reset')
    },
    clickOption1 (val, index) {
      this.$emit('clickOption1', val)
      this.options1.forEach((item, i) => {
        if (i === index) {
          this.options1[i].isClick = true
        } else {
          this.options1[i].isClick = false
        }
      })
    },
    clickOption2 (val, index) {
      this.$emit('clickOption2', val)
      this.options2.forEach((item, i) => {
        if (i === index) {
          this.options2[i].isClick = true
        } else {
          this.options2[i].isClick = false
        }
      })
    },
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
    .click-item {
      background: #49a3e6;
      border: 1px solid #49a3e6;
      color: #fff;
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