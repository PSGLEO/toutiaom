<template>
  <div class="comment-reply">

    <!-- <van-nav-bar
  :title="comment.reply_count>0?`${comment.reply_count}条回复`:'暂无回复'"

/> -->
      <van-nav-bar
      :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'"
    >
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close')"
      />
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="comment" />
      <!-- /当前评论项 -->

      <!-- 评论的回复列表 -->
      <comment-list 
      :source="comment.com_id"
      type='c'
      />
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
      >写评论</van-button>
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup 
    v-model="isPostShow"
    position="bottom"
    >评论回复评论回复</van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList
  },
  props: {
    //点击的哪行的评论信息
    comment:{
      type:Object,
      required:true
    }
  },
  data () {
    return {
      isPostShow:false  //弹框是否显示
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>