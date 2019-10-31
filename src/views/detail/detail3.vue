<template>
  <div class="view-detail">
    <van-cell-group>
      <van-field v-model="centerId"
                 clearable
                 label="责任中心代码"
                 placeholder="请输入责任中心代码" />

      <van-field v-model="centerName"
                 clearable
                 label="责任中心名称"
                 placeholder="请输入责任中心名称" />
      <van-field v-model="staffNo"
                 label="员工编号"
                 maxlength="6"
                 placeholder="请输入员工编号" />
      <van-field v-model="message"
                 autosize
                 rows="2"
                 label="费用描述"
                 type="textarea"
                 placeholder="请输入费用描述" />
    </van-cell-group>
  </div>
</template>
<script>
import { Field, CellGroup } from 'vant'
export default {
  name: 'Detail',
  components: {
    VanField: Field,
    VanCellGroup: CellGroup

  },
  data () {
    return {
      centerId: '',
      centerName: '',
      message: '',
      staffNo: ''
    }
  }
}
</script>
<style lang="less">
.view-detail {
  .van-cell__value {
    // margin-top: 2px;
  }
  // .van-field__control {
  //   margin-top: 2px;
  // }
}
</style>