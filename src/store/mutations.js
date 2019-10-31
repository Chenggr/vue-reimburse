import * as types from './mutation-types'

const matutations = {
  [types.SET_USER_CID] (state, string) {
    state.userCid = string
  },
  [types.SET_MOBILE_PHONE] (state, string) {
    state.mobilePhone = string
  },
  [types.SET_INDEX_SELECT_ID] (state, string) {
    state.indexSelectId = string
  },
  [types.SET_AUTH_SCHOOL] (state, string) {
    state.authSchool = string
  },
  [types.SET_EDOU] (state, string) {
    state.edou = string
  },
  [types.SET_MORE_PARMS] (state, obj) {
    state.moreParms = obj
  },
  [types.SET_SELECTED_ADDRESS] (state, obj) {
    state.selectedAddress = obj
  },
  [types.SET_AMUSE_INFO] (state, obj) {
    state.amuseInfo = obj
  },
  [types.SET_CARD_INFO] (state, obj) {
    state.cardInfo = obj
  },
  [types.SET_ORDER_INFO] (state, obj) {
    state.orderInfo = obj
  },
  [types.SET_ORDER_NO] (state, string) {
    state.orderNo = string
  },
  [types.SET_ORDER_DETAIL_INFO] (state, obj) {
    state.orderDetailInfo = obj
  },
  [types.SET_IS_PULLDOWN] (state, flag) {
    state.isPulldown = flag
  },
  [types.SET_GO_ORDER] (state, flag) {
    state.goOrder = flag
  },
  [types.SET_IS_REFRESH] (state, flag) {
    state.isRefresh = flag
  },
  [types.SET_IS_CLICK_SCHOOL] (state, flag) {
    state.isClickSchool = flag
  },
  [types.SET_CERT_LIST] (state, obj) {
    state.certList = obj
  },
  [types.SET_ROLE_LIST] (state, obj) {
    state.roleList = obj
  },
  [types.SET_ROLE_ID] (state, string) {
    state.roleId = string
  },
  [types.SET_SCHOOL_ID] (state, string) {
    state.schoolId = string
  },
  [types.SET_SCHOOL_ID_INDEX] (state, string) {
    state.schoolId = string
  },
  [types.SET_TABBAR_ITEM] (state, string) {
    state.tabbarItem = string
  },
  [types.SET_LOGIN_ALERT] (state, flag) {
    state.loginAlert = flag
  },
  // 首页数据
  [types.SET_HOME_DATA] (state, obj) {
    state.homeData = obj
  },
  // 校园缴费记录
  [types.SET_SCHOOL_RECORD_POPUP] (state, flag) {
    state.schoolRecordPopup = flag
  },
  // one-card
  [types.SET_PARMS_DATA] (state, obj) {
    state.parmsData = obj
  },
  [types.SET_SCROLL_POSITION] (state, string) {
    state.scrollPosition = string
  },
  [types.SET_DEAL_DETAIL_LIST] (state, list) {
    state.dealDetailList = list
  },
  [types.SET_DEAL_RECORD_BTN] (state, flag) {
    state.dealRecordBtn = flag
  },
  [types.SET_PACKAGE_EDIT] (state, list) {
    state.packageEdit = list
  },
  [types.SET_PAYMENT_DETAIL_LIST] (state, list) {
    state.paymentDetailList = list
  },
  [types.SET_HEADER_TITLE] (state, string) {
    state.headerTitleChange = string
  },
  [types.SET_POPUP_LOGIN] (state, flag) {
    state.popupLogin = flag
  },
  [types.SET_POPUP_SUCCESS] (state, flag) {
    state.popupSuccess = flag
  },
  [types.SET_POPUP_RECHARGE] (state, flag) {
    state.popupRecharge = flag
  },
  [types.SET_POPUP_RECHARGE_INFO] (state, obj) {
    state.popupRechargeInfo = obj
  },
  [types.SET_POPUP_SCHOOL_SELECT] (state, flag) {
    state.popupSchoolSelect = flag
  },
  [types.SET_CURRENT_SCHOOL] (state, school) {
    state.currentSchool = school
  },
  // one-card
  [types.SET_SHOW_TUCAO] (state, flag) {
    state.showTucao = flag
  },
  [types.SET_TITLE] (state, flag) {
    state.showTitle = flag
  },
  [types.SET_TITLE_RIGHT] (state, flag) {
    state.titleRight = flag
  },
  [types.SET_BATCH_GROUP] (state, flag) {
    state.batchGroup = flag
  },
  [types.SET_DEALINFO_TITLERIGHT] (state, flag) {
    state.dealInfoTitleRight = flag
  },
  [types.SET_TITLERIGHT_CLASS] (state, flag) {
    state.titleRightClass = flag
  },
  [types.SET_SHOW_DEAL] (state, flag) {
    state.showDeal = flag
  },
  [types.SET_DEAL_TIME] (state, flag) {
    state.dealTime = flag
  },
  [types.SET_DEAL_TYPE] (state, flag) {
    state.dealType = flag
  },
  [types.SET_REFRESH_BTN] (state, flag) {
    state.refreshBtn = flag
  },

  updateDirection (state, payload) {
    const { direction } = payload
    state.direction = direction
  }
}

export default matutations
