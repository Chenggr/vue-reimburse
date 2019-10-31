export default {
  namespaced: true,
  state: {
    config: {
      show: false,
      position: 'absolute',
      text: '加载中...'
    }
  },
  mutations: {
    updateConfig (state, payload) {
      const { show } = payload
      state.config.show = show
    }
  }
}
