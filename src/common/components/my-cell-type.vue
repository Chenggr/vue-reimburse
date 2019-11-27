<template>
  <div class="view-cell-type">
    <div class="my-cell-type"
         v-if="type == '1'"
         v-for="(item,index) of list"
         :key="index">
      <div class="left-type-btn"
           @click="onType">{{item.type}}</div>
      <div class="right-date"
           v-if="item.date">{{item.date}}</div>
      <div class="right-money">{{item.money}}</div>
    </div>

    <div class="my-cell-type-2"
         v-if="type == '2'">
      <div class="title">
        <div class="title-item">费用类型</div>
        <div class="title-item">金额</div>
        <div class="title-item">发票张数</div>
      </div>
      <div class="cell"
           v-for="(item,index) of list"
           :key="index">
        <div class="item"
             @click="onType">
          <span class="type"> {{item.type}}</span>
        </div>
        <div class="item">{{item.money}}</div>
        <div class="item">{{item.count}}</div>
      </div>
      <div class="cell">
        <div class="item">合计</div>
        <div class="item">2874.00元</div>
        <div class="item">4</div>
      </div>
    </div>

    <div class="btn-add"
         @click="addBtn">
      <van-icon name="plus" />
    </div>
  </div>
</template>
<script>
import { Icon } from 'vant'
export default {
  name: 'my-cell-type',
  components: {
    VanIcon: Icon
  },
  props: {
    type: {
      type: String
    },
    list: {
      type: Array
    }
  },
  data () {
    return {

    }
  },
  methods: {
    addBtn () {
      this.$emit('addBtn')
    },
    onType () {
      this.$emit('onType')
    }
  }
}
</script>
<style lang="less">
.view-cell-type {
  .my-cell-type-2 {
    color: #323233;
    .title {
      display: flex;
      padding: 10px 6px 6px 6px;
      .title-item {
        flex: 1;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .cell {
      display: flex;
      padding: 6px;
      .item {
        flex: 1;

        display: flex;
        justify-content: center;
        align-items: center;
      }
      .type {
        border: 1px solid #323233;
        border-radius: 4px;
        padding: 2px 10px;
      }
    }
  }
  .my-cell-type {
    color: #323233;
    display: flex;
    align-items: center;
    padding: 10px 0;
    .left-type-btn {
      border: 1px solid #323233;
      border-radius: 4px;
      padding: 2px 10px;
    }
    .right-money {
      margin-left: 30px;
    }
    .right-date {
      margin-left: 30px;
    }
    .right-count {
      margin-left: 30px;
    }
  }
  .btn-add {
    margin: 6px 8px 12px 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.87);
    .van-icon-plus {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: #323233;
    }
  }
}
</style>
