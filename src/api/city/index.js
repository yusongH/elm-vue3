import request from 'utils/http'

/**
 * 获取当前所在的城市
 * @param {string} cityId 城市id
 */
export const getCurrentCity = cityId => {
  return request({
    url: '/v1/cities/' + cityId,
    method: 'get'
  })
}

/**
 * 获取搜索地址
 * @param {string} cityId 城市id
 * @param {string} searchKey 搜索关键字
 */
export const getSearchPlace = (cityId, searchKey) => {
  return request({
    url: '/v1/pois',
    method: 'get',
    params: {
      type: 'search',
      city_id: cityId,
      keyword: searchKey
    }
  })
}
