<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{  liked: value === 1 }"
    :loading="loading"
    @click="onLike"
  />
</template>
<script>
import {addLike,deleteLike} from '@/api/article'
	export default {
        name:'LikeArticle',
        props:{
            // 接收对文字的态度
            value:{
                type:Number,
                required:true
            },
            //文章id
            articleId:{
              type:[Number,String,Object],
              required:true
            }
        },
        data(){
            return{
                // 加载中变量控制
                loading:false
            }
        },
        methods:{
         async onLike(){
           this.loading=true
           try{
             let status=-1
             if(this.value===1){
               //已点赞，取消点赞
               await deleteLike(this.articleId)
             }else{
               //未点赞，添加点赞
               await addLike(this.articleId)
               status=1
             }
             //更新视图
              this.$emit('input',status)
              this.$toast.success(status===1?'点赞成功':'取消点赞')
           }catch(err){
             console.log(err);
             this.$toast('操作失败，请重试')
           }
           this.loading=false
          }
        },
        created(){}
    }
</script>
<style scoped lang="less">
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>