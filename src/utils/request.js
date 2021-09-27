//封装axios请求模块

import axios from 'axios'
import store from '@/store'
//创建一个axios实例对象
const request =axios.create({
  baseURL:"http://toutiao-app.itheima.net", // 基础路径
  // baseURL:"http://192.168.11.56:8000", // 基础路径
})

//请求拦截器
// 请求拦截器   <===========增加
request.interceptors.request.use(function (config) {
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

//响应拦截器


export default request