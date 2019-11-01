<template>
  <div class="view-tripApply">
    <md-field>
      <md-input-item title="出差行程"
                     clearable
                     v-model="travel"
                     align="right"
                     placeholder=""></md-input-item>
      <md-input-item title="目的地"
                     clearable
                     v-model="destination"
                     align="right"
                     placeholder=""></md-input-item>
      <md-input-item title="同行人员"
                     clearable
                     v-model="partner"
                     align="right"
                     placeholder=""></md-input-item>
      <md-input-item title="是否出境"
                     clearable
                     v-model="depart"
                     align="right"
                     placeholder=""></md-input-item>
      <md-field-item solid
                     title="开始日期"
                     arrow
                     :addon="startDate"
                     @click="onStartDate" />
      <md-field-item solid
                     title="结束日期"
                     arrow
                     :addon="endDate"
                     @click="onEndDate" />

      <div class="textarea-wrap">
        <div class="title"> 出差事由</div>
        <md-textarea-item ref="demo0"
                          title=""
                          autosize
                          v-model="desc"
                          placeholder="请输入出差事由">

        </md-textarea-item>
      </div>
    </md-field>
    <div class="btn-wrap">
      <van-button type="default"
                  @click="submit"
                  size="large">提交</van-button>
    </div>
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
    <van-action-sheet v-model="showEndDate"
                      title="">
      <van-datetime-picker v-model="endPickerDate"
                           @confirm="confirmEndDate"
                           @change="change"
                           :min-date="minDate"
                           type="date"
                           :filter="filter"
                           :formatter="formatter" />
    </van-action-sheet>

  </div>
</template>
<script>
import { dateFormat } from 'common/filterDate'
import { InputItem, Field, FieldItem } from 'mand-mobile'
import { DatetimePicker, ActionSheet, Button } from 'vant'
export default {
  name: 'TripApply',
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
      travel: '武汉-杭州-武汉',
      destination: '杭州',
      partner: '张三,李四',
      depart: '否',
      startDate: '',
      endDate: '',
      desc: '',
      showStartDate: false,
      minDate: new Date(2019, 1, 1),
      startPickerDate: new Date(),
      endPickerDate: new Date(),
      showEndDate: false
    }
  },
  methods: {
    onStartDate () {
      this.showStartDate = true
    },
    confirmStartDate (value) {
      console.log(dateFormat('YYYY-mm-dd', value))
      this.startDate = dateFormat('YYYY-mm-dd', value)
      this.showStartDate = false
    },
    confirmEndDate (value) {
      this.endDate = dateFormat('YYYY-mm-dd', value)
      this.showEndDate = false
    },
    change (e) {
      console.log(e.getValues())
    },
    onEndDate () {
      this.showEndDate = true
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
    }
  }

}
</script>
<style lang="less">
.view-tripApply {
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
        font-size: 14px;
        color: #666;
        font-weight: normal;
      }
    }
  }
  .van-action-sheet__close {
    display: none;
  }
  .btn-wrap {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    .van-button--large {
      width: 240px;
      // height: 36px;
      // line-height: 36px;
    }
    .van-button--default {
      // background: transparent;
      border: 1px solid #999;
      border-radius: 4px;
    }
  }
}
</style>