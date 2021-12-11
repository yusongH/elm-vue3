import { SAVE_GEOHASH, SAVE_ADDRESS } from '@/store/mutation-types.js'

const state = () => {
  return {
    geohash: '', // 当前的geohash
    address: '', // 当前的地址信息
    latitude: '', // 经度
    longitude: '' // 纬度
  }
}

const mutations = {
  /**
   * 保存geohash
   * @param {*} state
   */
  [SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash
  },
  /**
   * 保存位置信息，包括经度、纬度
   * @param {*} state
   * @param {*} address 位置信息
   */
  [SAVE_ADDRESS](state, address) {
    state.address = address
    state.latitude = address.latitude
    state.longitude = address.longitude
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations
}
