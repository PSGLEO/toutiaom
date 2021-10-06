<template>
	<van-button 
  :icon="isCollected ? 'star' : 'star-o'" 
  :class="{ collected: isCollected }"
  :loading="loading"
  @click="onCollect"
  >
	</van-button>
</template>
<script>
import {addCollect,deleteCollect} from '@/api/article'
export default {
	name: 'CollectArticle',
  //配置 v-model 对应的自定义属性名和自定义事件名称
  model:{
    prop:'isCollected',
    event:'updateCollect'
  },
	props: {
		//接收文章收藏状态
		isCollected: {
			type: Boolean,
			required: true,
		},
    //接收文章id
    articleId:{
      type:[Number,String,Object],
      required:true
    }
	},
	data() {
		return {
      //加载中效果
      loading:false
    }
	},
	methods: {
    async onCollect(){
      this.loading=true
      try{
        if(this.isCollected){
          //已收藏，取消收藏
          await deleteCollect(this.articleId)
        }else{
          //没有收藏，添加收藏
          await addCollect(this.articleId)
        }
        //更新视图
        //自定义事件修改数据并不是立即的
        this.$emit('updateCollect',!this.isCollected)

        this.$toast.success(!this.isCollected ? '收藏成功' : '取消收藏')

      }catch(err){
        console.log(err);
        this.$toast.fail('操作失败，请重试！')
      }
      this.loading=false
    }
  },
	created() {},
}
</script>
<style scoped lang="less">
.collected {
	.van-icon {
		color: #ffa500;
	}
}
</style>
