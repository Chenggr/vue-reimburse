<template>
  <div class="my-expend">
    <div class="title">
      差旅支出单
    </div>
    <!-- 市场非市场支出单 -->
    <div class="content"
         v-if="type==='SERVE'"
         v-for="(item,index) of list"
         :key="index">
      <div class="main-info">
        <div class="left">
          <div class="sub-title">所在部门</div>
          <div class="info">{{item.apart}}</div>
        </div>
        <div class="center">
          <div class="sub-title">姓名</div>
          <div class="info">{{item.name}}</div>
        </div>
        <div class="right">
          <div class="sub-title">员工号</div>
          <div class="info">{{item.staffId}}</div>
        </div>
      </div>
      <div class="line"></div>
      <div class="titles">
        <div class="expend-title">费用类型</div>
        <div class="expend-title">金额</div>
        <div class="expend-title">发票张数</div>
        <div class="expend-title">费用归属</div>
      </div>
      <div class="expend-content">
        <div class="expend-main"
             v-for="(pay,index) of item.payDetail"
             :key="index">
          <div class="cell-4-1  ">
            <span class="type">{{pay.type}}</span>
          </div>
          <div class="cell-4-1 money ">{{pay.money}}元</div>
          <div class="cell-4-1 count">{{pay.count}}</div>
          <div class="cell-4-1 affiliation">{{pay.affiliation}}</div>
        </div>
      </div>
      <div class="line-2"></div>
      <div class="total-box">
        <div class="total-left">合计</div>
        <div>{{item.totalMoney}}元</div>
        <div>{{item.totalCount}}</div>
        <div></div>
      </div>
      <div>

      </div>
    </div>
    <!-- 市场非市场支出单 -->
    <!-- 差旅支出单 -->
    <div class="content"
         v-if="type==='TRIP'"
         v-for="(item,index) of list"
         :key="index">
      <div class="main-info">
        <div class="left">
          <div class="sub-title">所在部门</div>
          <div class="info">{{item.apart}}</div>
        </div>
        <div class="center">
          <div class="sub-title">姓名</div>
          <div class="info">{{item.name}}</div>
        </div>
        <div class="right">
          <div class="sub-title">员工号</div>
          <div class="info">{{item.staffId}}</div>
        </div>
      </div>
      <div class="line"></div>
      <div class="titles">
        <div class="expend-title">费用类型</div>
        <div class="expend-title">金额</div>
        <div class="expend-title">发票张数</div>
        <div class="expend-title">天数</div>
      </div>
      <div class="expend-content">
        <div class="expend-main">
          <div class="cell-4-1  ">
            <span class="type">交通费</span>
          </div>
          <div class="cell-4-1 money ">193.11元</div>
          <div class="cell-4-1 count">1张</div>
          <div class="cell-4-1 day"></div>
        </div>
        <div class="expend-main mini-size">
          <div class="cell-4-1  ">
            <span class="">10月14日</span>
          </div>
          <div class="cell-4-1 money ">95.00元</div>
          <div class="cell-4-1 count">火车</div>
          <div class="cell-4-1 day"></div>
        </div>
        <div class="expend-main">
          <div class="cell-4-1  ">
            <span class="type">住宿费</span>
          </div>
          <div class="cell-4-1 money ">1392.00元</div>
          <div class="cell-4-1 count">1张</div>
          <div class="cell-4-1 day">4天</div>
        </div>
        <div class="expend-main ">
          <div class="cell-4-1  ">
            <span class="type">出差补贴</span>
          </div>
          <div class="cell-4-1 money ">720.00元</div>
          <div class="cell-4-1 count">4张</div>
          <div class="cell-4-1 day">4天</div>
        </div>
        <div class="expend-main mini-size ">
          <div class="cell-4-1  ">
            <span class="">伙食补助</span>
          </div>
          <div class="cell-4-1 money ">480.00元</div>
          <div class="cell-4-1 count">2张</div>
          <div class="cell-4-1 day">4天</div>
        </div>
        <div class="expend-main mini-size">
          <div class="cell-4-1  ">
            <span class="">交通补助</span>
          </div>
          <div class="cell-4-1 money ">240.00元</div>
          <div class="cell-4-1 count">2张</div>
          <div class="cell-4-1 day">4天</div>
        </div>
        <div class="expend-main ">
          <div class="cell-4-1  ">
            <span class="type">其他费用</span>
          </div>
          <div class="cell-4-1 money ">485.00元</div>
          <div class="cell-4-1 count">1张</div>
          <div class="cell-4-1 day">4天</div>
        </div>
      </div>
      <div class="line-2"></div>
      <div class="total-box">
        <div class="total-left">合计</div>
        <div>{{item.totalMoney}}元</div>
        <div>{{item.totalCount}}</div>
        <div></div>
      </div>
      <br>
      <div>img</div>
    </div>
    <!-- 差旅支出单end -->
  </div>
</template>
<script>
export default {
  name: 'MyExpend',
  props: {
    list: {
      type: Array,
      default: []
    },
    type: {
      type: String

    }
  },
  data () {
    return {
      totalCount: 0
    }
  }

}
</script>

<style lang="less">
.view-applicant .my-popup.van-popup {
  padding-top: 0;
}
.my-expend {
  .title {
    background: #fff;
    position: sticky;
    z-index: 99;
    top: 0;
    position: sticky;
    text-align: center;
    font-size: 18px;
    padding: 10px 0;
  }
  .content {
    overflow-y: scroll;
    margin: 16px 0;
    font-size: 14px;
    .main-info {
      display: flex;
      justify-content: space-between;
      .left,
      .center,
      .right {
        text-align: center;

        .info {
          margin-top: 8px;
        }
      }
    }
    .line {
      height: 2px;
      border-top: 2px solid #e2e4ea;
      margin: 14px 0;
    }
    .line-2 {
      height: 2px;
      border-top: 2px solid #e2e4ea;
      margin: 10px 0;
    }
    .titles {
      display: flex;
      font-size: 14px;
      .expend-title {
        width: 25%;
        text-align: center;
      }
    }
    .expend-content {
      .mini-size {
        font-size: 12px;
      }
      .expend-main {
        margin-top: 16px;
        display: flex;
        align-items: center;
        .cell-4-1 {
          width: 25%;
          text-align: center;
        }
        .type {
          border: 1px solid #999;
          border-radius: 4px;
          padding: 2px 8px;
        }
      }
    }
    .total-box {
      // margin-top: 8px;
      display: flex;
      font-size: 14px;
      .total-left {
        // text-align: left;
      }
      div {
        width: 25%;
        text-align: center;
      }
    }
  }
}
</style>
