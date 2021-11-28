const state = () => {
  return {
    geohash: '', // 当前的geohash
    address: '' // 当前的地址信息
  }
}

const mutations = {
  saveGeohash(state, geohash) {
    state.geohash = geohash
  },
  saveAddress(state, address) {
    state.address = address
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations
}
