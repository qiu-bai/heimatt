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
export function apiDislike (artid) {
  return myhttp({
    url: '/app/v1_0/article/dislikes',
    method: 'post',
    needToken: true,
    data: {
      target: artid
    }
  })
}
export function apiReportArticle ({ artid, type }) {
  return myhttp({
    url: '/app/v1_0/article/reports',
    method: 'post',
    needToken: true,
    data: {
      target: artid,
      type: type,
      remark: ''
    }
  })
}
export function apiBlackAuthor (autid) {
  return myhttp({
    url: '/app/v1_0/user/blacklists',
    method: 'post',
    needToken: true,
    data: {
      target: autid
    }
  })
}
export function apiGetDetail (artid) {
  return myhttp({
    url: `/app/v1_0/articles/${artid}`,
    needToken: true
  })
}
export function apiLike (artid) {
  return myhttp({
    url: '/app/v1_0/article/likings',
    method: 'post',
    data: {
      target: artid
    },
    needToken: true
  })
}
export function apiDisLike (artid) {
  return myhttp({
    url: `/app/v1_0/article/likings/${artid}`,
    method: 'DELETE',
    needToken: true
  })
}
