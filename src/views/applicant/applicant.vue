<template>
  <div class="view-applicant">
    <van-tabs v-model="activeName"
              sticky
              :offset-top="44"
              class="my-tab-top">
      <van-tab title="我的待办"
               name="todo">
        <div class="my-todo-wrap">
          <div class="action-buttons">
            <div class="date-search"
                 @click="onDateSearch">
              {{DateSearch}}
              <van-icon name="arrow" />
            </div>
            <div class="screening-btn"
                 @click="onScreening">
              <span>筛选</span>
              <van-icon name="filter-o"
                        style="margin-top:-2px;"
                        size="16px" />
            </div>
          </div>
          <div class="list-wrap">
            <div class="reimburse-cell"
                 ref="reimburse">
              <md-scroll-view ref="scrollView"
                              v-show="!isEmpty"
                              manual-init
                              :scrolling-x="false"
                              @end-reached="$_onEndReached">
                <van-swipe-cell ref="swipeCell"
                                v-for="item of todoList"
                                :key="item.index"
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
                    <!-- 删除 -->
                  </template>
                </van-swipe-cell>
                <md-scroll-view-more slot="more"
                                     :is-finished="isFinished"
                                     :finished-text="finishedText">
                </md-scroll-view-more>
              </md-scroll-view>

              <!-- <div @click="openAll">openAll</div> -->

            </div>
          </div>
        </div>
        <div class="btn-bottom-wrap">
          <div class="add-proj"
               v-show="isShowProjNum">
            <div>共计:{{projNum}}项</div>
            <div>{{projTotalMoney}}元</div>
          </div>
          <div class="btn-wrap">
            <van-button type="default"
                        ref="submits"
                        :class="{'van-button--disabled':!isabled}"
                        @click="submit"
                        size="large">提交</van-button>
          </div>
        </div>
        <van-action-sheet v-model="showDateSearch"
                          title="">
          <van-datetime-picker v-model="currentDate"
                               @confirm="confirmDateSearch"
                               @change="change"
                               type="year-month" />
        </van-action-sheet>
        <!-- 筛选弹框 -->
        <van-popup class="my-popup"
                   :close-on-click-overlay="true"
                   v-model="showScreeningPopup"
                   round>
          <div class="popup-wrap">

            <div class="popup-content">
              内容
            </div>
          </div>
        </van-popup>
        <!-- 筛选弹框 -->
      </van-tab>
      <van-tab title="我的记录"
               name="record">
        <div class="my-record-wrap">
          我的记录
        </div>
      </van-tab>
    </van-tabs>

  </div>

</template>
<script>
import axios from 'axios'
// import calc from '../../common/calculation'
import { ScrollView, ScrollViewMore } from 'mand-mobile'
import { dateFormat } from 'common/filterDate'
import {
  DatetimePicker,
  ActionSheet,
  Tab,
  Tabs,
  Icon,
  SwipeCell,
  Cell,
  Button,
  Toast,
  Popup
} from 'vant'
export default {
  name: 'Applicant',
  components: {
    VanDatetimePicker: DatetimePicker,
    VanActionSheet: ActionSheet,
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore,
    VanTab: Tab,
    VanTabs: Tabs,
    VanIcon: Icon,
    VanSwipeCell: SwipeCell,
    VanCell: Cell,
    VanButton: Button,
    VanPopup: Popup
  },

  data () {
    return {
      isEmpty: false,
      isFinished: false,
      projTotalMoney: 0,
      projNum: 0,
      activeName: 'todo',
      isShowProjNum: false,
      todoList: [],
      checkedList: [],
      isabled: true,      // 提交是否可用
      pageSize: 10,
      pageNo: 1,
      totCount: 0,
      isFirst: true,
      showDateSearch: false,
      currentDate: new Date(),
      DateSearch: dateFormat('YYYY年mm月', new Date()),
      showScreeningPopup: false               // 显示筛选弹框

    }
  },
  created () {
    this.init()
  },
  mounted () {
    if (this.$refs['scrollView']) {
      console.log(this.$refs.scrollView)
      this.$refs['scrollView'].init()
    }
  },
  activated () {
    console.log(this.$refs['scrollView'])
    this.init()
  },
  computed: {
    canNext () {
      return this.pageNo * this.pageSize < this.totCount
    },
    finishedText () {
      return this.todoList.length > 20 ? '全部已加载' : ''
    }
  },
  methods: {
    onDateSearch () {
      this.showDateSearch = true
    },
    change (e) {
      console.log(e.getValues())
    },
    confirmDateSearch (value) {
      console.log(value)
      this.DateSearch = dateFormat('YYYY年mm月', value)
      this.showDateSearch = false
    },
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      }
      return value
    },
    init () {
      axios.get('/static/data/todoList.json').then(res => {
        console.log(res)
        this.totCount = res.data.totCount
        this.todoList = res.data.todoList
        this.isFirst = false
        this.$refs['scrollView'].init()
        this.$refs.scrollView.reflowScroller()
        this.pageNo += 1
        let bodyHeight = window.document.body.clientHeight
        // ???
        let scrollViewHeight = bodyHeight - 44 - 41 - 40 - 55
        this.$refs.scrollView.$el.style.height = scrollViewHeight + 'px'
      })
    },
    $_onEndReached () {
      if (!this.canNext || this.isFirst) return
      axios.get('/static/data/todoList.json').then(res => {
        console.log(res)
        this.totCount = res.data.totCount
        this.todoList = [...this.todoList, ...res.data.todoList]
        this.$refs.scrollView.finishLoadMore()
        this.pageNo += 1
      })
    },
    everyChecked () {
      // 有一项勾选就显示项目条数和金额
      this.todoList.forEach((item, index) => {
        if (item.isChecked) {
          this.isShowProjNum = true
        }
      })
      // 每一项都没勾选，返回ture,isShowProjNum为false
      this.isShowProjNum = !this.todoList.every((item, index, array) => {
        return !item.isChecked
      })
      if (!this.isShowProjNum) {
        this.closeAll()
      }
    },
    onScreening () {
      console.log('筛选')
      this.showScreeningPopup = true
    },
    submit () {
      console.log(this.todoList)
      console.log(this.checkedList)
      // 是否显示并打开所有勾选框
      let isOpenAll = this.todoList.every((item, index, array) => {
        return !item.isChecked
      })
      if (isOpenAll) {
        this.openAll()
        Toast('请勾选提交项')
      }
    },
    openAll () {
      console.log(this.todoList.length)
      for (let i = 0; i < this.todoList.length; i++) {
        this.$refs['swipeCell'][i].open('left')
      }
    },
    closeAll () {
      for (let i = 0; i < this.todoList.length; i++) {
        this.$refs['swipeCell'][i].close('left')
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
    },
    changeChecked (check) {
      check.isChecked = (!check.isChecked)
      this.everyChecked()    // 是否每一个都勾选
      this.toCheckedList()   // 已勾选的
      console.log(this.checkedList)
    },
    toCheckedList () {
      this.checkedList = []  // 被选中的项
      this.todoList.forEach((item, index) => {
        if (item.isChecked) {
          this.checkedList.push(item)
        }
      })
      // 个数总和
      this.projNum = this.checkedList.length
      // 金额总和
      let total = this.checkedList.length
      this.projTotalMoney = 0
      for (let i = 0; i < total; i++) {
        if (this.checkedList[i]) {
          this.projTotalMoney += parseFloat(this.checkedList[i].money)
        }
      }
    }

  }
}
</script>
<style lang="less">
.view-applicant {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  @import "../../assets/styles/custom/button.less";
  .my-popup.van-popup {
    width: 76%;
    height: 70%;
    padding: 8px 16px;

    .popup-wrap {
      .popup-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
        }
        .left,
        .right {
          padding: 8px;
        }
      }
      .popup-content {
        padding: 8px;
        .leader {
          font-size: 14px;
          display: flex;
          align-items: center;
          height: 40px;
          min-height: 40px;
          .order {
            width: 20px;
          }
        }
        .md-field-item-content {
          height: 40px;
          min-height: 40px;
          .md-field-item-title {
            margin-right: 0;
            font-size: 14px;
            width: 20px;
          }
          .md-field-item-control {
            input {
              font-size: 14px;
            }
          }
        }
      }

      .partner {
        margin: 8px 0;
      }
      .btn-add {
        margin-top: 8px;
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
        }
      }
    }
  }
  .my-todo-wrap {
    // margin-top: 4px;
    padding-top: 40px; /*no*/
    padding-bottom: 130px; /*no*/
    .action-buttons {
      position: fixed;
      width: 100%;
      z-index: 3;
      top: 83px; /*no*/
      background-color: #fff;
      height: 40px; /*no*/
      display: flex;
      align-items: center;
      justify-content: space-between;
      .date-search {
        margin-left: 8px;
        height: 40px; /*no*/
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .screening-btn {
        margin-right: 8px;
        height: 40px; /*no*/
        display: flex;
        justify-content: center;
        align-items: center;
      }
      span {
        display: inline-block;
      }
    }
    .list-wrap {
      // margin-top: 4px;
      background: #fff;
    }
  }

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
}
</style>