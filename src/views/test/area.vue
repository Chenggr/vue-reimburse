<template>
  <div class="view-area">
    <div class="md-example-child md-example-child-tab-picker md-example-child-tab-picker-0">
      <md-field title="">
        <md-field-item title="联系地址"
                       arrow="arrow-right"
                       @click="show = !show"
                       placeholder="请选择联系地址"
                       :content="addressStr"
                       solid />
      </md-field>
      <md-tab-picker title="请选择"
                     describe=""
                     large-radius
                     :data="data"
                     v-model="show"
                     @change="handleChange" />
    </div>
  </div>
</template>
<script>
import { Field, FieldItem, TabPicker } from 'mand-mobile'
import data from '../../assets/data/type'

export default {
  data () {
    return {
      show: false,
      address: [],
      data: data
    }
  },
  components: {
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [TabPicker.name]: TabPicker
  },
  computed: {
    addressStr () {
      let content = this.address.map(item => item.label).join(' ')
      console.log(content)
      return content
    }
  },
  methods: {
    handleChange ({ options }) {
      console.log(options)
      this.address = options
    }
  }
}
</script>
<style lang="less"></style>
