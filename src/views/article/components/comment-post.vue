<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  data () {
    return {
      message: ''
    }
  },
  props:{
    //目标id，接收文章ID或者评论id
    target:{
      type:[Number,String,Object],
      required:true
    },
    type:{
      type:String,
      //自定义 prop 数据验证
      validator(value){
        return ['a','c'].includes(value)
      },
      default:'a'
    }
  },
  inject:{
    articleId:{
      type:[Number,String,Object],
      default:null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost(){

      try{
        const {data} =await addComment({
         target:this.target.toString(),
         content:this.message,
         art_id:this.type==='a'?num:this.articleId.toString()

        })
        this.$toast.success('发布成功')
        console.log(data);
        //清空文本框
         this.message = ''
        this.$emit('post-success',data.data)

      }catch(err){
        console.log(err);
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>