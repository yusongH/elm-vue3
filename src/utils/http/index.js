import axios from 'axios'

const service = axios.create({
  // baseURL: '',
  // 统一超时时间，如有某个接口需要设置不同超时时间，可在调用接口是传入超时时间来覆盖这个超时时间
  timeout: 30 * 1000,
  // 请求是否携带cookie
  withCredentials: true
})

// 请求拦截器
// service.interceptors.request.use(config => {

// }, err => {

// })

// 响应拦截器
// service.interceptors.response.use(
//   res => {
//     console.log('==', res)
//   },
//   err => {
//     console.log('==', err)
//   }
// )

export default service
