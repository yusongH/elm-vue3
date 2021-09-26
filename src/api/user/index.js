import request from 'utils/http'

/**
 * 获取图片验证码
 */

export const getCaptchas = () => {
  return request({
    url: '/v1/captchas',
    method: 'post'
  })
}

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => {
  return request.post({
    url: '/v2/login',
    data: {
      username,
      password,
      captcha_code
    }
  })
}
