<template>
  <div class="pullup">
    <div ref="scroller"
         class="pullup-bswrapper">
      <div class="pullup-scroller">
        <ul class="pullup-list">
          <my-cell v-for="item of list"
                   :key="item.id"
                   :title="item.title"
                   :department="item.department"
                   :username="item.username"
                   :opinion="item.opinion"></my-cell>
        </ul>
        <div class="pullup-wrapper">
          <div v-if="!isPullUpLoad"
               class="before-trigger">
            <span class="pullup-txt">Pull up and load more</span>
          </div>
          <div v-else
               class="after-trigger">
            <span class="pullup-txt">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import MyCell from './cell.vue'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)
export default {
  components: {
    // MyCell
  },
  data () {
    return {
      isPullUpLoad: false,
      data: 30,
      list: [
        {
          title: 'fms驳回 2019-08-5 11:2',
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
          title: '开发部门总经理室同意 2019-08-0',
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
  created () {
    this.bscroll = null
  },
  mounted () {
    this.initBscroll()
  },
  methods: {
    initBscroll () {
      this.bscroll = new BScroll(this.$refs.scroller, {
        scrollY: true,
        pullUpLoad: true
      })
      this.bscroll.on('pullingUp', this.pullingUpHandler)
    },
    async pullingUpHandler () {
      this.isPullUpLoad = true
      await this.requestData()
      this.bscroll.finishPullUp()
      this.bscroll.refresh()
      this.isPullUpLoad = false
    },
    async requestData () {
      try {
        const newData = await this.ajaxGet(/* url */)
        this.data += newData
      } catch (err) {
        // handle err
        console.log(err)
      }
    },
    ajaxGet (/* url */) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(20)
        }, 1000)
      })
    }
  }
}
</script>

<style lang="less">
.pullup {
  height: 300px;
}

.pullup-bswrapper {
  height: 100%;
  padding: 0 10px;
  border: 1px solid #ccc;
  overflow: hidden;
}

.pullup-list {
  padding: 0;
}

.pullup-list-item {
  padding: 10px 0;
  list-style: none;
  border-bottom: 1px solid #ccc;
}

.pullup-wrapper {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>