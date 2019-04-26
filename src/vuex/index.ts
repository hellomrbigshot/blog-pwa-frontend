import Vue from 'vue'
import Vuex from 'vuex'
import { normalRouter } from '@/route/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routers: normalRouter,
    unreadMsgNum: 0
  },
  mutations: {
    changeMsgNum (state, unreadMsgNum) {
      state.unreadMsgNum = unreadMsgNum
    }
  }
})
