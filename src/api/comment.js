// 封装所有的评论的网络请求
import myhttp from '../utils/request'
// 封装一个方法:得到文章的评论数据
export function apiGetComment ({ artid, offset, limit }) {
  return myhttp({
    url: 'app/v1_0/comments',
    method: 'get',
    params: {
      type: 'a',
      source: artid,
      offset: offset,
      limit: limit
    },
    needToken: false
  })
}
// 封装方法:提交评论数据服务器
export function apiAddComment ({ artid, content }) {
  return myhttp({
    url: '/app/v1_0/comments',
    method: 'post',
    data: {
      target: artid,
      content: content
    },
    needToken: true
  })
}
export function apiGetCommentReply ({ commid, offset, limit }) {
  return myhttp({
    url: 'app/v1_0/comments',
    method: 'get',
    params: {
      type: 'c',
      source: commid,
      offset: offset,
      limit: limit
    },
    needToken: false
  })
}
export function apiAddCommentReply ({ commid, content, artid }) {
  return myhttp({
    url: 'app/v1_0/comments',
    method: 'post',
    data: {
      target: commid,
      content: content,
      art_id: artid
    },
    needToken: true
  })
}
