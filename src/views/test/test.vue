<template>
  <div class="view-mand-test">
    <div class="md-example-child md-example-child-button md-example-child-button-0">
      <md-button type="default"
                 @click="goDemo">goDemo</md-button>
      <md-button type="default"
                 inactive>Default Inactive</md-button>
      <md-button type="primary">Primary</md-button>
      <md-button type="primary"
                 inactive>Primary Inactive</md-button>
      <md-button type="warning">Warning</md-button>
      <md-button type="warning"
                 inactive>Warning Inactive</md-button>
      <md-button type="disabled">Disabled</md-button>
    </div>
    <div>
      <md-field>
        <md-input-item title="普通文本"
                       placeholder="普通文本"
                       :maxlength="5">

        </md-input-item>
      </md-field>
    </div>
    <div class="font-test">123</div>
    <div>
      <md-button @click="showPopUp">标题居左</md-button>
      <md-popup class="inner-popup"
                v-model="isPopupShow"
                position="bottom">
        <md-popup-title-bar title="标题"
                            :largeRadius="true"
                            :nolyClose="true"
                            describe="title & description align left"
                            title-align="left"
                            @cancel="hidePopUp"></md-popup-title-bar>
        <div class="md-example-popup">
          <md-scroll-view :scrolling-x="false">
            <p>scroll View <br>scroll View <br>scroll View <br>scroll View <br>scroll View <br>scroll View <br></p>
          </md-scroll-view>
        </div>
      </md-popup>
    </div>
  </div>
</template>

<script>
import { Button, InputItem, Popup, PopupTitleBar, ScrollView } from 'mand-mobile'

export default {
  name: 'button-demo',
  components: {
    [Button.name]: Button,
    InputItem,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
    [ScrollView.name]: ScrollView
  },
  data () {
    return {
      isPopupShow: false
    }
  },
  methods: {
    goDemo () {
      this.$router.push('/demo')
    },
    showPopUp () {
      this.isPopupShow = true
    },
    hidePopUp () {
      this.isPopupShow = false
    }
  }
}
</script>
<style lang="less">
.view-mand-test {
  .font-test {
    color: red;
    font-size: 16px;
  }
}
</style>
