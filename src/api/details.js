import myhttp from '../utils/request.js'
// 封装一个得到文章详情的方法
export function apiartDetails (artid) {
  return myhttp({
    url: '/app/v1_0/articles/:article_id',
    // 携带token
    needToken: true,
    params: {
      article_id: artid
    }
  })
}
