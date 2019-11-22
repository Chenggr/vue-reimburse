<template>
  <div class="view-boot">
    <div class="content">
      <div class="wrap"
           @click="goNext('projectApply')">
        <div class="icon"><img src="@/assets/img/Group-1.png"
               alt=""></div>
        <div class="title">立项申请</div>
      </div>
      <div class="wrap"
           @click="goNext('applicant')">
        <div class="icon"><img src="@/assets/img/Group-1.png"
               alt=""></div>
        <div class="title">申请人</div>
      </div>
      <div class="wrap"
           @click="goNext('approver')">
        <div class="icon"><img src="@/assets/img/Group-1.png"
               alt=""></div>
        <div class="title">审批人</div>
      </div>
      <!-- <div class="wrap"
           @click="goNext('tripApply')">
        <div class="icon"><img src="@/assets/img/Group-1.png"
               alt=""></div>
        <div class="title">出差申请</div>
      </div>
      <div class="wrap"
           @click="goNext('tripApproval')">
        <div class="icon"><img src="@/assets/img/Group-4.png"
               alt=""></div>
        <div class="title">出差审批</div>
      </div>
      <div class="wrap"
           @click="goNext('reimApply')">
        <div class="icon"><img src="@/assets/img/Group-3.png"
               alt=""></div>
        <div class="title">报销申请</div>
      </div>
      <div class="wrap"
           @click="goNext('reimApproval')">
        <div class="icon"><img src="@/assets/img/Group-2.png"
               alt=""></div>
        <div class="title">报销审批</div>
      </div> -->
    </div>
  </div>
</template>
<script>
import { Button } from 'vant'

export default {
  name: 'Boot',
  components: {
    VanButton: Button
  },
  methods: {
    goNext (val) {
      this.$router.push({ name: val })
    }
  }
}
</script>
<style lang="less">
.view-boot {
  position: fixed;
  height: 100%;
  background: #fff;

  .content {
    display: flex;
    flex-wrap: wrap;
  }
  .wrap {
    text-align: center;
    width: 25%;
    padding: 16px 0;
    .icon {
      img {
        height: 24px;
      }
    }
    .title {
      margin-top: 8px;
    }
  }
}
</style>