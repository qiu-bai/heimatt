import Vue from 'vue'
import VueRouter from 'vue-router'
import uservant from '../views/uservant/vant.vue'
import login from '../views/login/login.vue'
import Index from '../views/home/index.vue'
import index from '../views/home/index/index.vue'
import search from '../views/home/search/search.vue'
import video from '../views/home/video/video.vue'
import my from '../views/home/my/my.vue'
import results from '../views/home/search/com/results.vue'
import detail from '@/views/detail/detail.vue'
import info from '@/views/info/info.vue'
import photoupload from '@/views/info/photoupload/photoupload.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/uservant',
    component: uservant
  },
  {
    path: '/',
    redirect: '/login' // 重定向
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/checklogin',
    component: login
  },
  {
    path: '/index',
    component: Index,
    redirect: '/index',
    children: [
      { path: '/index', component: index },
      { path: '/search', component: search },
      { path: '/video', component: video },
      { path: '/my', component: my }
    ]
  },
  {
    path: '/results/:key',
    component: results
  },
  {
    path: '/detail/:artid',
    component: detail
  },
  {
    path: '/info',
    component: info
  },
  {
    path: '/photoupload',
    component: photoupload
  }
]

const router = new VueRouter({
  routes
})

export default router
