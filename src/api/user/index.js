import request from 'utils/http'

/**
 * 获取图片验证码
 */

export const getCaptchas = () => {
  return request({
    url: '/v1/captchas',
    method: 'post',
    isShowLoading: false
  })
}

/**
 * 账号密码登录
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} captchaCode 验证码
 */
export const accountLogin = (username, password, captchaCode) => {
  return request({
    url: '/v2/login',
    method: 'post',
    data: {
      username,
      password,
      captcha_code: captchaCode
    }
  })
}
