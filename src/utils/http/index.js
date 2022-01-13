import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import { SET_LOADING } from '@/store/mutation-types.js'

// 当前loading的显示状态
let loading = false
// 当前正在内的请求数量
let requestCount = 0

const service = axios.create({
  baseURL: import.meta.env.VITE_RESQUEST_BASEURL,
  // 统一超时时间，如有某个接口需要设置不同超时时间，可在调用接口是传入超时时间来覆盖这个超时时间
  timeout: 30 * 1000,
  // 请求是否携带cookie
  withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加token（接口未实现token，暂时不添加）
    // get请求添加时间戳
    if (config.method.toLowerCase === 'get') {
      config.params._t = new Date().getTime()
    }

    // 没有传默认显示loading
    if (config.isShowLoading || config.isShowLoading === undefined) {
      // 显示loading
      showLoading()
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (
      response?.config?.isShowLoading ||
      response?.config?.isShowLoading === undefined
    ) {
      // 关闭loading
      closeLoading()
    }

    // 200状态码
    if (response.status === 200) {
      // 统一错误提示
      if (response?.data?.status === 0) {
        Toast.fail(response.data.message)
      }
      return response.data
    }
  },
  err => {
    if (
      err?.config?.isShowLoading ||
      err?.config?.isShowLoading === undefined
    ) {
      // 关闭loading
      closeLoading()
    }

    // 超时提示
    if (err?.message.includes('timeout')) {
      Toast.fail('request timeout')
    }

    // 处理500等错误
    if (err?.response?.status === 500) {
      Toast.fail('server error')
    }

    return Promise.reject(err)
  }
)

/**
 * 显示loading
 */
function showLoading() {
  // 当前正在请求中的数量加一
  requestCount++

  // loading状态为隐藏，并且是第一个请求
  if (!loading && requestCount === 1) {
    // 显示loading
    store.commit(`loading/${SET_LOADING}`, true)
    loading = true
  }
}

/**
 * 关闭loading
 */
function closeLoading() {
  // 当前正在请求中的数量减一
  requestCount--

  // loading状态为展示，并且是最后一个请求
  if (loading && requestCount === 0) {
    // 隐藏loading
    store.commit(`loading/${SET_LOADING}`, false)
    loading = false
  }
}

export default service
