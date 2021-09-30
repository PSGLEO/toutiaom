//封装axios请求模块

import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

//创建一个axios实例对象
const request =axios.create({
  baseURL:"http://toutiao-app.itheima.net", // 基础路径
  // transforResponse 允许自定义原始的响应数据（字符串）
  transformResponse:[function(data){
    try{
      //如果转换成功则返回转换的数据结果
      return JSONBig.parse(data)

    }catch(err){
      console.log(err);
      //如果转换失败，则包装为统一数据格式并返回
      return data
    }
  }]
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