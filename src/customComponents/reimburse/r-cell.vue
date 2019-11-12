<template>
  <div class="reimburse-cell">
    <van-swipe-cell ref="swipeCell"
                    v-for="item of list"
                    :key="item.id"
                    :on-close="onClose">
      <template slot="left">
        <div class="big-wrap"
             @click="changeChecked(item)">
          <div class="right-wrap">
            <van-icon name="success"
                      v-show="item.isChecked" />
          </div>
        </div>
      </template>
      <div class="cell-content">
        <div class="cell-left">
          <div class="item">{{item.title1}}</div>
          <div class="item">{{item.title2}}</div>
        </div>
        <div class="cell-middle">
          <div class="item">{{item.date}}</div>
          <div class="item">{{item.money}}</div>
        </div>
        <div class="cell-right">
          <div class="item">{{item.status}}</div>
          <div class="">
            <div class="edit">{{item.edit}}</div>
          </div>
        </div>
      </div>
      <template slot="right">
        删除
      </template>
    </van-swipe-cell>
    <!-- <div @click="openAll">openAll</div> -->
    <div class="submit">提交</div>
  </div>
</template>
<script>
import { SwipeCell, Cell, Icon } from 'vant'
export default {
  name: 'RCell',
  components: {
    VanSwipeCell: SwipeCell,
    VanCell: Cell,
    VanIcon: Icon
  },
  props: {
    list: Array
  },
  computed: {

  },
  methods: {
    changeChecked (item) {
      this.$emit('change', item)
    },
    openAll () {
      console.log(this.list.length)
      for (let i = 0; i < this.list.length; i++) {
        this.$refs['swipeCell'][i].open('left')
      }
    },
    open (position, item) {
      console.log('position:')
      console.log(position)
      console.log(item.title1)
      this.$emit('open', item)
    },
    onClose (clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
          console.log('left')
          break
        case 'cell':
          console.log('cell')
          break
        case 'outside':
          console.log('outside')
          break
        case 'right':
          console.log('right')

          break
      }
    }

  }
}
</script>
<style lang="less">
.reimburse-cell {
  .cell-content {
    display: flex;
    justify-content: space-between;
  }

  .cell-left,
  .cell-middle,
  .cell-right {
    margin: 8px 0;
    .item {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 16px;
    }
  }
  .cell-content {
    background: #eee;
    border-radius: 10px;
    margin: 8px 4px;
    box-shadow: 2px 2px 5px #888;
  }
  .cell-right {
    .edit {
      display: flex;
      align-items: center;
      margin: 0 8px;
      padding: 4px 16px;
      background-color: #333;
      color: #fff;
      border-radius: 20px;
    }
  }
  .van-swipe-cell__left {
    display: flex;
    align-items: center;
    padding: 0 4px;
    .big-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    .right-wrap {
      border-radius: 50%;
      border: 2px solid #333;
      width: 40px;
      height: 40px;
      font-size: 30px;

      .van-icon-success {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>