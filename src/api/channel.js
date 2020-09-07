import myhttp from '../utils/request.js'
// 封装一个得到频道的方法
export function apiGetChannelsList () {
  return myhttp({
    url: '/app/v1_0/user/channels',
    // 携带token
    needToken: true
  })
}
// 封装一个方法的得到全部频道的方法
export function apiGetAllChannel () {
  return myhttp({
    url: '/app/v1_0/channels',
    // 携带token
    needToken: true
  })
}
// 封装一个方法:批量修改频道数据的方法
export function apiUpdataChannel (myChannel) {
  return myhttp({
    url: '/app/v1_0/user/channels',
    method: 'PUT', // 当做post看
    // 携带token
    needToken: true,
    data: {
      channels: myChannel
    }
  })
}
