import { SET_LOADING } from '@/store/mutation-types.js'

const state = () => {
  return {
    isShowLoading: false // 是否显示loading
  }
}

const mutations = {
  /**
   * 设置是否显示loading
   * @param {*} state
   * @param {*} isShowLoading 是否显示loading
   */
  [SET_LOADING](state, isShowLoading) {
    state.isShowLoading = isShowLoading
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations
}
