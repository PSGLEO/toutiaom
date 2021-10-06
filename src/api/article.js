// 文章请求模块
import request from '@/utils/request'

export const getArticles=params=>{
  return request({
    methods:'GET',
    url:'/v1_1/articles',//老师线上地址
    params
  })
}


//根据id获取指定文章

export const getArticleById=articleId=>{
  return request({
    methods:'GET',
    url: `/v1_0/articles/${articleId}`
  })
}

// 收藏文章
export const addCollect=target=>{
  return request({
    method:'POST',
    url: '/v1_0/article/collections',
    data:{
      target
    }
  })
}

// 取消收藏文章
export const deleteCollect=target=>{
  return request({
    method:'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}


// 点赞
export const addLike=articleId=>{
  return request({
    method:'POST',
    url:  '/v1_0/article/likings',
    data:{
      target:articleId
    }
  })
}

/**
 * 取消点赞
 */
 export const deleteLike = articleId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${articleId}`
  })
}