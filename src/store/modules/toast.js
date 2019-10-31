export default {
  namespaced: true,
  state: {
    config: {
      show: false,
      position: 'middle',
      text: '123...'
    }
  },
  mutations: {
    updateConfig (state, payload) {
      const { show, text } = payload
      console.log(show)
      state.config.show = show
      state.config.text = text
    }
  }
}
