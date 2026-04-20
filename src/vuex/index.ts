import Vue from 'vue'
import Vuex from 'vuex'
import { normalRouter } from '@/route/router'
import { CHANGE_MESSAGE_NUM, CHANGE_LOADING_ARR } from './mutation-types'

Vue.use(Vuex)

interface IPayload {
  num: number,
  type: string
}

export default new Vuex.Store({
  state: {
    routers: normalRouter,
    unreadMsgNum: 0,
    loading: 0
  },
  getters: {
    isLoading: state => state.loading
  },
  mutations: {
    [CHANGE_MESSAGE_NUM] (state, payload: IPayload) {
      const { num } = payload
      state.unreadMsgNum = num
    },
    [CHANGE_LOADING_ARR] (state, payload: IPayload) {
      const { type } = payload
      if (type === 'ADD') {
        state.loading++
      } else {
        state.loading--
      }
    }
  }
})
