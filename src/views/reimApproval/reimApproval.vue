<template>
  <div class="view-reimApproval">
    <md-field>
      <md-input-item :title="username"
                     readonly
                     v-model="phone"
                     align="right"
                     placeholder=""></md-input-item>
      <md-input-item title="所属部门"
                     readonly
                     v-model="department"
                     align="right"
                     placeholder=""></md-input-item>
      <md-field-item title="职位"
                     :addon="position" />
      <md-field-item solid
                     title="申请日期"
                     arrow
                     :addon="applyDate"
                     @click="onApplyDate" />
      <md-field-item title="报销部门"
                     :addon="reimDepartment" />
      <md-field-item title="行程信息"
                     :addon="travelInfo" />
      <md-field-item title="主办单位"
                     :addon="organizers" />
      <md-field-item title="同行人员"
                     :addon="partner" />
      <md-field-item title="是否出境"
                     :addon="depart" />
      <md-field-item title="出差日期"
                     :addon="tripDate" />
      <div class="textarea-wrap">
        <div class="title"> 出差事由</div>
        <div class="desc">{{desc}}</div>
      </div>
    </md-field>

    <div class="line"></div>
    <div class="bg">
      <div class="table-wrap">
        <div class="lines line-title">
          <div>补贴标准</div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="lines">
          <div>项目</div>
          <div>单价</div>
          <div>天数</div>
          <div>人数</div>
          <div>小计</div>
        </div>
        <div class="lines">
          <div>出差补贴</div>
          <div>90</div>
          <div>5</div>
          <div>2</div>
          <div>900</div>
        </div>
        <div class="lines">
          <div>住宿补贴</div>
          <div>90</div>
          <div>5</div>
          <div>2</div>
          <div>900</div>
        </div>
      </div>
    </div>

    <div>
      <md-field>
        <div class="record-wrap">
          <div class="title">流转记录</div>
          <div class="scroll-wrap">
            <my-cell v-for="item of list"
                     :key="item.id"
                     :title="item.title"
                     :department="item.department"
                     :username="item.username"
                     :opinion="item.opinion"></my-cell>

          </div>
        </div>
      </md-field>
    </div>
    <div class="btns">
      <div class="btn-3-1">
        <van-button>同意</van-button>
      </div>
      <div class="btn-3-1">
        <van-button>面谈</van-button>
      </div>
      <div class="btn-3-1">
        <van-button>拒绝</van-button>
      </div>
    </div>

    <van-action-sheet v-model="showApplyDate"
                      title="">
      <van-datetime-picker v-model="pickerApplyDate"
                           @confirm="confirmApplyDate"
                           :min-date="minDate"
                           type="date"
                           :formatter="formatter" />
    </van-action-sheet>
  </div>
</template>
<script>
import { dateFormat } from 'common/filterDate'
import { InputItem, Field } from 'mand-mobile'
import { DatetimePicker, ActionSheet, Button } from 'vant'
import MyCell from '@/common/components/cell.vue'
export default {
  name: 'ReimApproval',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    VanDatetimePicker: DatetimePicker,
    VanActionSheet: ActionSheet,
    VanButton: Button,
    MyCell
  },
  data () {
    return {
      username: '姓名: 张三',
      phone: '13534153351',
      department: '武汉市江岸区澳门路金冠大厦中国银行支行',
      position: '行长',
      applyDate: '',
      showApplyDate: false,
      minDate: new Date(2019, 1, 1),
      pickerApplyDate: new Date(),
      reimDepartment: 'xxx', // 报销部门
      travelInfo: 'xxxx',
      organizers: 'xxxx',
      partner: 'xx,xx,xx',
      depart: '是',
      tripDate: '2019-08-06到2019-08-08',
      desc: '出差参加会议',
      list: [
        {
          title: 'fms驳回 2019-08-5 11:20:00',
          department: '中国银行湖北省分行财务管理部同城财务管理',
          username: '张三1',
          opinion: '同意'
        },
        {
          title: '报销预审人待处理',
          department: '中国银行湖北省分行财务管理部同城财务管理',
          username: '张三2',
          opinion: '拒绝'
        },
        {
          title: '开发部门总经理室同意 2019-08-05 11:18:00',
          department: '中国银行湖北省分行财务管理部同城财务管理',
          username: '张三3'
        },
        {
          title: '开发部门总经理室同意 2019-08-0',
          department: '中国银行湖北省分行财务管理部同城财务管理',
          username: '张三3'
        }
      ]
    }
  },
  methods: {
    onApplyDate () {
      this.showApplyDate = true
    },
    confirmApplyDate (value) {
      console.log(dateFormat('YYYY-mm-dd', value))
      this.applyDate = dateFormat('YYYY-mm-dd', value)
      this.showApplyDate = false
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
.view-reimApproval {
  padding-bottom: 60px;
  fieldset {
    margin: 0;
  }
  .md-field {
    padding: 0 8px;
    .md-field-item-title {
      font-size: 14px;
    }
    .md-field-item-control {
      font-size: 14px;
      input {
        font-size: 14px;
        font-weight: normal;
        color: #666;
      }
      ::-webkit-input-placeholder {
        font-size: 14px;
      }
      ::-moz-placeholder {
        font-size: 14px;
      }
      :-ms-input-placeholder {
        font-size: 14px;
      }
      :-moz-placeholder {
        font-size: 14px;
      }
    }
  }
  .md-field-item {
    height: 40px;
  }
  .md-field-item-content {
    min-height: 40px;
    padding: 0;
  }

  .md-input-item-input {
    min-height: 40px;
    height: 40px;
  }
  //  end
  .md-field-item-right {
    color: #666;
  }
  .textarea-wrap {
    .desc {
      color: rgba(153, 153, 153, 1);
      padding-top: 8px;
      min-height: 40px;
    }
    .title {
      font-size: 14px;
      margin: 16px 0 0 0;
    }
    .md-field-item-content {
      padding-top: 8px;
    }
    .md-field-item-control {
      textarea {
        font-size: 14px;
        color: #666;
        font-weight: normal;
      }
    }
  }
  .record-wrap {
    margin-top: 20px;

    background: #fff;
    .title {
      font-size: 14px;
      margin: 16px 0 0 0;
    }
    .scroll-wrap {
      min-height: 100px;
      max-height: 300px;
      overflow: scroll;
    }
    .md-example-child-scroll-view-3 {
      // height: 800px;
      background: #fff;
      .scroll-view-item {
        // padding: 30px 0;
        text-align: center;
        font-size: 32px;
        font-family: DINAlternate-Bold;
        border-bottom: 0.5px solid #efefef;
      }
    }
  }
  .line {
    padding-top: 8px;
    width: 100%;

    position: relative;
    background: #fff;
    &::before {
      content: "";
      position: absolute;
      z-index: 2;
      -webkit-transform-origin: 100% 50%;
      transform-origin: 100% 50%;
      -webkit-transform: scaleY(0.5) translateY(100%);
      transform: scaleY(0.5) translateY(100%);
      bottom: 0;
      left: 0;
      right: auto;
      top: auto;
      width: 100%;
      border-bottom: 0.02667rem solid #e2e4ea;
      -webkit-transform-origin: 50% 100%;
      transform-origin: 50% 100%;
    }
  }
  .btns {
    position: fixed;
    z-index: 3;
    width: 100%;
    bottom: 0;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(247, 247, 247, 1);
    .btn-3-1 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33.3%;
      .van-button--normal {
        width: 80px;
      }
    }
  }
  .bg {
    padding: 16px 16px;
    background: #fff;
  }
  .table-wrap {
    border-radius: 8px;
    background: rgb(246, 246, 246);
    .line-title {
      color: #fff;
      border-radius: 8px 8px 0 0;
      background: rgb(74, 143, 226);
    }
    .lines {
      display: flex;
      div {
        padding: 4px 0;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>