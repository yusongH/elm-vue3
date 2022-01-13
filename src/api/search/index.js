import request from 'utils/http'

/**
 * 获取搜素页搜索结果
 * @param {*} geohash geohash
 * @param {*} keyword 搜索关键词
 */
export const getSearchRestaurant = (geohash, keyword) => {
  return request({
    url: '/v4/restaurants',
    method: 'get',
    params: {
      'extras[]': 'restaurant_activity',
      geohash,
      keyword,
      type: 'search'
    }
  })
}
