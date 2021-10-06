<template>
	<van-button 
  :icon="value ? 'star': 'star-o'"
  :class="{ collected:value}"
  :loading="loading"
  @click="onCollect"
  ></van-button>
</template>
<script>
import { addCollect,deleteCollect} from '@/api/article'
	export default {
        name:'CollectArticle',
        props:{
          //接收文章收藏状态
          value:{
            type:Boolean,
            required:true
          },
          //接收文章id
          articleId:{
            type:[Number,String,Object],
            required:true
          }
        },
        data(){
            return{
                loading:false
            }
        },
        methods:{
          async onCollect(){
            this.loading=true
            try{
              if(this.value){
                //已收藏，取消收藏
                await deleteCollect(this.articleId)
              }else{
                //未收藏，添加收藏
                await addCollect(this.articleId)
              }
              //更新视图
              this.$emit('input',!this.value)

              this.$toast.success(!this.value?'收藏成功':'取消收藏')
            }catch(err){
              console.log(err);
              this.$toast.fail('操作失败，请重试！')
            }
            this.loading=false

          }
        },
        created(){}
    }
</script>
<style scoped lang="less">
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>