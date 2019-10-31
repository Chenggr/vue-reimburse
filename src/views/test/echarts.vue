<template>
  <div>
    <br>
    <van-button type="default"
                v-longTap="{methods: longTap, arg: {index:3,item:'longTap'}}"
                v-doubleTap="{methods: doubleTap, arg: {index:4,item:'doubleTap'}}">长按</van-button>

    <div style="padding:10px;"></div>

    <van-button type="default">默认按钮</van-button>
    <van-button type="info">信息按钮</van-button>

    <div style="padding:10px;"></div>

    <van-popup v-model="show"
               position="bottom">
      <ve-line :data="chartData2"
               :legend-visible="false"></ve-line>
    </van-popup>

    <div style="padding:10px;"></div>

    <ve-line :data="chartData"
             :settings="chartSettings"
             :tooltip-visible="true"
             :legend-visible="true"></ve-line>
    <!-- <ve-line :data="chartData2"></ve-line> -->
  </div>
</template>

<script>
import { Button, Popup } from 'vant'
import VeLine from 'v-charts/lib/line.common'
export default {
  components: {
    VeLine,
    VanButton: Button,
    VanPopup: Popup
  },
  data () {
    return {
      show: false, // popup显示
      arg: { index: 10, item: 'test' },
      // colors: ['#29b1f5', '#fc4442', '#7dd85b'], // 颜色的配置
      chartData: {
        columns: ['日期', '销售量', '比率'],
        rows: [
          { '日期': '1月1', '销售量': 123, '比率': 0.3 },
          { '日期': '1月2', '销售量': 1223, '比率': 0.6 },
          { '日期': '1月3', '销售量': 2123, '比率': 0.9 },
          { '日期': '1月4', '销售量': 4123, '比率': 0.12 },
          { '日期': '1月5', '销售量': 3123, '比率': 0.15 },
          { '日期': '1月6', '销售量': 7123, '比率': 0.20 }
        ]
      },
      // chart 配置项
      chartSettings: {
        area: true,
        axisSite: {
          right: ['比率']
        },
        yAxisType: ['normal', 'percent']
      },
      chartData2: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
    }
  },
  methods: {
    longTap (e, args) {
      var self = this
      self.msg = 'longTap'
      console.log('tap index:' + args.index + ',item:' + args.item)
      this.show = true // 显示popup
    },
    doubleTap (e, args) {
      var self = this
      self.msg = 'doubleTap'
      console.log('tap index:' + args.index + ',item:' + args.item)
    }
  }
}
</script>