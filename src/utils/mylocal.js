// 关于会员所要的设置
// 保存token
function saveLocal (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
// 获取token
function getLocal (key) {
  return JSON.parse(window.localStorage.getItem(key))
}
// 删除token
function removeLocal (key) {
  window.localStorage.removeItem(key)
}
export { saveLocal, getLocal, removeLocal }
