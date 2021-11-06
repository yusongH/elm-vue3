const state = () => {
  return {
    userInfo: {}
  }
}

const mutations = {
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations
}
