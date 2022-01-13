import request from 'utils/http'

/**
 * 获取首页地址信息
 */
export const getAddress = geohash => {
  return request({
    url: '/v2/pois/' + geohash,
    method: 'get'
  })
}

/**
 * 获取首页食品分类
 */
export const getFoodTypes = geohash => {
  return request({
    url: '/v2/index_entry',
    method: 'get',
    params: {
      geohash,
      group_type: '1',
      'flags[]': 'F'
    }
  })
}
