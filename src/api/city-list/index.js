import request from 'utils/http'

/**
 * 获取首页默认地址
 */
export const getCityGuess = () => {
  return request({
    url: '/v1/cities',
    method: 'get',
    params: {
      type: 'guess'
    }
  })
}

/**
 * 获取热门城市
 */
export const getHotCity = () => {
  return request({
    url: '/v1/cities',
    method: 'get',
    params: {
      type: 'hot'
    }
  })
}

/**
 * 获取城市列表
 */
export const getGroupCity = () => {
  return request({
    url: '/v1/cities',
    method: 'get',
    params: {
      type: 'group'
    }
  })
}
