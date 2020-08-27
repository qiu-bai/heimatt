import myhttp from '../utils/request.js'
export function apiGetChannelsList () {
  return myhttp({
    url: '/app/v1_0/user/channels',
    // 携带token
    needToken: true
  })
}
