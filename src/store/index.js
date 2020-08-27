import Vue from 'vue'
import Vuex from 'vuex'
import { apiGetUserInfo } from '../api/user.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // userInfo: JSON.parse(window.localStorage.getItem('useInfo')) || {}
    userInfo: {}
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async setUserInfo (context) {
      const res = await apiGetUserInfo()
      console.log(res)
      context.commit('setUserInfo', res.data.data)
    }
  },
  modules: {}
})
