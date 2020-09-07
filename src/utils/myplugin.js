import { Toast } from 'vant'
import router from '../router/index.js'
import { getLocal } from './mylocal.js'
// 定义插件对象
var pluginObj = {}
// 添加插件的固有方法
pluginObj.install = function (Vue) {
  Vue.prototype.$login = function () {
    // 获取登录时用的token
    const token = getLocal('token')
    // 判断登录
    if (!token || !token.token) {
      Toast.fail('未登录')
      // 跳转到登录页
      router.push('/checklogin')
      // 返回false,表明未登录
      return false
    } else {
      // 返回true,表明已经登录
      return true
    }
  }
}
export default pluginObj
