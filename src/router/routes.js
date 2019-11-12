// 异步加载路由

const boot = resolve => require(['../views/boot/boot'], resolve)
const approval = resolve => require(['../views/approval/approval'], resolve)
const reimApply = resolve => require(['../views/reimApply/reimApply'], resolve)
const reimApproval = resolve =>
  require(['../views/reimApproval/reimApproval'], resolve)
const tripApply = resolve => require(['../views/tripApply/tripApply'], resolve)
const tripApproval = resolve =>
  require(['../views/tripApproval/tripApproval'], resolve)

const detail = resolve => require(['../views/detail/detail'], resolve)
const detail2 = resolve => require(['../views/detail/detail2'], resolve)
const detail3 = resolve => require(['../views/detail/detail3'], resolve)
const uploader = resolve => require(['../views/test/uploader'], resolve)

const demo = resolve => require(['../views/test/demo'], resolve)

const projectApply = resolve =>
  require(['../views/projectApply/projectApply'], resolve)
const applicant = resolve => require(['../views/applicant/applicant'], resolve)
const approver = resolve => require(['../views/approver/approver'], resolve)

export default [
  {
    path: '/',
    name: 'boot',
    component: boot,
    meta: {
      title: '报销'
    }
  },
  {
    path: '/projectApply',
    name: 'projectApply',
    component: projectApply,
    meta: {
      title: '立项申请'
    }
  },
  {
    path: '/applicant',
    name: 'applicant',
    component: applicant,
    meta: {
      title: '申请人'
    }
  },
  {
    path: '/approver',
    name: 'approver',
    component: approver,
    meta: {
      title: '审批人'
    }
  },
  {
    path: '/reimApply',
    name: 'reimApply',
    component: reimApply,
    meta: {
      title: '报销申请'
    }
  },
  {
    path: '/reimApproval',
    name: 'reimApproval',
    component: reimApproval,
    meta: {
      title: '报销审批'
    }
  },
  {
    path: '/tripApply',
    name: 'tripApply',
    component: tripApply,
    meta: {
      title: '出差申请'
    }
  },
  {
    path: '/tripApproval',
    name: 'tripApproval',
    component: tripApproval,
    meta: {
      title: '出差审批'
    }
  },
  {
    path: '/uploader',
    name: 'uploader',
    component: uploader,
    meta: {
      title: 'uploader'
    }
  },
  {
    path: '/approval',
    name: 'approval',
    component: approval,
    meta: {
      title: '审批流程'
    }
  },
  {
    path: '/demo',
    name: 'demo',
    component: demo,
    meta: {
      title: 'demo'
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail,
    meta: {
      title: '新建流程'
    }
  },
  {
    path: '/detail2',
    name: 'detail2',
    component: detail2,
    meta: {
      title: '新建流程'
    }
  },
  {
    path: '/detail3',
    name: 'detail3',
    component: detail3,
    meta: {
      title: '新建流程'
    }
  }
]
