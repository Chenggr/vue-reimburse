<template>
  <div class="view-detail">
    <div class="md-example-child md-example-child-input-item-2">
      <md-field>

        <md-input-item title="中心代码"
                       clearable
                       v-model="centerId"
                       @keydown="onInputKeydown"
                       @change="onInputChange"
                       placeholder="请输入责任中心代码"></md-input-item>
        <md-input-item title="责任中心名称"
                       clearable
                       v-model="centerName"
                       placeholder="请输入责任中心名称"></md-input-item>
        <md-input-item title="员工编号"
                       clearable
                       v-model="staffNo"
                       placeholder="请输入员工编号"></md-input-item>
        <md-textarea-item ref="demo0"
                          title="费用描述"
                          autosize
                          class="example"
                          v-model="desc"
                          placeholder="请输入费用描述" />
      </md-field>
    </div>
    <van-uploader v-model="fileList"
                  :after-read="afterRead" />
    <br>
  </div>
</template>  
<script>
import { Uploader } from 'vant'
import { InputItem, Field } from 'mand-mobile'

export default {
  name: 'Detail',
  components: {
    VanUploader: Uploader,
    [InputItem.name]: InputItem,
    [Field.name]: Field
  },
  data () {
    return {
      fileList: [],
      name: '',
      centerId: '',
      centerName: '',
      staffNo: '',
      desc: ''
    }
  },
  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },

    onInputKeydown (name, event) {
      console.log(`[Mand Mobile InputItem keydown] ${event.keyCode}`)
    },
    onInputChange (name, value) {
      console.log(`[Mand Mobile InputItem change] ${value}`)
    }
  }
}
</script>
<style lang="less">
.view-detail {
  .md-field-item-title {
    font-size: 14px;
  }
  .md-field {
    padding: 8px 16px;
  }
  .md-field-item-control {
    font-size: 14px;
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
</style>