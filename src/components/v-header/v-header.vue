<template>
  <div class="view-header"
       v-if="hideHeader">
    <x-header id="header"
              @on-click-back="clickBack"
              :left-options="showBack"
              style="width:100%;height:44px;position:absolute;left:0;top:0;z-index:9999;background-color:#fff;"
              class="header vux-1px-b"
              :title="headerTitle">
    </x-header>
  </div>

</template>
<script>
import { XHeader } from 'vux'
import { mapMutations } from 'vuex'
export default {
  components: { XHeader },
  computed: {
    headerTitle () {
      if (this.headerTitleChange) {
        return this.headerTitleChange
      } else {
        const currentRoute = this.$route.meta
        const defaultTitle = 'E校园'
        return currentRoute ? currentRoute.title : defaultTitle
      }
    },

    hideHeader () {
      return (
        this.$route.path !== '/schoolPayment'

      )
    },

    showBack () {
      if (this.$route.path === '/schoolSelect') {
        return { showBack: false }
      } else {
        return { backText: '', preventGoBack: true }
      }
    }
  },
  methods: {
    ...mapMutations({
      'setHeaderTitle': 'SET_HEADER_TITLE',
      'setDealRecordBtn': 'SET_DEAL_RECORD_BTN',
      'setRefreshBtn': 'SET_REFRESH_BTN',
      'setSchoolRecordPopup': 'SET_SCHOOL_RECORD_POPUP'
    }),
    clickChargeRecord () {
      this.$router.push('/rechargeRecord')
    },
    clickBack () {
      this.setHeaderTitle('')
      this.$router ? this.$router.back() : window.history.back()
    },
    clickSchoolCancel () {
      this.$router ? this.$router.back() : window.history.back()
    },
    clickPaymentRecord () {
      this.$router.push('/paymentRecord')
    },
    goCardPackage () {
      this.$router.push('/cardPackage')
    },
    goDealRecord () {
      this.$router.push('/dealRecord')
    },
    clickRefreshBtn () {
      if (this.$route.name === 'cardPackage') {
        this.setRefreshBtn(true)
      }
    }

  }
}
</script>
<style lang="less">
@import "~styles/varibles.less";
.view-header {
  .left-color {
    display: flex;
    align-items: center;
    color: @fontcolor;
    img {
      width: 22px;
      height: 22px;
      margin-right: 6px;
    }
  }
  .showSchoolRecord {
    img {
      width: 20px;
      height: 20px;
    }
  }
  .right-color {
    color: @fontcolor;
  }
  .title-color {
    color: @fontcolor;
  }
  #header {
    z-index: 499 !important;
    .vux-header-title {
      color: #222;
    }
  }
  .vux-header .vux-header-left,
  .vux-header .vux-header-right {
    color: #222;
  }
}
</style>
