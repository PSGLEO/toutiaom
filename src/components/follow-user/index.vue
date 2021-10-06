<template>
  	<van-button
              v-if="value"
              class="follow-btn"
              round
              size="small"
              @click="onFollow"
              :loading="loading"
          >已关注</van-button>
					<van-button
          v-else
             @click="onFollow"
              :loading="loading"
						class="follow-btn"
						type="info"
						color="#3296fa"
						round
						size="small"
						icon="plus"
						>关注</van-button
					>
</template>

<script>
import {addFollow,deleteFollow} from '@/api/user'

export default {
  name:'FollowUser',
components: {},
  props: {
    //是否关注了
    value:{
      type:Boolean,
      required:true
    },
    //用户ID
    userId:{
      type:[Number,String,Object],
      required:true
    }
  },
  data () {
    return {
      loading:false //加载中控制变量
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
        async onFollow(){
      //如果没有登录，就不允许操作
      if(!this.$store.state.user) return this.$toast('请登录')

      //开启按钮的loading状态
      this.loading=true

      try{
          //如果已关注，则取消关注
          // const authorId=this.article.aut_id
          if(this.value){
            await deleteFollow(this.userId)
          }else{
            //否则添加关注
            await addFollow(this.userId)
          }
          //更新视图
          // this.article.is_followed=!this.article.is_followed
          this.$emit('input',!this.value)
      }catch(err){
        console.log(err);
        // // console.log('关注失败',err);
        // this.$toast('关注失败，请重试')
        if(err&&err.response.status===400){
          this.$toast('你不能关注自己')
        }else{
           this.$toast.fail('操作失败')
        }

      }
      //关闭按钮的 loading 状态
      this.loading=false
    }
  }
}
</script>

<style>

</style>