
<template>
  <div class="view-approver">
    <x-header id="header"
              @on-click-back="goback"
              :left-options="{backText: '',preventGoBack:true}"
              style="width:100%;position:fixed;left:0;top:0;z-index:2000;background-color:#fff;"
              class="header vux-1px-b"
              :title="headerTitle">
      <span class="right-span"
            slot="right"
            @click="clickRefreshBtn">
        <van-icon name="replay" /></span>
    </x-header>
    <van-tabs v-model="activeName"
              sticky
              :offset-top="44"
              @click="onChangeTab"
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

      </van-tab>
      <!-- 我的记录 -->
      <van-tab title="我的记录"
               name="record">
        <div class="my-record-wrap">
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
            <div class="search-btn"
                 @click="onSearching">
              <span>搜索</span>
              <van-icon name="search"
                        size="16px" />
            </div>
          </div>
          <div class="list-wrap">
            <div class="reimburse-cell"
                 ref="reimburse">
              <md-scroll-view ref="scrollView2"
                              v-show="!isEmpty"
                              manual-init
                              :scrolling-x="false"
                              @end-reached="$_onEndReached2">
                <van-swipe-cell ref="swipeCell"
                                v-for="item of recordList"
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
                                     :is-finished="isFinished2"
                                     :finished-text="finishedText2">
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

      </van-tab>
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

          <my-screen></my-screen>

        </div>
      </van-popup>
      <!-- 筛选弹框 -->
      <!-- 搜索底部弹框 -->
      <van-popup class="my-search"
                 position="right"
                 :close-on-click-overlay="true"
                 v-model="showSearchPopup">
        <div class="popup-wrap">
          <div class="popup-content">
            <form action="/">
              <van-search class="search-input"
                          v-model="searchValue"
                          placeholder="请输入搜索关键词"
                          show-action
                          @search="onSearch"
                          @cancel="onCancel" />

            </form>
          </div>
        </div>
      </van-popup>
      <!-- 搜索弹框 -->
    </van-tabs>

  </div>

</template>
<script>

import myScreen from '../../common/components/my-screen'
import { XHeader } from 'vux'
import { mapGetters, mapMutations } from 'vuex'
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
  Popup,
  Search
} from 'vant'
export default {
  name: 'Approver',
  components: {
    myScreen,
    XHeader,
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
    VanPopup: Popup,
    VanSearch: Search
  },

  data () {
    return {
      Tab: 'todo',
      finishedText: '',
      finishedText2: '',
      isEmpty: false,
      isFinished: false,
      isFinished2: false,
      projTotalMoney: 0,
      projNum: 0,
      activeName: 'todo',
      isShowProjNum: false,
      todoList: [],      // 我的待办
      recordList: [],    // 我的记录
      checkedList: [],
      isabled: true,      // 提交是否可用
      pageSize: 10,
      pageNo: 1,
      pageNo2: 1,
      totCount: 0,
      totCount2: 0,
      isFirst: true,
      showDateSearch: false,      // 日期弹框
      currentDate: new Date(),
      DateSearch: dateFormat('YYYY年mm月', new Date()),
      showScreeningPopup: false,               // 显示筛选弹框
      showSearchPopup: false,      // 显示搜索弹框
      searchValue: ''
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
  watch: {
    refreshBtn (newData, oldValue) {
      console.log(newData, oldValue)
      if (this.refreshBtn) {
        console.log('点击刷新')
        if (this.Tab === 'todo') {
          console.log('刷新我的待办')
          this.refreshTodo()
        } else if (this.Tab === 'record') {
          console.log('刷新我的记录')
          this.refreshRecord()
        }
        this.setRefreshBtn(false)
      }
    }
  },
  computed: {
    ...mapGetters([
      'refreshBtn'
    ]),
    headerTitle () {
      const currentRoute = this.$route.meta
      const defaultTitle = '申请人'
      return currentRoute ? currentRoute.title : defaultTitle
    },
    canNext2 () {
      console.log(this.pageNo2, this.pageSize, this.totCount2)
      return this.pageNo2 * this.pageSize <= this.totCount2
    }

  },
  methods: {
    goback () {
      this.$router.push('/')
    },
    canNext () {
      console.log(this.pageNo, this.pageSize, this.totCount)
      return this.pageNo * this.pageSize <= this.totCount
    },
    ...mapMutations({
      'setRefreshBtn': 'SET_REFRESH_BTN'
    }),
    clickRefreshBtn () {
      if (this.Tab === 'todo') {
        console.log('刷新我的待办')
        this.refreshTodo()
      } else if (this.Tab === 'record') {
        console.log('刷新我的记录')
        this.refreshRecord()
      }
      this.setRefreshBtn(false)
    },
    refreshTodo () {
      // 初始化
      this.todoList = []
      this.pageNo = 1
      this.finishedText = ''
      this.isFinished = false
      this.$refs.scrollView.reflowScroller()
      this.$refs.scrollView.finishLoadMore()
      this.$refs.scrollView.scrollTo(0, 0)
      this.init()
    },
    refreshRecord () {
      // 初始化
      this.recordList = []
      this.pageNo2 = 1
      this.finishedText2 = ''
      this.isFinished2 = false
      this.$refs.scrollView2.reflowScroller()
      this.$refs.scrollView2.finishLoadMore()
      this.$refs.scrollView2.scrollTo(0, 0)
      this._getRecord()
    },
    onChangeTab (name, title) {
      this.Tab = name
      if (name === 'record' && this.recordList.length === 0) {
        this._getRecord()
      } else if (name === 'todo' && this.todoList.length === 0) {
        this.init()
      }
    },
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
    _getRecord () {
      axios.get('/static/data/recordList.json').then(res => {
        console.log(res)
        this.totCount2 = res.data.totCount
        this.recordList = res.data.recordList
        this.isFirst = false
        this.$refs['scrollView2'].init()
        this.$refs.scrollView2.reflowScroller()
        this.pageNo2 += 1
        let bodyHeight = window.document.body.clientHeight
        // ???
        let scrollViewHeight = bodyHeight - 44 - 41 - 40 - 55
        this.$refs.scrollView2.$el.style.height = scrollViewHeight + 'px'
      })
    },
    $_onEndReached () {
      console.log('_onEndReached')
      if (!this.canNext()) {
        this.isFinished = true
        this.finishedText = '全部已加载'
        return
      }
      axios.get('/static/data/todoList.json').then(res => {
        console.log('axios $_onEndReached')
        if (this.todoList.length === 20) {
          console.log('tingzhi')
          this.$refs.scrollView.finishRefresh()
        }
        console.log(res)
        this.totCount = res.data.totCount
        this.todoList = [...this.todoList, ...res.data.todoList]
        this.$refs.scrollView.finishLoadMore()
        this.pageNo += 1
      })
    },
    $_onEndReached2 () {
      console.log('_onEndReached2')
      if (!this.canNext2) {
        this.isFinished2 = true
        this.finishedText2 = '全部已加载'
        return
      }
      axios.get('/static/data/recordList.json').then(res => {
        console.log(res)
        this.totCount2 = res.data.totCount
        this.recordList = [...this.recordList, ...res.data.recordList]
        this.$refs.scrollView2.finishLoadMore()
        this.pageNo2 += 1
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
      this.showScreeningPopup = true
    },
    onSearching () {
      // this.$router.push({ name: 'search' })
      this.showSearchPopup = true
    },
    onSearch () {

    },
    onCancel () {
      this.showSearchPopup = false
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
#header {
  // z-index: 499 !important;
  .vux-header-title {
    color: #222;
  }
  .right-span {
    color: #222;
    padding: 8px;
    font-size: 16px;
  }
}
.view-approver {
  @import "../../assets/styles/custom/tabs.less";
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  @import "../../assets/styles/custom/button.less";
  .my-search.van-popup {
    width: 100%;
    height: 100%;
    .search-input {
      .van-field__left-icon {
        height: 100%;
        display: flex;
        align-items: center;
      }
      .van-search__content {
        border-radius: 16px;
        height: 40px;
        .van-field__body {
          height: 100%;
        }
      }
    }
  }
  .my-popup.van-popup {
    width: 76%;
    height: 70%;
    padding: 8px 16px;

    .popup-wrap {
      height: 100%;
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
  .my-record-wrap {
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
      .search-btn {
        margin-right: 8px;
        height: 40px; /*no*/
        display: flex;
        justify-content: center;
        align-items: center;
      }
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
        width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 8px;
        padding: 4px 8px;
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