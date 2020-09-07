// 导入vue
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './style/index.css'
// 导入时间处理的过滤器
import './filter/myfilter.js'
// 导入已经封装好的插件
import pluginObj from '@/utils/myplugin.js'
// 使用插件
Vue.use(pluginObj)
Vue.use(Vant)

Vue.config.productionTip = false

// 1.0缩进使用两个空格
// 2.0字符串使用单引号
// 3.0句末不能使用分号结束
// 4.0行首不要以(,[(解决方案在括号前加分号)
// 5.0关键字后面必须加空格
// 6.0函数名后面必须加空格
// 7.0不要有冗余的变量
// 8.0使用===代替==
// 9.0使用浏览器全局变量时加上window前缀
// 10.0注释的双斜杠后面必须加一个空格
// 11.0行末千万不要写空格
// 12.0每个文件结束之后必须添加一个新的换行
// 13.0空行不能同时存在多个
// 14.0使用let声明的变量必须要修改
// 封装全局的方法:用来验证登录的全局的方法
// Vue.prototype.$login = function () {
//   // 获取token
//   var token = getLocal('token')
//   // 判断
//   if (!token || !token.token) {
//     Toast.fail('还未登录')
//     router.push('/login')
//     // 返回false,表示未登录
//     return false
//   }
//   // 返回 true,表示已经登录
//   return true
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
