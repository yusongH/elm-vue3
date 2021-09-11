import axios from 'axios'

const service = axios.create({
  // baseURL: '',
  timeout: 30 * 1000,
  // 请求是否携带cookie
  withCredentials: true
})

// 请求拦截器
// service.interceptors.request.use(config => {

// }, err => {

// })

// 响应拦截器
// service.interceptors.response.use(res => {

// }, err => {

// })

export default service
