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
// 封装方法：关注用户
export function apiFollow (autid) {
  return myhttp({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    needToken: true,
    data: {
      target: autid
    }
  })
}

// 封装方法：取关用户
export function apiUnFollow (autid) {
  return myhttp({
    url: `/app/v1_0/user/followings/${autid}`,
    method: 'DELETE',
    needToken: true
  })
}
// 得到用户的信息
export function apiGetUser () {
  return myhttp({
    url: '/app/v1_0/user',
    method: 'get',
    needToken: true
  })
}
// 封装方法：得到用户的资料
export function apiGetProfile () {
  return myhttp({
    url: '/app/v1_0/user/profile',
    method: 'get',
    needToken: true
  })
}
// 更改用户所有资料
export function apiGetUserProfile ({ name, gender, birthday, intro }) {
  return myhttp({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    needToken: true,
    data: {
      name: name,
      gender: gender,
      birthday: birthday,
      intro: intro
    }
  })
}
// 封装: 修改用户头像
export function apiUpdataImg (photo) {
  // 添加数据
  var fd = new FormData()
  fd.append('photo', photo)
  return myhttp({
    url: 'app/v1_0/user/photo',
    method: 'PATCH',
    data: fd,
    needToken: true
  })
}
export { apiLogin }
