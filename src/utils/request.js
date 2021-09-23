//封装axios请求模块

import axios from 'axios'

//创建一个axios实例对象
const request =axios.create({
  baseURL:"http://toutiao-app.itheima.net", // 基础路径
})

//请求拦截器

//响应拦截器


export default request