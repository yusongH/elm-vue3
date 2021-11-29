import { SAVE_USER_INFO } from '@/store/mutation-types.js'

const state = () => {
  return {
    userInfo: {} // 用户信息
  }
}

const mutations = {
  /**
   * 保存用户信息
   * @param {*} state
   * @param {*} userInfo 用户信息
   */
  [SAVE_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations
}
