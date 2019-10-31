export default {
  namespaced: true,
  state: {
    show: false,
    navData: [
      { name: 'demo', title: 'demo' },
      { name: 'tech', title: '技术' },
      { name: 'jobs', title: '酷工作' },
      { name: 'apple', title: 'APPLE' },
      { name: 'nodes', title: '节点热力' }
    ]
  },
  mutations: {
    updateShow (state, payload) {
      console.log(state, payload)
      state.show = payload
    }
  }
}
