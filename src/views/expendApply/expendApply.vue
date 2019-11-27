<template>
  <div class="view-expend-apply">
    <md-field>
      <md-field-item solid
                     title="出差人"
                     arrow
                     :addon="busiTripMan"
                     @click="onBusiTripMan" />
      <md-field-item solid
                     title="立项日期"
                     :addon="startDate" />
      <md-field-item solid
                     title="费用类型"
                     arrow
                     :addon="billType"
                     @click="onBillType" />
      <div v-if="chargeType == 1">
        <md-field-item solid
                       title="出差时间"
                       class="after-border-none"
                       :addon="busiTripDate" />
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
                       placeholder=""
                       show-word-limit />
          </van-collapse-item>
        </van-collapse>
        <md-field-item solid
                       title="住宿费"
                       class="after-border-none"
                       arrow
                       :addon="stayMoney"
                       @click="onPopupInfo" />
        <van-collapse class="trip-collapse"
                      v-model="activeNames2">
          <van-collapse-item title="出差补贴"
                             name="2">
            <div slot="value">{{busiTripMoney}}</div>
            <div slot="default">
              <div>123</div>
              <div>123</div>
              <div>123</div>
            </div>
          </van-collapse-item>
        </van-collapse>
        <van-collapse class="other-collapse"
                      v-model="activeNames3">
          <van-collapse-item title="其他费用"
                             name="2">

            <div slot="default">
              <my-cell-type :type="'1'"
                            :list="otherMoneyList"
                            @onType="onOtherType"
                            @addBtn="addOtherBtn"></my-cell-type>
            </div>
          </van-collapse-item>
        </van-collapse>
        <van-collapse class="other-collapse"
                      v-model="activeNames4">
          <van-collapse-item title="交通工具"
                             name="2">

            <div slot="default">
              <my-cell-type :type="'1'"
                            :list="transportList"
                            @onType="onTransType"
                            @addBtn="addTransBtn"></my-cell-type>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div v-if="chargeType == 2">
        <md-field-item solid
                       title="指派人"
                       arrow
                       :addon="toApprover"
                       @click="onToApprover" />
        <md-field-item solid
                       title="支出总金额"
                       class="after-border-none"
                       :addon="expendTotalMoney" />
        <van-collapse class="remark-collapse"
                      v-model="activeNames">
          <van-collapse-item title="办理依据"
                             name="2">

            <van-field class="remark-info"
                       v-model="transcatGist"
                       rows="1"
                       autosize
                       label=""
                       type="textarea"
                       maxlength="50"
                       placeholder=""
                       show-word-limit />
          </van-collapse-item>
        </van-collapse>
        <van-collapse class="other-collapse"
                      v-model="activeNames2">
          <van-collapse-item title="费用明细"
                             name="2">

            <div slot="default"
                 style="width:100%; ">
              <my-cell-type :type="'2'"
                            :list="chargeDeatilList"
                            @onType="onChargeDetail"
                            @addBtn="addChargeDetailBtn"></my-cell-type>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </md-field>
    <div class="btn-wrap">
      <van-button type="default"
                  ref="submits"
                  @click="submit"
                  size="large">提交</van-button>
    </div>
    <!-- 指派人action-sheet -->
    <van-action-sheet v-model="showToApprover"
                      title="">
      <van-picker show-toolbar
                  title=""
                  :columns="toApproverList"
                  @cancel="onToApproverCancel"
                  @confirm="onToApproverConfirm" />
    </van-action-sheet>
    <!-- 费用类型action-sheet -->
    <van-action-sheet v-model="showBillType"
                      title="">
      <van-picker show-toolbar
                  title=""
                  :columns="billTypeList"
                  @cancel="onBillTypeCancel"
                  @confirm="onBillTypeConfirm" />
    </van-action-sheet>
    <!-- 出差人action-sheet -->
    <van-action-sheet v-model="showBusiTripMan"
                      title="">
      <van-picker show-toolbar
                  title=""
                  :columns="busiTripManList"
                  @cancel="onBusiTripManCancel"
                  @confirm="onBusiTripManConfirm" />
    </van-action-sheet>
    <!-- 立项弹框 -->
    <van-popup class="my-popup"
               :close-on-click-overlay="false"
               v-model="showExpendPopup"
               round>
      <div class="popup-wrap">
        <div class="popup-title">
          <div class="left"
               @click="backExpendPopup">
            <van-icon name="arrow-left" />
          </div>

          <div class="right"
               @click="save">保存</div>
        </div>
        <div class="popup-content">
          <div>添加附件</div>
          <div class="img-wrap">
            <div class="img-content">
              <img src=""
                   alt="">
            </div>
          </div>
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) of list"
                          :key="index">
              <van-cell-group>
                <van-field label="发票代号"
                           v-model="item.billNo"
                           input-align="right"
                           placeholder="" />
                <van-field label="发票号码"
                           v-model="item.billId"
                           input-align="right"
                           placeholder="" />
                <van-field label="开票日期"
                           v-model="item.billDate"
                           input-align="right"
                           placeholder="" />
                <van-field label="金额"
                           v-model="item.billMoney"
                           input-align="right"
                           placeholder="" />
                <van-field label="税率"
                           v-model="item.tax"
                           input-align="right"
                           placeholder="" />
                <van-field label="销货单位纳税人识别号"
                           v-model="item.taxpayerNum"
                           input-align="right"
                           placeholder="" />
              </van-cell-group>
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination"
               slot="pagination"></div>
        </div>

      </div>
    </van-popup>
  </div>
</template>
<script>
import MyCellType from '../../common/components/my-cell-type'
// import MyExpendPopup from '../../common/components/my-expend-popup'
// import { chargeTypeEnum } from '../../config/enum'

import {
  Icon,
  Popup,
  ActionSheet,
  Picker,
  Collapse,
  CollapseItem,
  Field,
  Button,
  CellGroup
} from 'vant'
export default {
  name: 'expendApply',
  components: {
    MyCellType,
    VanActionSheet: ActionSheet,
    VanPicker: Picker,
    VanCollapse: Collapse,
    VanCollapseItem: CollapseItem,
    VanField: Field,
    VanButton: Button,
    VanPopup: Popup,
    VanIcon: Icon,
    VanCellGroup: CellGroup
  },
  computed: {

  },
  data () {
    return {
      chargeType: 1,    // 1,2 两种类型
      list: [
        {
          billNo: '123123',        // 发票代号
          billId: '123123123',        // 发票号码
          billDate: '2019年10月28日',  // 开票日期
          billMoney: '3452.00',      // 金额
          tax: '3.45%',             // 税率
          taxpayerNum: '234552525252311'           // 纳税人识别号
        },
        {
          billNo: '123123',        // 发票代号
          billId: '123123123',        // 发票号码
          billDate: '2019年10月28日',  // 开票日期
          billMoney: '3452.00',      // 金额
          tax: '3.45%',             // 税率
          taxpayerNum: '234552525252311'           // 纳税人识别号
        },
        {
          billNo: '123123',        // 发票代号
          billId: '123123123',        // 发票号码
          billDate: '2019年10月28日',  // 开票日期
          billMoney: '3452.00',      // 金额
          tax: '3.45%',             // 税率
          taxpayerNum: '234552525252311'           // 纳税人识别号
        }
      ],
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

      showExpendPopup: false,    // 显示支出弹框
      chargeDeatilList: [
        {
          type: '个人金融业务',
          money: '485.00元',
          count: '1'
        },
        {
          type: '个人金融业务',
          money: '485.00元',
          count: '1'
        },
        {
          type: '个人金融业务',
          money: '485.00元',
          count: '1'
        }
      ],
      transcatGist: '招待往来',          // 办理依据
      expendTotalMoney: '2874.00元',
      toApproverList: ['指派人A', '指派人B', '指派人C'],
      showToApprover: false,
      toApprover: '',                  // 指派人
      busiTripMan: '张三丰 经理',
      showBusiTripMan: false,          // 显示出差人
      busiTripManList: ['AAA 经理', 'BBB 经理', 'CCC 经理'],
      startDate: '2019年10月28日',
      showBillType: false,
      billTypeList: ['个人金融差旅费', '公司金融差旅费', '其他金融差旅费'],
      billType: '',
      busiTripDate: '2019年10月28日至10月30日',
      activeNames: ['1'],
      activeNames2: ['1'],
      activeNames3: ['1'],
      activeNames4: ['1'],
      remarkInfoContent: '赴北京分行二手房调研费用',
      stayMoney: '单人住宿费 两天 900.00元',
      busiTripMoney: '伙食补助240元  交通补助240元', // 出差补贴
      otherMoneyList: [
        {
          type: '个人金融业务',
          money: '485.00元'
        },
        {
          type: '个人金融业务',
          money: '485.00元'
        },
        {
          type: '个人金融业务',
          money: '485.00元'
        }
      ],
      transportList: [
        {
          type: '火车',
          money: '485.00元',
          date: '10月14日-10月16日'
        },
        {
          type: '客车',
          money: '485.00元',
          date: '10月14日-10月16日'
        },
        {
          type: '飞机',
          money: '485.00元',
          date: '10月14日-10月16日'
        }
      ]
    }
  },
  methods: {
    save () {

    },
    backExpendPopup () {

    },
    onChargeDetail () {
      console.log('onChargeDetail')
    },
    addChargeDetailBtn () {

    },
    onToApproverCancel () {
      console.log('onToApproverCancel')
    },
    onToApproverConfirm (value, index) {
      console.log('onToApproverConfirm')
      this.toApprover = value
      this.showToApprover = false
    },
    // 指派人
    onToApprover () {
      this.showToApprover = true
    },
    submit () {
      console.log('submit')
    },
    onOtherType () {
      console.log('onOtherType')
    },
    onTransType () {
      console.log('onTransType')
    },
    addTransBtn () {
      console.log('addTransBtn')
    },
    addOtherBtn () {
      console.log('addOtherBtn')
    },
    onPopupInfo () {
      console.log('onPopupInfo')
      this.showExpendPopup = true
    },
    onBusiTripMan () {
      this.showBusiTripMan = true
    },
    onBusiTripManConfirm (value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`)
      // TODO 切换改变整页信息
    },
    onBusiTripManCancel () {

    },
    onBillType () {
      this.showBillType = true
    },
    onBillTypeConfirm (value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`)
      this.billType = value
      this.showBillType = false
    },
    onBillTypeCancel () {

    }
  }
}
</script>
<style lang="less">
.view-expend-apply {
  @import '../../assets/styles/custom/input.less';
  @import '../../assets/styles/custom/button.less';
  @import '../../assets/styles/custom/collapse.less';

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
        .img-wrap {
          display: flex;
          justify-content: center;
          padding: 10px 0 16px 0;
          .img-content {
            width: 200px;
            height: 110px;
            border: 1px solid #b2b2b2;
            border-radius: 4px;
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

  .other-collapse {
    .van-collapse-item__wrapper .van-collapse-item__content {
      height: inherit;
    }
  }

  .remark-collapse {
    .van-field__label {
      display: none !important;
    }

    .van-field__body {
      height: 100%;
    }
  }
  .after-border-none {
    .md-field-item-content::before {
      border: none;
    }
  }
  .trip-collapse {
    .van-cell__title {
      flex: none;
    }
  }
}
</style>
