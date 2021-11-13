import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    show:false,
    times:0  //判断当前同时共有多少个请求  所有请求结束后（即值为0）遮罩消失
  },
  mutations: {
    increment (state,n) {
      // 变更状态  n为布尔值
      state.show=n
    },
    addTimes(state){
      state.times++
      //该步骤放在响应发出之前
    },
    reduceTimes(state){
      state.times--
      //该步骤放在响应结束之后
    }
  },
  actions: {
  },
  modules: {
  }
})