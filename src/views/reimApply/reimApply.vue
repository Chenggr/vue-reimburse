<template>
  <div class="view-reimApply">
    <md-field>
      <md-input-item title="报销部门"
                     clearable
                     v-model="department"
                     align="right"
                     placeholder="请输入报销部门"></md-input-item>
      <md-input-item title="报销项目"
                     clearable
                     v-model="project"
                     align="right"
                     placeholder="请输入报销项目"></md-input-item>
      <md-input-item title="发票识别"
                     clearable
                     align="right"
                     disabled
                     placeholder="请拍照"></md-input-item>
    </md-field>
    <div class="uploader-wrap">
      <van-uploader v-model="fileList"
                    image-fit="fill"
                    :after-read="afterRead" />

    </div>
    <md-field>

      <md-input-item title="开票日期"
                     clearable
                     v-model="invoiceDate"
                     align="right"
                     placeholder=""></md-input-item>
      <md-input-item title="发票代码"
                     clearable
                     v-model="invoiceId"
                     align="right"
                     placeholder=""></md-input-item>
      <md-input-item title="发票号码"
                     clearable
                     v-model="invoiceNo"
                     align="right"
                     placeholder=""></md-input-item>
      <md-input-item title="供应商名称"
                     clearable
                     v-model="supplierName"
                     align="right"
                     placeholder=""></md-input-item>
      <md-input-item title="发票金额"
                     clearable
                     v-model="invoiceMoney"
                     align="right"
                     placeholder=""></md-input-item>
      <md-input-item title="发票税额"
                     clearable
                     v-model="invoiceTax"
                     align="right"
                     placeholder=""></md-input-item>
      <md-input-item title="用途"
                     clearable
                     v-model="usage"
                     align="right"
                     placeholder=""></md-input-item>

    </md-field>
    <div class="btn-wrap">
      <van-button type="default"
                  @click="submit"
                  size="large">提交</van-button>
    </div>
  </div>
</template>
<script>
import { InputItem, Field } from 'mand-mobile'
import { Uploader, Icon, Button } from 'vant'
export default {
  name: 'ReimApply',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    VanUploader: Uploader,
    VanIcon: Icon,
    VanButton: Button
  },
  data () {
    return {
      fileList: [],
      department: '', // 报销部门
      project: '', // 报销项目
      invoiceDate: '2019.10.29',   // 开票日期
      invoiceId: '042134567666',  // 发票代码
      invoiceNo: '23423242',   // 发票号码
      supplierName: '武汉铁路交通',  // 供应商名称
      invoiceMoney: '1024.9',   // 发票金额
      invoiceTax: '1.25',    // 发票税额
      usage: '飞机'     // 用途
    }
  },
  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    submit () {
      console.log('submit')
    }
  }
}
</script>
<style lang="less">
.view-reimApply {
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
  .my-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-left: -10px;
    margin-top: -10px;
  }
  // .van-icon-plus:before {
  //   content: "\E622";
  // }
  .uploader-wrap {
    position: relative;
    overflow-x: auto;
    text-align: center;
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
        width: 300px;
        height: 130px;
      }
      .van-uploader__preview {
        border: 1px solid #b2b2b2;
        border-radius: 4px;
        margin: 8px 16px;
        width: 300px;

        .van-uploader__preview-image {
          width: 300px;
          height: 130px;
        }
      }
    }
  }
  .btn-wrap {
    display: flex;
    justify-content: center;
    padding: 30px 0;
    .van-button--large {
      width: 240px;
    }
    .van-button--default {
      border: 1px solid #999;
      border-radius: 4px;
    }
  }
}
</style>