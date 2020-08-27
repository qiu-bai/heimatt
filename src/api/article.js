import myhttp from '../utils/request.js'
export function apiGetArticle (channelid) {
  return myhttp({
    url: '/app/v1_1/articles',
    needToken: true,
    params: {
      channel_id: channelid,
      timestamp: Date.now(),
      with_top: 0
    }
  })
}
