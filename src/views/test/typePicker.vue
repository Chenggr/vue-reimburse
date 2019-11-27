<template>
  <div class="test-type-picker">
    <my-tab-picker ref="tabPicker"
                   :mask-closable="false"
                   title="请选择"
                   describe=""
                   large-radius
                   @select="select"
                   :data="data"
                   v-model="show"
                   @change="handleChange" />
    <md-field>
      <md-field-item title="费用类型"
                     arrow="arrow-right"
                     @click="show = !show"
                     placeholder=""
                     :content="addressStr"
                     solid />
    </md-field>
  </div>
</template>
<script>
import axios from 'axios'
import data from '../../../static/data/init.json'
// import data from '../../../static/data/init.json'
import MyTabPicker from '../../customComponents/tab-picker'
export default {
  components: {
    MyTabPicker
  },
  data () {
    return {
      data: data,
      address: [],
      show: false
    }
  },
  computed: {
    addressStr () {
      let content = this.address.map(item => item.label).join(' ')
      console.log(content)
      return content
    }
  },
  methods: {
    select (data) {
      console.log('data')
      console.log(data)
      console.log('this.data')
      console.log(this.data)
      if (data.index === 0) {
        axios.get('static/data/ej.json').then(res => {
          data.option.selected.children = res.data
        })
      } else if (data.index === 1) {
        axios.get('static/data/sj.json').then(res => {
          data.option.selected.children = res.data
        })
      }
      if (data.index === 2) {
        this.show = false
      }
    },
    handleChange ({ options }) {
      console.log(options)
      this.address = options
    }
  }
}
</script>
<style lang="less">
</style>