// 文章请求模块
import request from '@/utils/request'

export const getArticles=params=>{
  return request({
    methods:'GET',
    url:'/v1_0/articles',//老师线上地址
    params
  })
}