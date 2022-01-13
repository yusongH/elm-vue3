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

/**
 * 获取food页面的配送方式
 */

export const getFoodDelivery = (latitude, longitude) => {
  return request({
    url: '/shopping/v1/restaurants/delivery_modes',
    method: 'get',
    params: {
      latitude,
      longitude,
      kw: ''
    }
  })
}

/**
 * 获取food页面的商家属性活动列表
 */

export const getFoodActivity = (latitude, longitude) => {
  return request({
    url: '/shopping/v1/restaurants/activity_attributes',
    method: 'get',
    params: {
      latitude,
      longitude,
      kw: ''
    }
  })
}
