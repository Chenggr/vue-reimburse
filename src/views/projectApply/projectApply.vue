<template>
  <div class="view-project-apply">

    <md-field>
      <md-field-item solid
                     title="立项日期"
                     arrow
                     :addon="startDate"
                     @click="onStartDate" />
      <md-field-item solid
                     title="费用类型"
                     arrow
                     :addon="chargeTypeText"
                     @click="onChargeType" />

      <div v-if="this.chargeType == chargeTypeEnum.TRIP">
        <md-input-item title="领队人"
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
            <van-field v-model="remarkInfoContent"
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
      </div>
      <!-- <van-uploader v-model="attachfileList"               
                    image-fit="fill"
                    :after-read="afterRead" /> -->
    </div>
    <div v-if="this.chargeType == chargeTypeEnum.TRIP"
         class="uploader-wrap">
      <div class="upload-img-wrap"
           @click="noticeAttache">
      </div>
      <!-- <van-uploader v-model="fileList"        
                    image-fit="fill"
                    :after-read="afterRead" /> -->
    </div>
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

    <van-action-sheet v-model="showBusinessTripAddress"
                      title="">
      <van-area :area-list="areaList"
                @confirm="onBusinessTripAddressConfirm" />
    </van-action-sheet>

    <van-action-sheet v-model="showChargeType"
                      title="">
      <van-picker show-toolbar
                  title=""
                  :columns="chargeTypeList"
                  @cancel="onChargeTypeCancel"
                  @confirm="onChargeTypeConfirm" />
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
          <div class="leader"><span class="order">1.</span> {{leader}}</div>
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
    <!--上传弹框-->
    <van-popup class="my-popup-swiper"
               v-model="showUploaderAttach">
      <div class="my-swiper">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in swiperList"
                        :key="index">
            <div>
              <div class="popup-wrap">
                <div class="popup-title">
                  <div class="left"
                       @click="backUploaderAttach">
                    <van-icon name="arrow-left" />
                  </div>
                  <div class="right"
                       @click="uploaderSave">保存</div>
                </div>
                <div class="popup-content">
                  <div>{{item.title}}</div>
                </div>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination"
               slot="pagination"></div>
        </swiper>
      </div>

    </van-popup>
    <!--上传弹框end-->
  </div>
</template> 

<script>
import Calendar from 'vue-calendar-component'

import { chargeTypeEnum } from '../../config/enum'
import AreaList from '../../common/area'
import { dateFormat, get3MonthBefor } from 'common/filterDate'
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
  SwitchCell
} from 'vant'
export default {
  name: 'ProjectApply',
  components: {
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
    VanSwitchCell: SwitchCell
  },
  created () {
    console.log(chargeTypeEnum)
    this.chargeTypeEnum = chargeTypeEnum
  },
  computed: {
    transportation () {
      if (!this.goTrans || !this.backTrans || this.goTrans === '请选择' || this.backTrans === '请选择') {
        return '请选择'
      }
      return '去程:' + this.goTrans + ' ' + '回程:' + this.backTrans
    }

  },
  data () {
    return {
      choose: 0,
      chooseOne: '',
      chooseOneFilter: '',   // 带有中文的
      chooseTwo: '',
      chooseTwoFilter: '',
      arr: [],
      // arr: [{ date: '2019/11/1', className: 'mark1' }, { date: '2019/11/13', className: 'mark2' }],
      showCalendar: false,  // 显示日历
      swiperList: [{ title: '111' }, { title: '222' }, { title: '333' }],
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
      showUploaderAttach: false,               // 上传附件popup
      chargeTypeEnum: 0,
      startDate: '',                        // 立项日期
      showStartDate: false,
      minDate: new Date(get3MonthBefor()),
      startPickerDate: new Date(),
      chargeTypeText: '',                   // 费用类型文字
      chargeType: 0,                        // 费用类型 1 2
      showChargeType: false,
      chargeTypeList: ['差旅费', '招待费'],
      isabled: true,                        // 提交按钮是否可用
      leader: '领队xx',                           // 领队人
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
      transportationList: ['请选择', '火车', '飞机'],   // 交通工具列表
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
      attachfileList: []                     // 纸质附件
    }
  },

  methods: {
    onBusinessTripDate () {
      this.showCalendar = true
      console.log(this.choose)
      if (this.choose === 2) {
        // this.choose = 0
        // this.arr = []
      }
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
        // TODO  比较日期大小
      } else {
        this.choose = 1
        this.chooseOne = data
        this.arr = []
        this.arr.push({ date: this.chooseOne, className: 'mark1' })
        let filterData = data.split('/')
        this.chooseOneFilter = filterData[0] + '年' + filterData[1] + '月' + filterData[2] + '日'
      }
      this.businessTripDate = this.chooseOneFilter + '至' + this.chooseTwoFilter
    },
    changeDate (data) {
      console.log(data) // 左右点击切换月份
    },
    backUploaderAttach () {
      this.showUploaderAttach = false
    },
    uploaderSave () {
      this.showUploaderAttach = false
    },
    noticeAttache () {
      // 纸质附件上传
      // 打开swiper
      console.log('up')
      this.showUploaderAttach = true
    },
    attachUploader () {
      // 纸质附件上传
      // 打开swiper
      console.log('up')
      this.showUploaderAttach = true
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
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
        this.partnerText = this.partnerText.substr(0, this.partnerText.length - 1)
      } else {
        this.partnerText = this.partnerList[0].value + ',' + this.partnerList[1].value + ',' + this.partnerList[2].value + '...'
      }
      console.log(this.partnerList)
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
      console.log(`当前值：${value}, 当前索引：${index}`)
      this.chargeTypeText = value
      this.showChargeType = false
      if (this.chargeTypeText === '差旅费') {
        this.chargeType = chargeTypeEnum.TRIP
      } else if (this.chargeTypeText === '招待费') {
        this.chargeType = chargeTypeEnum.SERVE
      }
    },
    onChargeTypeCancel () {
      this.showChargeType = false
    },
    change (e) {
      console.log(e.getValues())
    },
    submit () {
      console.log('提交')
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
      padding: 8px 16px;
      border-radius: 20px;
      background-position: center;
      background-size: cover;
      width: 290px;
      height: 510px;

      background-color: #fff;
    }
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
    overflow-x: auto;
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
    }
    .van-uploader__wrapper {
      -webkit-flex-wrap: nowrap;
      flex-wrap: nowrap;
    }
    .van-uploader {
      display: inline-flex;
      height: 100%;
      overflow-x: auto;
      .van-uploader__upload {
        border: 1px solid #b2b2b2;
        border-radius: 4px;
        margin: 8px 16px;
        width: 280px;
        height: 110px;
      }
      .van-image__img {
        width: 280px;
        height: 110px;
      }
      .van-uploader__preview {
        border: 1px solid #b2b2b2;
        border-radius: 4px;
        margin: 8px 16px;
        width: 280px;
        height: 110px;

        .van-uploader__preview-image {
          width: 280px;
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