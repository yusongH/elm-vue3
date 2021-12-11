import request from 'utils/http'

/**
 * 获取food页面分类
 */

export const getFoodCategory = (latitude, longitude) => {
  return request({
    url: '/shopping/v2/restaurant/category',
    method: 'get',
    params: {
      latitude,
      longitude
    }
  })
}
