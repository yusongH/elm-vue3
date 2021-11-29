import request from 'utils/http'

/**
 * 获取商店列表
 * @param {string} latitude 经度
 * @param {string} longitude 纬度
 * @param {number} offset 加载的位置
 * @param {string} restaurant_category_id
 * @param {string} restaurant_category_ids
 * @param {string} order_by
 * @param {string} delivery_mode
 * @param {array} support_ids
 * @returns 商店列表
 */
export const getShopList = (
  latitude,
  longitude,
  offset,
  restaurant_category_id = '',
  restaurant_category_ids = '',
  order_by = '',
  delivery_mode = '',
  support_ids = []
) => {
  let supportStr = ''
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id
    }
  })
  const params = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode + supportStr
  }
  return request({
    url: '/shopping/restaurants',
    method: 'get',
    params
  })
}
