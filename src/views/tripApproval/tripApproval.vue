<template>
  <div class="view-tripApproval">
    <md-field>
      <md-input-item :title="username"
                     readonly
                     v-model="phone"
                     align="right"
                     placeholder=""></md-input-item>
      <md-input-item title="机构名"
                     readonly
                     v-model="department"
                     align="right"
                     placeholder=""></md-input-item>
      <md-input-item title="职位"
                     readonly
                     v-model="position"
                     align="right"
                     placeholder=""></md-input-item>
      <md-field-item solid
                     title="申请日期"
                     arrow
                     :addon="applyDate"
                     @click="onApplyDate" />
      <md-field-item title="培训名称"
                     :addon="trainName" />
      <md-field-item title="行程信息"
                     :addon="travelInfo" />
      <md-field-item title="主办单位"
                     :addon="organizers" />
    </md-field>
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
import { InputItem, Field, FieldItem } from 'mand-mobile'
import { DatetimePicker, ActionSheet, Button } from 'vant'
export default {
  name: 'TripApproval',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    VanDatetimePicker: DatetimePicker,
    VanActionSheet: ActionSheet,
    VanButton: Button
  },
  data () {
    return {
      username: '姓名: 张三',
      phone: '13534153351',
      department: '武汉市江岸区中国银行支行',
      position: '行长',
      applyDate: '',
      showApplyDate: false,
      minDate: new Date(2019, 1, 1),
      pickerApplyDate: new Date(),
      trainName: 'xxxx',
      travelInfo: 'xxxx',
      organizers: 'xxxx'
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
.view-tripApproval {
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
  .md-field-item-right {
    color: #666;
  }
}
</style>