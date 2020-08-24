import Vue from 'vue'
import VueRouter from 'vue-router'
import uservant from '../views/uservant/vant.vue'
import login from '../views/login/login.vue'
import index from '../views/home/index/index.vue'

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
    path: '/index',
    component: index
  }
]

const router = new VueRouter({
  routes
})

export default router
