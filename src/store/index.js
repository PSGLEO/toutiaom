import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from '@/utils/storage'

Vue.use(Vuex)

//
const TOUKEN_KEY='TOUTIAO_USER'
export default new Vuex.Store({
  state: {
     //一个对象，存储当前登录用户信息（token等数据）
    //  user:JSON.parse(window.localStorage.getItem(TOUKEN_KEY)) //删除
    user:getItem(TOUKEN_KEY)  //修改为这一句
    //  user:null
  },
  mutations: {
    setUser(state,data){
      state.user=data
      //为了防止刷新丢失，我们需要把数据备份到本地存储
      // window.localStorage.setItem(TOUKEN_KEY,JSON.stringify(state.user))  //删除
      setItem(TOUKEN_KEY,state.user)  //修改Wie这一句
    }
  },
  actions: {
  },
  modules: {
  }
})
