<template>
  <div class="view-project-apply">
    <!-- <md-tab-picker ref="tabPicker"
                   :mask-closable="false"
                   title="请选择"
                   describe=""
                   large-radius
                   @select="select"
                   @show="showTabPicker"
                   :data="data"
                   v-model="show"
                   @change="handleChange" /> -->
    <my-tab-picker ref="tabPicker"
                   :mask-closable="true"
                   title="请选择"
                   describe=""
                   large-radius
                   @select="select"
                   :data="data"
                   v-model="show"
                   @change="handleChange" />
    <md-field>
      <md-field-item solid
                     title="立项日期"
                     arrow
                     :addon="startDate"
                     @click="onStartDate" />
      <!-- <md-input-item title="立项总金额"
                     v-model="startTotalMoney"
                     align="right"
                     placeholder="请输入"></md-input-item> -->
      <md-field-item solid
                     title="费用类型"
                     arrow
                     :addon="chargeTypeText"
                     @click="onChargeType" />
      <!-- <md-field-item title="费用类型"
                     arrow="arrow-right"
                     @click="show = !show"
                     placeholder=""
                     :content="addressStr"
                     solid /> -->

      <div v-if="this.chargeType == chargeTypeEnum.TRIP">
        <md-field-item solid
                       title="指派审批人"
                       arrow
                       :addon="toApprover"
                       @click="onShowApprover" />
        <md-input-item class="lead-input"
                       title="领队人"
                       v-model="leader"
                       align="right"
                       placeholder="请输入"></md-input-item>
        <md-field-item solid
                       title="出差时间"
                       arrow
                       :addon="businessTripDate"
                       @click="onBusinessTripDate" />
        <md-field-item solid
                       class="business-trip"
                       title="出差地点"
                       arrow
                       :addon="businessTripAddress"
                       @click="onBusinessTripAddress" />
        <van-collapse class="remark-collapse"
                      v-model="activeNames">
          <van-collapse-item title="备注信息"
                             name="2">
            <van-field class="remark-info"
                       v-model="remarkInfoContent"
                       rows="1"
                       autosize
                       label=""
                       type="textarea"
                       maxlength="50"
                       placeholder="请输入留言"
                       show-word-limit />
          </van-collapse-item>
        </van-collapse>
        <md-field-item solid
                       title="同行人"
                       arrow
                       :addon="partnerText"
                       @click="onPartner" />
        <md-field-item solid
                       title="交通工具"
                       arrow
                       :addon="transportation"
                       @click="onTransportation" />
        <md-field-item class="notice-attachment"
                       solid
                       title="通知附件"
                       :addon="attachment"
                       @click="onAttachment" />
      </div>
      <div v-if="this.chargeType == chargeTypeEnum.SERVE">
        <md-input-item title="经办人"
                       v-model="agent"
                       align="right"
                       placeholder="请输入"></md-input-item>
        <md-input-item title="支出总金额"
                       v-model="expendTotalMoney"
                       align="right"
                       placeholder="请输入"></md-input-item>
        <div class="textarea-wrap">
          <div class="title">办理依据</div>
          <van-field class="my-textarea handle-gist"
                     v-model="handleGist"
                     rows="1"
                     autosize
                     label=""
                     type="textarea"
                     maxlength="50"
                     placeholder="请输入留言"
                     show-word-limit />
        </div>
        <van-collapse class="detail-list-collapse"
                      v-model="activeNames">
          <van-collapse-item title="具体列表"
                             name="2">
            <van-cell-group>
              <van-field label="项目明细"
                         v-model="projDetail"
                         input-align="right"
                         placeholder="请输入" />
              <van-field label="核算项目"
                         v-model="checkProj"
                         input-align="right"
                         placeholder="请输入" />
              <van-field label="供应商名称"
                         v-model="providerName"
                         input-align="right"
                         placeholder="请输入" />
            </van-cell-group>
          </van-collapse-item>
        </van-collapse>
        <van-switch-cell class="my-switch"
                         v-model="isHaveAttachment"
                         title="有无纸质附件" />
      </div>

    </md-field>
    <div v-if="this.chargeType == chargeTypeEnum.SERVE && isHaveAttachment"
         class="uploader-wrap">
      <div class="upload-img-wrap"
           @click="attachUploader">
        <div class="mark-bg">
          <img src="../../assets/img/xiangji.png"
               alt="">
        </div>
      </div>
      <!-- <van-uploader v-model="attachfileList"               
                    image-fit="fill"
                    :after-read="afterRead" /> -->
    </div>
    <div v-if="this.chargeType == chargeTypeEnum.TRIP"
         class="uploader-wrap">
      <div class="upload-img-wrap"
           @click="noticeAttache">
        <div class="mark-bg">
          <img src="../../assets/img/xiangji.png"
               alt="">
        </div>
      </div>
      <!-- <van-uploader v-model="fileList"
                    image-fit="fill"
                    :after-read="afterRead" /> -->
    </div>
    <!-- <div @click="_getInfo">test</div> -->
    <div class="btn-wrap">
      <van-button type="default"
                  ref="submits"
                  :class="{'van-button--disabled':!isabled}"
                  @click="submit"
                  size="large">提交</van-button>
    </div>
    <van-action-sheet class="my-calendar"
                      v-model="showCalendar"
                      title="">
      <Calendar v-on:choseDay="clickDay"
                :markDateMore="arr"
                v-on:changeMonth="changeDate"></Calendar>
    </van-action-sheet>
    <van-action-sheet v-model="showStartDate"
                      title="">
      <van-datetime-picker v-model="startPickerDate"
                           @confirm="confirmStartDate"
                           @change="change"
                           :min-date="minDate"
                           type="date"
                           :filter="filter"
                           :formatter="formatter" />
    </van-action-sheet>
    <!-- 交通地址 -->
    <van-action-sheet v-model="showTransportation"
                      title="">
      <van-tabs>
        <van-tab title="去程">
          <van-picker :show-toolbar="false"
                      title=""
                      :columns="transportationList"
                      @change="onGoChange" />
        </van-tab>
        <van-tab title="返程">
          <van-picker :show-toolbar="false"
                      title=""
                      :columns="transportationList"
                      @change="onBackChange" />
        </van-tab>
      </van-tabs>
    </van-action-sheet>
    <!-- 差旅地址 -->
    <van-action-sheet v-model="showBusinessTripAddress"
                      title="">
      <van-area :area-list="areaList"
                @confirm="onBusinessTripAddressConfirm" />
    </van-action-sheet>
    <!-- 费用类型 -->
    <van-action-sheet v-model="showChargeType"
                      title="">
      <van-picker show-toolbar
                  title=""
                  :columns="chargeTypeList"
                  @cancel="onChargeTypeCancel"
                  @confirm="onChargeTypeConfirm" />
    </van-action-sheet>
    <!-- 指派审批人 -->
    <van-action-sheet v-model="showApprover"
                      title="">
      <van-picker show-toolbar
                  title=""
                  :columns="toApproverList"
                  @cancel="onToApproverCancel"
                  @confirm="onToApproverConfirm" />
    </van-action-sheet>
    <!-- 同行人弹框 -->
    <van-popup class="my-popup"
               :close-on-click-overlay="false"
               v-model="showPartnerPopup"
               round>
      <div class="popup-wrap">
        <div class="popup-title">
          <div class="left"
               @click="backParntnerPopup">
            <van-icon name="arrow-left" />
          </div>

          <div class="right"
               @click="savePartner">保存</div>
        </div>
        <div class="popup-content">
          <div>添加同行人</div>
          <div class="leader">
            <span class="order">1.</span> {{leader}}</div>
          <md-input-item :title="index+2+'.'"
                         :key="index"
                         v-for="(p,index) of dataModel"
                         v-model="dataModel[index].value"
                         align="left"
                         placeholder=""></md-input-item>
        </div>

        <div class="btn-add"
             @click="onAddPartner">
          <van-icon name="plus" />
        </div>
      </div>
    </van-popup>
    <!-- 同行人弹框end -->
    <!--差旅上传弹框-->
    <van-popup class="my-popup-swiper"
               v-model="showUploaderAttachTrip">
      <div class="my-swiper">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) of swiperTripList"
                        :key="index">
            <div>
              <div class="popup-wrap">
                <div class="popup-title">
                  <div class="left"
                       @click="backUploaderAttachTrip">
                    <van-icon name="arrow-left" />
                  </div>
                  <div>{{item.partnerName}}</div>
                  <div class="right"
                       @click="uploaderSaveTrip">保存</div>
                </div>

                <div class="popup-content popup-trip"
                     v-for="(atta,i) of item.attaList"
                     :key="i">
                  <div class="add-atta">添加附件</div>
                  <div class="uploader-wrap"
                       @click="currentIndex(index,i)">

                    <van-uploader :max-size="maxSize"
                                  :max-count="1"
                                  @delete="deleteTrip(index,i)"
                                  :after-read="afterRead"
                                  v-model="atta.attachfileList"
                                  image-fit="fill">

                    </van-uploader>
                  </div>
                  <div v-if="atta.attachInfo"
                       style="margin-top:10px;">

                    <!-- <van-field class="attach-textarea"
                               v-model="atta.attachInfo"
                               rows="3"
                               label=""
                               type="textarea"
                               placeholder="" /> -->
                  </div>
                  <div class="ticket-info"
                       v-for="(info,idx) of atta.attachInfo"
                       :key="idx">
                    <div v-if="info.type=='10200'">
                      <md-input-item class="ticket-title"
                                     style="margin-top:10px;"
                                     :title="info.type_msg"
                                     disabled
                                     align="right"></md-input-item>
                      <md-input-item title="票号"
                                     v-model="info.invoice_no"
                                     align="right"></md-input-item>
                      <md-input-item title="乘车日期"
                                     v-model="info.date_time"
                                     align="right"></md-input-item>
                      <md-input-item title="车票金额"
                                     v-model="info.amount_little"
                                     align="right"></md-input-item>
                    </div>
                    <div v-if="info.type=='10202'">
                      <md-input-item class="ticket-title"
                                     style="margin-top:10px;"
                                     :title="info.type_msg"
                                     disabled
                                     align="right"></md-input-item>
                      <md-input-item title="票价"
                                     v-model="info.fare"
                                     align="right"></md-input-item>
                      <md-input-item v-if="info.type=='10202' && info.fuel_surcharge != 'null'"
                                     title="燃油附加费"
                                     v-model="info.fuel_surcharge"
                                     align="right"></md-input-item>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination"
               slot="pagination"></div>
        </swiper>
      </div>
    </van-popup>
    <!--差旅上传弹框end-->
    <!--招待上传弹框-->
    <van-popup class="my-popup-swiper"
               v-model="showUploaderAttachServe">
      <div class="my-swiper">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in swiperServeList"
                        :key="index">
            <div>
              <div class="popup-wrap">
                <div class="popup-title">
                  <div class="left"
                       @click="backUploaderAttachServe">
                    <van-icon name="arrow-left" />
                  </div>
                  <div class="right"
                       @click="uploaderSaveServe">保存</div>
                </div>
                <div class="popup-content popup-serve">
                  <div>添加附件</div>
                  <div class="uploader-wrap">

                    <van-uploader :max-count="2"
                                  v-model="item.attachfileList"
                                  image-fit="fill"
                                  :after-read="afterRead" />
                  </div>
                  <div style="margin-top:10px;">
                    <md-input-item title="供应商名称"
                                   v-model="item.providerName"
                                   align="right"></md-input-item>
                    <md-input-item title="支出总金额"
                                   v-model="item.expendTotalMoney"
                                   align="right"></md-input-item>

                    <md-field-item solid
                                   title="支出费用是否缴纳个税">
                      <span class="field-right"
                            slot="right">
                        <span class="text"> {{item.isPayTaxText}}</span>
                        <van-switch v-model="item.isPayTax"
                                    size="16px"
                                    @change="onChangePayTax(item.isPayTaxText,index)" />
                      </span>
                    </md-field-item>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination"
               slot="pagination"></div>
        </swiper>
      </div>
    </van-popup>
    <!--招待上传弹框end-->
  </div>
</template> 

<script>
import axios from 'axios'
import data from '../../../static/data/init.json'
import { currentTime, dealImage, showSize, uuid } from '../../common/Utils'
import { testList } from '../../../static/data/list'
import { myHttp, PROD_URL } from 'config/http'
import Calendar from 'vue-calendar-component'
import { chargeTypeEnum } from '../../config/enum'
import AreaList from '../../common/area'
import { dateFormat, get3MonthBefor } from 'common/filterDate'
import MyTabPicker from '../../customComponents/tab-picker'
import { resolveResult } from '../../common/bussiness'

import {
  DatetimePicker,
  ActionSheet,
  Button,
  Picker,
  Area,
  Collapse,
  CollapseItem,
  Field,
  Popup,
  Icon,
  Toast,
  Tab,
  Tabs,
  Uploader,
  CellGroup,
  SwitchCell,
  Switch
} from 'vant'
export default {
  name: 'ProjectApply',
  components: {
    MyTabPicker,
    Calendar,
    VanDatetimePicker: DatetimePicker,
    VanActionSheet: ActionSheet,
    VanButton: Button,
    VanPicker: Picker,
    VanArea: Area,
    VanCollapse: Collapse,
    VanCollapseItem: CollapseItem,
    VanField: Field,
    VanPopup: Popup,
    VanIcon: Icon,
    VanTab: Tab,
    VanTabs: Tabs,
    VanUploader: Uploader,
    VanCellGroup: CellGroup,
    VanSwitchCell: SwitchCell,
    VanSwitch: Switch
  },
  created () {
    console.log(chargeTypeEnum)
    this.chargeTypeEnum = chargeTypeEnum
    // this._getInfo()

    if (this.partnerList.length === 0) {
      this.partnerText = this.leader  // 初始同行人为默认领队
      this.partnerList = [{ value: this.leader }]
    }
    // 获取指派人
  },
  computed: {
    transportation () {
      if (!this.goTrans || !this.backTrans || this.goTrans === '请选择' || this.backTrans === '请选择') {
        return '请选择'
      }
      return '去程:' + this.goTrans + ' ' + '回程:' + this.backTrans
    },
    addressStr () {
      let content = this.address.map(item => item.label).join(' ')
      console.log(content)
      return content
    }

  },
  data () {
    return {
      startTotalMoney: '',   // 立项总金额
      up_no: 1, // 上传编号
      compressImg: '', // 压缩后的base64
      maxSize: 1048576 * 2,  // 1M 1048576
      toApprover: '', // 指派审批人
      showApprover: false,    // 显示指派审批人
      toApproverList: ['A审批人', 'B审批人', 'C审批人'],
      show: false,
      address: [],
      data: data,
      choose: 0,
      chooseOne: '',         // 前面第一个日期
      chooseOneFilter: '',   // 带有中文的
      chooseTwo: '',         // 后面第二个日期
      chooseTwoFilter: '',
      arr: [],
      // arr: [{ date: '2019/11/1', className: 'mark1' }, { date: '2019/11/13', className: 'mark2' }],
      showCalendar: false,  // 显示日历
      attaTripIndex: 0,   // 差旅上传附件索引
      swiperTripList: [
        {
          attaList: [{
            attachfileList: [],
            attachTitle: '',
            attachInfo: []
          }],
          partnerName: ''
        }
      ],
      swiperServeList: [{
        attachfileList: [],
        providerName: '武汉铁路交通1',
        expendTotalMoney: '7340',
        billDate: '2019年10月28日',
        isPayTaxText: '否',
        isPayTax: false
      }],
      swiperOption: {
        effect: 'coverflow',
        centeredSlides: true,

        speed: 700,
        loop: false,
        slidesPerView: 'auto',
        loopedSlides: 3,
        coverflowEffect: {
          rotate: 0, // 滑动时旋转角度
          stretch: -36, // 聚合宽度
          depth: 80, // 景深
          modifier: 1, // 覆盖叠加层数
          slideShadows: false// 是否阴影
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      showUploaderAttachTrip: false,               // 差旅上传附件popup
      showUploaderAttachServe: false,               // 招待上传附件popup
      chargeTypeEnum: 0,
      startDate: '',                        // 立项日期
      showStartDate: false,
      minDate: new Date(get3MonthBefor()),
      startPickerDate: new Date(),
      chargeTypeText: '',                   // 费用类型文字
      chargeType: 0,                        // 费用类型 1 2
      showChargeType: false,
      chargeTypeValue: '',
      chargeTypeList: ['差旅费', '市场费用', '非市场费用'],
      isabled: true,                        // 提交按钮是否可用
      leader: '领队TEST',                           // 领队人
      businessTripDate: '',                 // 出差时间
      businessTripAddress: '',              // 出差地点
      showBusinessTripAddress: false,       // 显示出差地址
      areaList: AreaList,                   // 地址数据
      activeNames: ['1'],
      remarkInfoContent: '',                // 备注信息内容
      partner: '',                          // 同行人 默认为用户自己
      partnerText: '',                      // 同行人文字内容 默认为用户自己
      partnerInput: [],
      showPartnerPopup: false,              // 显示同行人弹窗
      partnerList: [],                      // 同行人列表
      dataModel: [],
      showTransportation: false,            // 显示交通工具弹框
      transportationList: ['请选择', '火车', '飞机', '汽车'],   // 交通工具列表
      goTrans: '',                          // 去程交通工具
      backTrans: '',                        // 回程交通工具
      attachment: '上传附件',                 // 附件
      fileList: [],                         // 附件
      // 招待 serve
      agent: '',                             // 经办人
      expendTotalMoney: '',                  // 支出总金额
      handleGist: '',                        // 办理依据
      projDetail: '',                        // 项目明细
      checkProj: '',                         // 核算项目
      providerName: '',                      // 供应商名称
      isHaveAttachment: false,               // 是否有附件
      attachfileList: [],                     // 纸质附件
      imgeListTab: []                         // 上传接口的图片组名称
    }
  },

  methods: {
    _getToApprover () {
      if (this.chargeTypeValue === '') {
        Toast('请选择费用类型')
        return
      }
      if (this.chargeType === 2) {
        if (this.expendTotalMoney === '') {
          Toast('请输入支出总金额')
          return
        }
      }
      myHttp(PROD_URL + '/',
        {
          functionId: 'Q0001',
          body: {
            fyTranType: this.chargeTypeValue,
            Sp_atm: this.expendTotalMoney || 0, // 支出总金额
            LX_TYPE: 'LX_FY',   // 费用立项 "LX_FY" 支出立项 LX_ZC(必填)
            SpXno: '0',
            channelTranCode: 'Q0001'
          }
        }).then(res => {
          console.log(res)
          if (res.msgcode === '00') {
            console.log(JSON.parse(res.body))
          } else {
            Toast.info(res.rtnmsg)
          }
        })
    },
    showTabPicker () {

    },
    select (data) {
      console.log('data')
      console.log(data)
      console.log('this.data')
      console.log(this.data)

      if (data.index === 0) {
        myHttp(PROD_URL + '/',
          {
            functionId: 'Q0009',
            body: { Qry_type: data.value }
          }).then(res => {
            console.log(res)
            if (res.msgcode === '00') {

            } else {
              Toast.info(res.rtnmsg)
            }
          })

        // axios.get('static/data/ej.json').then(res => {
        //   if (data.option.selected) {
        //     data.option.selected.children = res.data
        //   }
        // })
      } else if (data.index === 1) {
        axios.get('static/data/sj.json').then(res => {
          if (data.option.selected) {
            data.option.selected.children = res.data
          }
        })
      }
      if (data.index === 2) {
        this.show = false
      }
    },

    handleChange ({ options }) {
      console.log(options)
      if (options.length === 3) {
        if (options[0].label === '差旅费') {
          console.log(this.chargeType)
          this.chargeType = chargeTypeEnum.TRIP
        } else if (options[0].label === '市场费用' || options[0].label === '非市场费用') {
          this.chargeType = chargeTypeEnum.SERVE
        }
      }

      this.address = options
    },
    _getInfo () {
      myHttp(PROD_URL + '/',
        {
          functionId: 'Q0009',
          body: { Qry_type: 'FY_CLF' }
        }).then(res => {
          console.log(res)
          if (res.rtnCode === '00') {

          } else {
            Toast.info(res.rtnMsg)
          }
        })
    },
    // 显示指派审批人弹框
    onShowApprover () {
      this._getToApprover()
      this.showApprover = true
    },
    onChangePayTax (value, index) {
      console.log(value, index)
      if (value === '否') {
        this.swiperServeList[index].isPayTaxText = '是'
        this.swiperServeList[index].isPayTax = true
      } else {
        this.swiperServeList[index].isPayTaxText = '否'
        this.swiperServeList[index].isPayTax = false
      }
    },
    onBusinessTripDate () {
      this.showCalendar = true
      console.log(this.choose)
    },
    clickDay (data) {
      console.log(data) // 选中某天
      this.choose++
      console.log(this.choose)
      if (this.choose === 1) {
        this.chooseOne = data
        this.arr.push({ date: this.chooseOne, className: 'mark1' })
        let filterData = data.split('/')
        this.chooseOneFilter = filterData[0] + '年' + filterData[1] + '月' + filterData[2] + '日'
      } else if (this.choose === 2) {
        this.chooseTwo = data
        this.arr.push({ date: this.chooseTwo, className: 'mark2' })
        let filterData = data.split('/')
        this.chooseTwoFilter = filterData[0] + '年' + filterData[1] + '月' + filterData[2] + '日'
        this.showCalendar = false
      } else {
        this.choose = 1
        this.chooseOne = data
        this.arr = []
        this.arr.push({ date: this.chooseOne, className: 'mark1' })
        let filterData = data.split('/')
        this.chooseOneFilter = filterData[0] + '年' + filterData[1] + '月' + filterData[2] + '日'
      }
      if (this.arr.length === 2) {
        let date1 = this.arr[0].date
        let date2 = this.arr[1].date
        let filterDate1 = date1.split('/')
        let filterDate2 = date2.split('/')
        let tempDate = ''
        if (parseInt(filterDate1[0]) > parseInt(filterDate2[0])) {
          // 比较年
          console.log('比较年')
          tempDate = date1
          date1 = date2
          date2 = tempDate
        } else if (parseInt(filterDate1[1]) > parseInt(filterDate2[1])) {
          // 比较月
          console.log('比较月')
          tempDate = date1
          date1 = date2
          date2 = tempDate
        } else if (parseInt(filterDate1[2]) > parseInt(filterDate2[2])) {
          // 比较日
          console.log('比较日')
          tempDate = date1
          date1 = date2
          date2 = tempDate
        }

        this.chooseOne = date1
        this.chooseTwo = date2

        this.chooseOneFilter = this.filterDate(this.chooseOne)
        this.chooseTwoFilter = this.filterDate(this.chooseTwo)
      }

      console.log(this.chooseOne)
      console.log(this.chooseTwo)
      this.businessTripDate = this.chooseOneFilter + '至' + this.chooseTwoFilter
    },
    filterDate (date) {
      let filterData = date.split('/')
      let chooseOneFilter = filterData[0] + '年' + filterData[1] + '月' + filterData[2] + '日'
      return chooseOneFilter
    },
    changeDate (data) {
      console.log(data) // 左右点击切换月份
    },
    backUploaderAttachTrip () {
      this.showUploaderAttachTrip = false
    },
    backUploaderAttachServe () {
      this.showUploaderAttachServe = false
    },
    uploaderSaveTrip () {
      console.log(this.swiperTripList)
      // 组装上传数据
      // this.imgeListTab =
      this.showUploaderAttachTrip = false
    },
    uploaderSaveServe () {
      this.showUploaderAttachTrip = false
    },
    // 显示差旅上传弹框
    noticeAttache () {
      console.log('upTrip')
      this.showUploaderAttachTrip = true
      // 差旅上传弹框添加同行人名字
      if (this.partnerList.length === 1) {
        this.swiperTripList = [
          {
            attaList: [{
              attachfileList: [],
              attachTitle: '',
              attachInfo: []
            }],
            partnerName: this.leader
          }
        ]
      } else {
        for (let i = 0; i < this.partnerList.length; i++) {
          console.log(this.partnerList[i].value)
          this.swiperTripList[i].partnerName = this.partnerList[i].value
        }
      }
    },
    attachUploader () {
      console.log('upServe')
      this.showUploaderAttachServe = true
    },
    beforeDelete (file, detail) {
      // console.log(file)
      // console.log(detail)
    },
    deleteTrip (index, i) {
      console.log(this.attaTripIndex)
      console.log(i)
      console.log(index)
      console.log(this.swiperTripList[this.attaTripIndex].attaList)
      this.swiperTripList[index].attaList.splice(i, 1)
      console.log(this.swiperTripList)
    },
    // 差旅上传附件索引存储
    currentIndex (index, i) {
      console.log('currentIndex')
      console.log(index)
      this.attaTripIndex = index
      this.i = i
    },

    beforeAttaListTrip (file, detail) {
      console.log(file)
      console.log(detail)
    },
    printing (base64) {
      console.log('压缩后', base64.length / 1024)
      let base64size = showSize(base64)  // 压缩后base64的大小，单位kb
      if (base64size > 2048) {      // 发送给后端的base64图片大小需要小于2M
        Toast('上传的图片过大')
        return
      }
      console.log(base64size)
      this.compressImg = base64
      console.log('this.compressImg')
      console.log(this.compressImg)
      if (this.compressImg) {
        console.log('发送识别图片请求')
        myHttp(PROD_URL + '/',
          {
            functionId: 'U0001',
            body: {
              channelTranCode: 'U0001',
              LX_TYPE: 'LX_FY',
              fyTranType: this.chargeTypeValue,
              Imge_id: uuid(32, 16),
              X_NO: this.up_no,
              Image: this.compressImg
            }
          }).then(res => {
            console.log(res)
            if (res.msgcode === '00') {
              let body = JSON.parse(res.body)
              let JsonStr = JSON.parse(body.JsonStr)
              console.log(JsonStr)
              this.up_no++
            } else {
              Toast.info(res.rtnMsg)
            }
          })
      }
    },

    afterRead (file, detail) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      console.log(detail)
      console.log('this.attaTripIndex')
      console.log(this.attaTripIndex)

      if (file) {
        this.swiperTripList[this.attaTripIndex].attaList.push({
          attachfileList: [],
          attachTitle: '',
          attachInfo: []
        })
      }
      console.log(this.swiperTripList)
      if (file.size > 1048576) {
        dealImage(file.content, 800, this.printing)
      } else {
        console.log(testList.body)
        let body = JSON.parse(testList.body)
        console.log(body)
        let JsonStr = JSON.parse(body.JsonStr)
        console.log(JsonStr)
        this.up_no++
        let result = resolveResult(JsonStr)
        console.log(result)
        result.forEach((item, index) => {
          this.swiperTripList[this.attaTripIndex].attaList[this.i].attachInfo.push(result[index])
        })
        console.log(this.swiperTripList)
        // myHttp(PROD_URL + '/',
        //   {
        //     functionId: 'U0001',
        //     body: {
        //       channelTranCode: 'U0001',
        //       LX_TYPE: 'LX_FY',
        //       fyTranType: this.chargeTypeValue,
        //       Imge_id: uuid(32, 16),
        //       X_NO: this.up_no,
        //       Image: file.content
        //     }
        //   }).then(res => {
        //     console.log(res)
        //     if (res.msgcode === '00') {
        //       let body = JSON.parse(res.body)
        //       let JsonStr = JSON.parse(body.JsonStr)
        //       console.log(JsonStr)
        //       this.up_no++
        //       let result = resolveResult(JsonStr)
        //       console.log(result)
        //       result.forEach((item, index) => {
        //         this.swiperTripList[this.attaTripIndex].attaList.attachInfo = result[index]
        //       })
        //     } else {
        //       Toast.info(res.rtnMsg)
        //     }
        //   })
      }
      // 发送请求 反显图片附件信息
    },
    onAttachment () {

    },
    onGoChange (picker, value, index) {
      this.goTrans = value
      console.log(`当前值onGoChange：${value}, 当前索引：${index}`)
    },
    onBackChange (picker, value, index) {
      this.backTrans = value
      console.log(`当前值onBackChange：${value}, 当前索引：${index}`)
    },
    onTransportationConfirm (value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`)
      this.showTransportation = false
    },
    onTransportationCancel () {
      this.showTransportation = false
    },
    onTransportation () {
      this.showTransportation = true
    },
    backParntnerPopup () {
      // TODO 返回
      this.showPartnerPopup = false
    },
    savePartner () {
      this.showPartnerPopup = false
      this.partnerText = ''
      this.partnerList = [{ value: this.leader }]
      if (this.dataModel.length !== 0) {
        this.dataModel.forEach((item, index) => {
          if (item.value !== '') {
            this.partnerList.push(this.dataModel[index])
          }
        })
      }
      // 同行人的内容显示
      if (this.partnerList.length <= 3) {
        for (let i = 0; i < this.partnerList.length; i++) {
          this.partnerText += this.partnerList[i].value + ','
        }
        console.log(this.partnerText)
        this.partnerText = this.partnerText.substr(0, this.partnerText.length - 1)
      } else {
        this.partnerText = this.partnerList[0].value + ',' + this.partnerList[1].value + ',' + this.partnerList[2].value + '...'
      }
      console.log(this.partnerList)

      let swiperLength = this.partnerList.length
      this.swiperTripList = [
        {
          attaList: [{
            attachfileList: [],
            attachTitle: '',
            attachInfo: []
          }],
          partnerName: this.leader
        }
      ]
      for (let j = 0; j < swiperLength - 1; j++) {
        console.log(this.swiperTripList)
        this.swiperTripList.push({
          attaList: [{
            attachfileList: [],
            attachTitle: '',
            attachInfo: []
          }]
          // partnerName: this.leader
        })
      }
    },
    onAddPartner () {
      console.log(this.dataModel.length)
      var partner = { value: '' }
      let isHaveBlank
      if (this.dataModel.length > 0) {
        this.dataModel.forEach((item) => {
          if (item.value === '') {
            isHaveBlank = true
          }
        })
        if (isHaveBlank) {
          Toast('请输入同行人')
        } else {
          this.dataModel.push(partner)
        }
      } else {
        this.dataModel.push(partner)
      }
    },
    onPartner () {
      this.showPartnerPopup = true
    },
    onBusinessTripAddressConfirm (arr, index) {
      let addrArr = []
      arr.forEach((item, index) => {
        addrArr.push(item.name)
      })
      this.businessTripAddress = (addrArr[0] === addrArr[1])
        ? this.businessTripAddress = addrArr[1] + ' ' + addrArr[2]
        : this.businessTripAddress = addrArr[0] + ' ' + addrArr[1] + ' ' + addrArr[2]
      console.log(this.businessTripAddress)
      this.showBusinessTripAddress = false
    },
    onBusinessTripAddress () {
      this.showBusinessTripAddress = true
    },

    onStartDate () {
      this.showStartDate = true
    },
    confirmStartDate (value) {
      console.log(dateFormat('YYYY-mm-dd', value))
      this.startDate = dateFormat('YYYY-mm-dd', value)
      this.showStartDate = false
    },
    onChargeType () {
      this.showChargeType = true
    },
    onChargeTypeConfirm (value, index) {
      console.log(`当前类型值：${value}, 当前索引：${index}`)
      this.chargeTypeText = value

      if (this.chargeTypeText === '差旅费') {
        this.chargeType = chargeTypeEnum.TRIP
        this.chargeTypeValue = 'FY_CLF'
      } else if (this.chargeTypeText === '市场费用') {
        this.chargeType = chargeTypeEnum.SERVE
        this.chargeTypeValue = 'FY_SC'
      } else if (this.chargeTypeText === '非市场费用') {
        this.chargeType = chargeTypeEnum.SERVE
        this.chargeTypeValue = 'FY_FSC'
      }
      this.showChargeType = false
      console.log(this.chargeType)
    },
    onChargeTypeCancel () {
      this.showChargeType = false
    },
    // 指派审批人
    onToApproverCancel () {
      this.showApprover = false
    },
    onToApproverConfirm (value, index) {
      console.log(`当前值指派审批人：${value}, 当前索引：${index}`)
      this.toApprover = value
      this.showApprover = false
    },
    change (e) {
      console.log(e.getValues())
    },

    filter (type, options) {
      return options
    },
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      }
      return value
    },
    submit () {
      console.log('提交')
      // this._getInfo()
      console.log(this.partnerList)
      if (this.validate()) {
        myHttp(PROD_URL + '/',
          {
            functionId: 'F0001',
            body: {
              SpXno: '1',
              channelDate: this.startDate.replace(/-/g, ''), // 发起方日期
              channelTime: currentTime(),                               // 发起方时间
              fyTranType: this.chargeTypeValue,         //  费用类型
              TAB_LEAN_EHR: this.leader,                     // 领队人
              TAB_GROUP_EHR: this.partnerList,               // 同行人
              TAB_GROUP_NUM: this.partnerList.length,                             // 同行人人数
              TAB_STR_DATE: this.chooseOne,                  // 出差开始日期
              TAB_END_DATE: this.chooseTwo,                  // 出差结束日期
              TAB_DAY_NUM: '',                               // 出差天数;
              TAB_CZ_ADDRESS: this.businessTripAddress,      // 出差地点;
              TAB_CZ_TYPE: '',                               // 出差任务类型 公务：GW 营销 YX 会议 HY 培训 PX 实习SX 其它 QT
              TAB_CZ_FILE: '',                               // 出差通知或文件名称;
              TAB_CZ_FILENO: '',                             // 出差通知或文件文号;
              TAB_TO_JTGJ: this.goTrans,                     // 出差去程交通;
              TAB_BCK_JTGJ: this.backTrans,                  // 出差返程交通;
              NOTES: this.remarkInfoContent,                 // 备注;
              TAB_EHR_TELL: ''                               // 经办人电话;
            }
          }).then(res => {
            console.log(res)
            if (res.rtnCode === '0000') {

            } else {
              Toast.info(res.rtnMsg)
            }
          })
      }
    },
    validate () {
      console.log(this.businessTripAddress)
      if (this.startDate === '') {
        Toast('请选择立项日期')
        return false
      } else if (this.chargeType === 0) {
        Toast('请选择费用类型')
        return false
      } else if (this.toApprover === '') {
        Toast('请选择指派审批人')
        return false
      }
      if (this.chargeType === 1) {
        if (this.chooseOne === '' && this.chooseTwo === '') {
          Toast('请选择出差时间')
          return false
        } else if (this.chooseOne === '') {
          Toast('请选择开始出差时间')
          return false
        } else if (this.chooseTwo === '') {
          Toast('请选择结束出差时间')
          return false
        } else if (this.businessTripAddress === '') {
          Toast('请选择出差地点')
          return false
        } else if (this.goTrans === '' && this.backTrans === '') {
          Toast('请选择交通工具')
          return false
        } else if (this.goTrans === '') {
          Toast('请选择去程交通工具')
          return false
        } else if (this.backTrans === '') {
          Toast('请选择返程交通工具')
          return false
        }
      }
      return true
    }
  }
}
</script>
<style lang="less">
.view-project-apply {
  @import "../../assets/styles/custom/input.less";
  @import "../../assets/styles/custom/button.less";
  @import "../../assets/styles/custom/collapse.less";
  @import "../../assets/styles/custom/textarea.less";
  @import "../../assets/styles/custom/calendar.less";

  // md-popup md-tab-picker

  .md-popup-title-bar {
    height: 40px;
  }
  .md-popup-title-bar .title-bar-title {
    padding-top: 14px;
    p.title {
      font-size: 16px;
    }
  }
  .md-popup-title-bar .md-popup-close {
    padding-top: 14px;
  }
  .md-tab-bar-item {
    min-height: 40px;
  }
  .md-cell-item-body {
    padding: 0;
    min-height: 40px;
  }
  .md-tab-picker .md-tab-bar-list .md-tab-bar-item {
    font-size: 16px;
  }
  .md-cell-item-content {
    font-size: 16px;
  }
  .lead-input {
    .md-field-item-control {
      input {
        color: #858b9c;
      }
    }
  }
  .my-swiper {
    .ticket-info {
      .md-field-item-title {
        font-size: 12px !important;
        color: #666;
      }
      .ticket-title {
        .md-field-item-title {
          color: #111a34;
          font-size: 14px !important;
        }
      }
    }
    .add-atta {
      color: #111a34;
      font-size: 14px !important;
    }
    .popup-content.popup-trip,
    .popup-content.popup-serve {
      .md-field-item-content {
        .md-field-item-right {
          .field-right {
            display: flex;
            align-items: center;
            .text {
              display: inline-block;
              margin-right: 8px;
              color: #111a34;
            }
          }
        }

        .md-field-item-title {
          width: inherit !important;
        }
      }
    }
  }

  .my-swiper {
    position: relative;
    width: 100%;
    height: 100%;
    .swiper-container {
      overflow: visible;
      top: 50%;
      margin-top: -255px;
    }
    .swiper-pagination-bullet-active {
      background: #ffdb26;
      display: none;
    }
    .swiper-pagination-bullets {
      // bottom: 50px;
    }
    .swiper-pagination-bullet {
      width: 8px;
      height: 4px;
      display: none;
    }
    .swiper-inner {
      width: 100%;
      height: 510px;
    }
    .swiper-slide {
      overflow-y: scroll;
      padding: 0 16px;
      border-radius: 20px;
      background-position: center;
      background-size: cover;
      width: 290px;
      height: 510px;

      background-color: #fff;
    }
    .popup-wrap {
      .popup-title {
        padding: 8px 0;
        background: #fff;
        position: sticky;
        z-index: 99;
        top: 0;
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
              color: #666;
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
  .my-switch.van-cell {
    padding: 8px 0;
    height: 50px;
  }

  .detail-list-collapse {
    .van-collapse-item__content {
      height: inherit;
    }
    .van-cell-group {
      width: 100%;
    }
  }
  .handle-gist {
    .van-field__label {
      display: none !important;
    }
  }
  .remark-collapse {
    .van-field__label {
      display: none !important;
    }
  }

  .van-field__body {
    height: 100%;
  }
  .business-trip {
    .md-field-item-content:before {
      border: none;
    }
  }
  .my-popup-swiper.van-popup {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
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

  .van-tabs__line {
    background-color: #1989fa;
  }

  .notice-attachment {
    .md-field-item-content:before {
      border: none;
    }
  }
  .uploader-wrap {
    background: #fff;
    // overflow-x: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .upload-img-wrap {
      border: 1px solid #b2b2b2;
      border-radius: 4px;
      margin: 8px 16px;
      width: 280px;
      height: 110px;
      background-image: url("../../assets/img/timg.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      .mark-bg {
        background: rgba(0, 0, 0, 0.2);
        width: 100%;
        height: 100%;
        position: relative;
        img {
          display: inline-block;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 28px;
          height: 24px;
          margin-top: -12px;
          margin-left: -14px;
        }
      }
    }
    .van-uploader__wrapper {
      // -webkit-flex-wrap: nowrap;
      // flex-wrap: nowrap;
      display: flex;
      justify-content: center;
    }

    .van-uploader {
      display: inline-flex;
      height: 100%;
      // overflow-x: scroll;

      .van-uploader__upload {
        border: 1px solid #b2b2b2;
        border-radius: 4px;
        margin: 8px 16px;
        width: 200px;
        height: 110px;
      }
      .van-image__img {
        width: 200px;
        height: 110px;
      }
      .van-uploader__preview {
        border: 1px solid #b2b2b2;
        border-radius: 4px;
        margin: 8px 16px;
        width: 200px;
        height: 110px;

        .van-uploader__preview-image {
          width: 200px;
          height: 110px;
        }
      }
    }
  }
  .textarea-wrap {
    .title {
      font-size: 14px;
      margin: 16px 0 0 0;
    }
    .md-field-item-content {
      padding-top: 8px;
    }
    .md-field-item-control {
      textarea {
        color: #666;
        font-weight: normal;
      }
    }
  }
}
</style>