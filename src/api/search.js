import myhttp from '../utils/request.js'
// 获取联想的数据
export function apiSuggestion (q) {
  return myhttp({
    url: '/app/v1_0/suggestion',
    needToken: true,
    params: {
      q: q
    }
  })
}
// 搜索结果数据
export function apiSearch ({ page, parpage, q }) {
  return myhttp({
    url: '/app/v1_0/search',
    needToken: true,
    params: {
      page: page,
      per_page: parpage,
      q: q
    }
  })
}
