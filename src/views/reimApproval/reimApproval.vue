<template>
  <div class="view-reimApproval">
    <md-field>
      <md-input-item title="姓名"
                     clearable
                     v-model="username"
                     align="right"
                     placeholder=""></md-input-item>
      <md-input-item title="所属部门"
                     clearable
                     v-model="department"
                     align="right"
                     placeholder=""></md-input-item>
    </md-field>
  </div>
</template>
<script>
import { InputItem, Field } from 'mand-mobile'
export default {
  name: 'ReimApproval',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field
  },
  data () {
    return {
      username: '张三',
      department: '武汉市江岸区澳门路金冠大厦中国银行支行'
    }
  }

}
</script>
<style lang="less">
.view-reimApproval {
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
}
</style>