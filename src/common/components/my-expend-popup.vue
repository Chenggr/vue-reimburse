<template>
  <div class="view-my-expend-popup">

    <van-popup class="my-popup"
               :close-on-click-overlay="false"
               v-model="showPartnerPopup"
               round>
      <div class="popup-wrap">
        <div class="popup-title">
          <div class="left"
               @click="backParntnerPopup">
            <van-icon name="arrow-left" />
          </div>

          <div class="right"
               @click="savePartner">保存</div>
        </div>
        <div class="popup-content">

        </div>

        <div class="btn-add"
             @click="onAddPartner">
          <van-icon name="plus" />
        </div>
      </div>
    </van-popup>

  </div>
</template>
<script>
export default {
  name: 'MyExpendPopup'
}
</script>
<style lang="less">
</style>

