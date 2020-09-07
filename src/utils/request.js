import axios from 'axios'
// 导入操作token的方法
import { getLocal, saveLocal } from './mylocal.js'
// 导操作jsonbigint
import jsonbig from 'json-bigint'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: {
    function (data) {
      try {
        // 就是服务器返回的json格式的字符串
        return jsonbig.parse(data)
      } catch {
        return JSON.parse(data)
      }
    }
  }
})
// 创建一个新的axios实例来更新token
// 不能用上面那个实例,因为那个有带老的token,会有影响
const instanceToken = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const needToken = config.needToken
    if (needToken) {
      const token = getLocal('token')
      if (token && token.token) {
        config.headers.Authorization = `Bearer ${token.token}`
      }
    }
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
  async function (error) {
    // 对响应错误做点什么
    console.log('------------------响应拦截器--------------')
    // console.log(error)
    // 判断错误的状态码是401
    if (error.response.status === 401) {
      // 更新token:将refresh_token 提交到服务器得到新的token
      // 得到refresh_token
      const refreshToken = getLocal('token').refresh_token
      // 提交到服务器
      const resToken = await instanceToken({
        url: '/app/v1_0/authorizations',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      // 创建一个新的token对象
      const tokenObj = {
        token: resToken.data.data.token,
        refresh_token: refreshToken
      }
      // 将新的token保存到本地
      saveLocal('token', tokenObj)
      // 继续发送之前的请求error.config:baseUrl...
      return await instance(error.config)
    }
    console.log('------------------响应拦截器--------------')
    return Promise.reject(error)
  }
)
export default instance
