export default {
  methods: {
    // 匹配路由地址
    matchRouteName(name) {
      return this.$route.name === name
    }
  }
}
