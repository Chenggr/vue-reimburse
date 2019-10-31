<template>
  <div class="view-swiper">

    <div>
      <swiper :options="swiperOption"
              class="swiper-box"
              ref="mySwiper"
              v-if="testData.length > 0"
              @slideChangeTransitionStart="changePageStart">
        <swiper-slide class="swiper-item">
          <div class="inner-wrap">
            <div class="fixed-header">
              <table>
                <thead>
                  <tr v-for="row of line0"
                      :key="row.id">
                    <th rowspan="2"
                        style="vertical-align: middle;"
                        v-for="row0 of row.row0"
                        :key="row0.id">
                      {{row0}}
                    </th>
                    <th colspan="2"
                        v-for="row1 of row.row1"
                        :key="row1.id">
                      {{row1}}
                    </th>
                    <th v-for="row2 of row.row2"
                        :key="row2.id">
                      {{row2}}
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="table-responsive"
                 ref="responsive_0">
              <table class="my-table">
                <thead>
                  <tr v-for="row of line0"
                      :key="row.id">
                    <th rowspan="2"
                        style="vertical-align: middle;"
                        v-for="row0 of row.row0"
                        :key="row0.id">
                      {{row0}}
                    </th>
                    <th colspan="2"
                        v-for="row1 of row.row1"
                        :key="row1.id">
                      {{row1}}
                    </th>
                    <th v-for="row2 of row.row2"
                        :key="row2.id">
                      {{row2}}
                    </th>
                  </tr>

                </thead>
                <tbody>
                  <!-- page0 start-->
                  <tr v-for="row of page0"
                      @touchstart="gotouchstart"
                      @touchmove="gotouchmove"
                      @touchend="gotouchend"
                      @click="clickEvent"
                      :key="row.id">
                    <td>
                      <span>{{row.orgDesc}}</span>
                    </td>
                    <td>
                      <span>{{row.daydepoBal}}</span>
                    </td>
                    <td>
                      <span>{{row.daydepoYear}}</span>
                    </td>
                    <td>
                      <span>{{row.realdepoBal}}</span>
                    </td>
                    <td>
                      <span>{{row.realdepoYear}}</span>
                    </td>
                  </tr>
                  <tr class="font-10">
                    <td colspan="5">{{remark}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-item">
          <div class="inner-wrap">
            <div class="fixed-header">
              <table>
                <thead>
                  <tr v-for="row of line1"
                      :key="row.id">
                    <th rowspan="2"
                        style="vertical-align: middle;"
                        v-for="row0 of row.row0"
                        :key="row0.id">
                      {{row0}}
                    </th>
                    <th colspan="2"
                        v-for="row1 of row.row1"
                        :key="row1.id">
                      {{row1}}
                    </th>
                    <th v-for="row2 of row.row2"
                        :key="row2.id">
                      {{row2}}
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="table-responsive"
                 ref="responsive_1">
              <table class="my-table">
                <thead>
                  <tr v-for="row of line1"
                      :key="row.id">
                    <th rowspan="2"
                        style="vertical-align: middle;"
                        v-for="row0 of row.row0"
                        :key="row0.id">
                      {{row0}}
                    </th>
                    <th colspan="2"
                        v-for="row1 of row.row1"
                        :key="row1.id">
                      {{row1}}
                    </th>
                    <th v-for="row2 of row.row2"
                        :key="row2.id">
                      {{row2}}
                    </th>
                  </tr>

                </thead>
                <tbody>

                  <!-- page1 start-->
                  <tr v-for="row of page1"
                      @touchstart="gotouchstart"
                      @touchmove="gotouchmove"
                      @touchend="gotouchend"
                      @click="clickEvent"
                      :key="row.id">
                    <td>
                      <span>{{row.orgDesc}}</span>
                    </td>
                    <td>
                      <span>{{row.loanBal}}</span>
                    </td>
                    <td>
                      <span>{{row.loanYear}}</span>
                    </td>
                    <td>
                      <span>{{row.mereReven}}</span>
                    </td>
                    <td>
                      <span>{{row.mesoIncreas}}</span>
                    </td>
                  </tr>
                  <tr class="font-10">
                    <td colspan="5">{{remark}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-item">
          <div class="inner-wrap">
            <div class="fixed-header">
              <table>
                <thead>
                  <tr v-for="row of line1"
                      :key="row.id">
                    <th rowspan="2"
                        style="vertical-align: middle;"
                        v-for="row0 of row.row0"
                        :key="row0.id">
                      {{row0}}
                    </th>
                    <th colspan="2"
                        v-for="row1 of row.row1"
                        :key="row1.id">
                      {{row1}}
                    </th>
                    <th v-for="row2 of row.row2"
                        :key="row2.id">
                      {{row2}}
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="table-responsive"
                 ref="responsive_2">
              <table class="my-table">
                <thead>
                  <tr v-for="row of line2"
                      @touchstart="gotouchstart"
                      @touchmove="gotouchmove"
                      @touchend="gotouchend"
                      @click="clickEvent"
                      :key="row.id">
                    <th rowspan="2"
                        style="vertical-align: middle;"
                        v-for="row0 of row.row0"
                        :key="row0.id">
                      {{row0}}
                    </th>
                    <th colspan="2"
                        v-for="row1 of row.row1"
                        :key="row1.id">
                      {{row1}}
                    </th>
                    <th v-for="row2 of row.row2"
                        :key="row2.id">
                      {{row2}}
                    </th>
                  </tr>

                </thead>
                <tbody>

                  <!-- page2 start-->
                  <tr v-for="row of page2"
                      @touchstart="gotouchstart"
                      @touchmove="gotouchmove"
                      @touchend="gotouchend"
                      @click="clickEvent"
                      :key="row.id">
                    <td>
                      <span>{{row.orgDesc}}</span>
                    </td>
                    <td>
                      <span>{{row.mesoReven}}</span>
                    </td>
                    <td>
                      <span>{{row.mesoIncreas}}</span>
                    </td>
                    <td>
                      <span>{{row.provisProfit}}</span>
                    </td>
                    <td>
                      <span>{{row.provisIncreas}}</span>
                    </td>
                  </tr>
                  <tr class="font-10">
                    <td colspan="5">{{remark}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination"
             slot="pagination"></div>

      </swiper>
    </div>
    <van-popup v-model="show"
               position="bottom">
      <ve-line :data="chartData2"
               :legend-visible="false"></ve-line>
    </van-popup>
  </div>
</template>
<script>
import { Button, Popup } from 'vant'
import VeLine from 'v-charts/lib/line.common'
import { myHttp, PROD_URL } from 'config/http'
import testData from 'common/testData'
import finanData from 'common/finanData'
import { Toast } from 'mand-mobile'
export default {
  components: {
    VeLine,
    VanButton: Button,
    VanPopup: Popup
  },
  data () {
    return {
      show: false, // popup显示
      arg: { index: 10, item: 'test' },
      chartData2: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      remark: '',
      nameList: [],
      line0: [{
        row0: ['行名'],
        row1: ['本外币日均存款', '本外币时点存款']
      }, {
        row2: ['余额', '较年初', '余额', '较年初']
      }],
      line1: [{
        row0: ['行名'],
        row1: ['本外币贷款余额', '净收入']
      }, {
        row2: ['余额', '较年初', '余额', '同比增幅']
      }],
      line2: [{
        row0: ['行名'],
        row1: ['中间业务净收入', '拨备前利润']
      }, {
        row2: ['余额', '同比增幅', '余额', '同比增幅']
      }],
      dataList: [
        {
          row: [{
            row0: ['行名'],
            row1: ['本外币日均存款', '本外币时点存款']
          }, {
            row2: ['余额', '较年初', '余额', '较年初']
          }]
        },
        {
          row: [{
            row0: ['行名'],
            row1: ['本外币贷款余额', '净收入']
          }, {
            row2: ['余额', '较年初', '余额', '同比增幅']
          }]
        }, {
          row: [{
            row0: ['行名'],
            row1: ['中间业务净收入', '拨备前利润']
          }, {
            row2: ['余额', '同比增幅', '余额', '同比增幅']
          }]
        }, {
          row: [{
            row0: ['行名'],
            row1: ['净利润', '人民币净息差']
          }, {
            row2: ['余额', '同比增幅', '当月', '较上年变动']
          }]
        }, {
          row: [{
            row0: ['行名'],
            row1: ['人民币存贷利差', '三项费用']
          }, {
            row2: ['当月', '同比增幅', '当月', '同比增幅']
          }]
        }, {
          row: [{
            row0: ['行名'],
            row1: ['成本收入']
          }, {
            row2: ['当月', '同比增幅']
          }]
        }
      ],
      show0: true,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      page0: [],
      page1: [],
      page2: [],
      page3: [],
      page4: [],
      page5: [],
      testData: testData,
      currentIndex: 0,
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0, // slide之间的距离
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        on: {

        }
      },
      timeOutEvent: 0,
      lastClickTime: 0,
      clickTimer: null
    }
  },
  created () {
    console.log(finanData)
    document.title = this.$route.query.title
    // this._getData()
    this.reData(testData)
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    this.changeHeight()
  },
  methods: {
    clickEvent () {
      var nowTime = new Date().getTime()
      if (nowTime - this.lastClickTime < 400) {
        /* 双击 */
        this.lastClickTime = 0
        this.clickTimer && clearTimeout(this.clickTimer)
        console.log('双击')
        this.$router.push({ name: 'demo' })
      } else {
        /* 单击 */
        this.lastClickTime = nowTime
        this.clickTimer = setTimeout(() => {
          console.log('单击')
        }, 400)
      }
    },
    doubleTap (e, args) {
      var self = this
      self.msg = 'doubleTap'
      console.log('tap index:' + args.index + 'item:' + args.item)
    },
    doubleClick () {
      console.log('doubleClick')
    },
    gotouchstart () {
      let that = this
      clearTimeout(that.timeOutEvent)// 清除定时器
      that.timeOutEvent = 0
      that.timeOutEvent = setTimeout(function () {
        // 执行长按要执行的内容，
        console.log('touchContent')
        that.show = true // 显示popup
      }, 600)// 这里设置定时
    },
    // 手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend () {
      clearTimeout(this.timeOutEvent)
      if (this.timeOutEvent !== 0) {
        // 这里写要执行的内容（尤如onclick事件）
      }
    },
    // 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove () {
      clearTimeout(this.timeOutEvent)// 清除定时器
      this.timeOutEvent = 0
    },
    swipe (e, args) {
      var self = this
      self.msg = 'swipe'
      console.log('tap index:' + args.index + 'item:' + args.item)
    },
    longTap (e, args) {
      var self = this
      self.msg = 'longTap'
      console.log('tap index:' + args.index + ',item:' + args.item)
      this.show = true // 显示popup
    },
    _getData () {
      myHttp(PROD_URL + '/CGBB004',
        {
          appgDate: '201904',
          // base64Str: 'MjAxOTA5MjAxNTE1MjNBQ0dIRUFC',
          pageSize: 0
        }).then(res => {
          console.log('res:')
          console.log(res)
          if (res.rtnCode === '0000') {
            let CgbbFinancialIndiList = res.data.CgbbFinancialIndiList
            console.log(CgbbFinancialIndiList)
            this.reData(CgbbFinancialIndiList)
            this.remark = res.data.rsal
          } else {
            Toast.info(res.rtnMsg)
          }
        })
    },
    changeHeight () {
      // for (let i = 0; i < 2; i++) {
      //   this.$refs.responsive[i].style.height = (window.innerHeight - 26) + 'px'
      // }
      this.$refs.responsive_0.style.height = (window.innerHeight - 26) + 'px'
      this.$refs.responsive_1.style.height = (window.innerHeight - 26) + 'px'
      this.$refs.responsive_2.style.height = (window.innerHeight - 26) + 'px'
    },
    switchShow () {
      this.show0 = false
      this.show1 = false
      this.show2 = false
      this.show3 = false
      this.show4 = false
      this.show5 = false
    },
    changePageStart () {
      this.currentIndex = this.swiper.activeIndex
      // if (this.swiper.activeIndex === 0) {
      //   this.switchShow()
      //   this.show0 = true
      // } else if (this.swiper.activeIndex === 1) {
      //   this.switchShow()
      //   this.show1 = true
      // } else if (this.swiper.activeIndex === 2) {
      //   this.switchShow()
      //   this.show2 = true
      // } else if (this.swiper.activeIndex === 3) {
      //   this.switchShow()
      //   this.show3 = true
      // } else if (this.swiper.activeIndex === 4) {
      //   this.switchShow()
      //   this.show4 = true
      // } else if (this.swiper.activeIndex === 5) {
      //   this.switchShow()
      //   this.show5 = true
      // }
    },
    reData (testData) {
      testData.forEach((item, index) => {
        this.page0.push({
          orgDesc: item.orgDesc,
          daydepoBal: item.daydepoBal,
          daydepoYear: item.daydepoYear,
          realdepoBal: item.realdepoBal,
          realdepoYear: item.realdepoYear,
          remark: this.remark
        })

        this.page1.push({
          orgDesc: item.orgDesc,
          loanBal: item.loanBal,
          loanYear: item.loanYear,
          mereReven: item.mereReven,
          mesoIncreas: item.mesoIncreas
        })
        this.page2.push({
          orgDesc: item.orgDesc,
          mesoReven: item.mesoReven,
          mesoIncreas: item.mesoIncreas,
          provisProfit: item.provisProfit,
          provisIncreas: item.provisIncreas
        })
        this.page3.push({
          orgDesc: item.orgDesc,
          netProfit: item.netProfit,
          netIncreas: item.netIncreas,
          rmbSpread: item.rmbSpread,
          rmbSpdins: item.rmbSpdins
        })
        this.page4.push({
          orgDesc: item.orgDesc,
          dposloanSpd: item.dposloanSpd,
          dposloanSpdins: item.dposloanSpdins,
          threeNum: item.threeNum,
          threeSpdins: item.threeSpdins
        })
        this.page5.push({
          orgDesc: item.orgDesc,
          costReven: item.costReven,
          costSpdins: item.costSpdins
        })
        this.nameList.push({
          orgDesc: item.orgDesc
        })
      })
      // this.page0[this.page0.length].remark = this.remark
      console.log(this.page0[this.page0.length - 1])
      console.log(this.page0)
      // this.page0.push({ remark: this.remark })
    }
  }
}
</script>
<style lang="less">
.view-swiper {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
html,
body {
  position: relative;
  height: 100%;
}
body {
  background: #fff;
}
.swiper-box {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.swiper-item {
  position: relative;
  height: 100%;
  text-align: center;
  font-size: 12px;
  background: #fff;
  /* Center slide text vertically */
  display: flex;

  .fixed-header {
    position: absolute;
    z-index: 12;
    background: #fff;
    width: 100%;
    overflow-x: auto;
    table {
      width: 100%;
    }
  }
}
.table-responsive {
  position: relative;
  width: 100%;
  overflow-x: auto;
}
.inner-wrap {
  display: block;
  width: 100%;
}
.view-swiper {
  .my-table {
    font-size: 12px;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    table-layout: auto;
    border: 1px solid #dcdfe6;
  }
  thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
  }
  tr {
    border-top: none;
  }
  tbody {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
  }
  td {
    padding: 0.75em;
    vertical-align: top;
    text-align: left;
  }
  th {
    text-align: center;
    font-size: 12px;
  }
  td,
  th {
    border: 1px solid #dcdfe6;
    width: 20%;
  }
  tbody td {
    width: 20%;
  }

  .table-head td {
    padding: 0;
  }
  .swiper-pagination {
    position: static;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-pagination-bullet-active {
    background: rgb(252, 66, 66);
  }
  .font-10 {
    font-size: 10px;
  }
}
</style>
