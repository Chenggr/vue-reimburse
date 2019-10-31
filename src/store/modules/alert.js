export default {
  namespaced: true,
  state: {
    config: {
      show: false,
      title: '警告',
      content: '数据请求未响应，请检查网络'
    }
  },
  mutations: {
    updateConfig (state, payload) {
      const { show, title, content } = payload
      state.config.show = show
      state.config.title = title
      state.config.content = content
    }
  }
}
