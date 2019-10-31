<template>
  <div class="view-swiper">

    <div>
      <swiper :options="swiperOption"
              class="swiper-box"
              ref="mySwiper"
              v-if="testData.length > 0"
              @slideChangeTransitionStart="changePageStart">
        <swiper-slide class="swiper-item"
                      v-for="item of dataList"
                      :key="item.id">
          <div class="inner-wrap">
            <div class="fixed-header">
              <table>
                <thead>
                  <tr v-for="row of item.row"
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
                 ref="responsive">
              <table class="my-table">
                <thead>
                  <tr v-for="row of item.row"
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
                      v-show="show0"
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
                  <tr v-show="show0"
                      class="font-10">
                    <td colspan="5">{{remark}}</td>
                  </tr>
                  <!-- page1 start-->
                  <tr v-for="row of page1"
                      v-show="show1"
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
                  <tr v-show="show1"
                      class="font-10">
                    <td colspan="5">{{remark}}</td>
                  </tr>
                  <!-- page2 start-->
                  <tr v-for="row of page2"
                      v-show="show2"
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
                  <tr v-show="show2"
                      class="font-10">
                    <td colspan="5">{{remark}}</td>
                  </tr>
                  <!-- page3 start-->
                  <tr v-for="row of page3"
                      v-show="show3"
                      :key="row.id">
                    <td>
                      <span>{{row.orgDesc}}</span>
                    </td>
                    <td>
                      <span>{{row.netProfit}}</span>
                    </td>
                    <td>
                      <span>{{row.netIncreas}}</span>
                    </td>
                    <td>
                      <span>{{row.rmbSpread}}</span>
                    </td>
                    <td>
                      <span>{{row.rmbSpdins}}</span>
                    </td>
                  </tr>
                  <tr v-show="show3"
                      class="font-10">
                    <td colspan="5">{{remark}}</td>
                  </tr>
                  <!-- page4 start-->
                  <tr v-for="row of page4"
                      v-show="show4"
                      :key="row.id">
                    <td>
                      <span>{{row.orgDesc}}</span>
                    </td>
                    <td>
                      <span>{{row.dposloanSpd}}</span>
                    </td>
                    <td>
                      <span>{{row.dposloanSpdins}}</span>
                    </td>
                    <td>
                      <span>{{row.threeNum}}</span>
                    </td>
                    <td>
                      <span>{{row.threeSpdins}}</span>
                    </td>
                  </tr>
                  <tr v-show="show4"
                      class="font-10">
                    <td colspan="5">{{remark}}</td>
                  </tr>
                  <!-- page5 start-->
                  <tr v-for="row of page5"
                      v-show="show5"
                      :key="row.id">
                    <td>
                      <span>{{row.orgDesc}}</span>
                    </td>
                    <td>
                      <span>{{row.costReven}}</span>
                    </td>
                    <td>
                      <span>{{row.costSpdins}}</span>
                    </td>
                  </tr>
                  <tr v-show="show5"
                      class="font-10">
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
  </div>
</template>
<script>
import { myHttp, PROD_URL } from 'config/http'
// import swiperData from 'common/swiperData'
import testData from 'common/testData'
import { Toast } from 'mand-mobile'
export default {
  data () {
    return {
      remark: '',
      nameList: [],
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
      }
    }
  },
  created () {
    document.title = this.$route.query.title
    // this._getData()
    // this.reData(swiperData)
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
      for (let i = 0; i < 6; i++) {
        this.$refs.responsive[i].style.height = (window.innerHeight - 26) + 'px'
      }
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
      if (this.swiper.activeIndex === 0) {
        this.switchShow()
        this.show0 = true
      } else if (this.swiper.activeIndex === 1) {
        this.switchShow()
        this.show1 = true
      } else if (this.swiper.activeIndex === 2) {
        this.switchShow()
        this.show2 = true
      } else if (this.swiper.activeIndex === 3) {
        this.switchShow()
        this.show3 = true
      } else if (this.swiper.activeIndex === 4) {
        this.switchShow()
        this.show4 = true
      } else if (this.swiper.activeIndex === 5) {
        this.switchShow()
        this.show5 = true
      }
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
