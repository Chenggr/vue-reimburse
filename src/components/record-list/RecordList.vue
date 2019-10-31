<template>
  <div class="view-record-list">
    <div class="list-box border-bottom"
         @click="selectItem(item)"
         v-for="item of list"
         :key="item.id">
      <div class="list-left">
        <div class="list-img"
             v-if="item.img"><img :src="item.img"
               alt=""></div>
        <div class="list-content">
          <div class="list-desc">{{item.orderDesc}}</div>
          <div class="list-datetime">{{item.orderCreateDate}} {{item.orderCreateTime}}</div>
        </div>
      </div>
      <div class="list-right">
        <div>{{item.orderAmt}}</div>
        <div class="list-paydesc"
             :style="item.orderStat == 'CF'?'color:#00e158;':''">{{item.orderStatDesc}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RecordList',
  props: {
    list: Array,
    desc: String,
    datetime: String
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    }
  }
}
</script>
<style lang="less">
.view-record-list {
  margin-top: 4px; /*no*/
  background-color: #fff;
  margin: 0 16px;
  .border-bottom:last-child {
    &::before {
      border: none;
    }
  }
  .list-box {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 22px 0;
  }
  .list-content {
    margin-left: 12px;
    .list-desc {
      font-size: 14px; /*no*/
    }
    .list-datetime {
      font-size: 12px; /*no*/
      color: #999;
    }
  }
  .list-right {
    font-size: 14px; /*no*/
    text-align: right;
    .list-paydesc {
      font-size: 12px; /*no*/
      color: #999;
    }
  }

  .list-left {
    display: flex;
  }
  .list-img {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
