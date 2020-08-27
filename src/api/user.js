// 管理所有用户相关的网络请求
import myhttp from '../utils/request.js'
function apiLogin ({ mobile, code }) {
  return myhttp({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data: {
      mobile: mobile,
      code: code
    },
    needToken: false
  })
}
export function apiGetUserInfo () {
  return myhttp({
    url: '/app/v1_0/user',
    method: 'get',
    needToken: true
  })
}
export { apiLogin }
