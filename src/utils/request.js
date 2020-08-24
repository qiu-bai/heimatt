import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
// 关于会员所要的设置
// 保存token
function saveLocal (key, value) {
  window.localStorage.setItem(key, value)
}
// 获取token
function getLocal (key) {
  return window.localStorage.getItem(key)
}
// 删除token
function removeLocal (key) {
  window.localStorage.removeItem(key)
}
export { saveLocal, getLocal, removeLocal }

export default instance
