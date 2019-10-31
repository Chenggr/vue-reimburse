const state = {
  mobilePhone: '',
  userCid: '',
  direction: 'forward',
  showTucao: false,
  showTitle: '',
  titleRight: '',
  batchGroup: false,
  dealInfoTitleRight: false,
  titleRightClass: false,
  showDeal: false,
  dealTime: '',
  dealType: '',
  // one-card
  dealDetailList: [],
  dealRecordBtn: false,
  refreshBtn: false,
  packageEdit: [],
  paymentDetailList: [],
  headerTitleChange: '',
  popupLogin: false,
  popupSuccess: false,
  popupRecharge: false,
  popupRechargeInfo: {},
  popupSchoolSelect: false,
  currentSchool: '请选择学校',
  authSchool: '请选择所在学校',
  scrollPosition: '',
  parmsData: {},
  // 首页数据
  homeData: {},
  tabbarItem: 'home',
  loginAlert: false,
  schoolRecordPopup: false, // 校园缴费记录
  schoolId: '', // 学校Id
  schoolIdIndex: '', // 学校Id index
  roleId: '',
  roleList: {
    roleList: [{ roleName: '学生' }, { roleName: '教师' }]
  },
  isClickSchool: false,
  certList: [],
  cardInfo: {},
  orderInfo: {},
  orderDetailInfo: {},
  orderNo: '',
  goOrder: false,
  selectedAddress: {},
  moreParms: {}, // shop 点击’更多‘
  isRefresh: false, // 关闭支付控件刷新
  amuseInfo: {},
  isPulldown: false, // 是否使用了下拉刷新
  edou: '',
  indexSelectId: '' // oneCard panel slect
}

export default state
