<template>
	<van-list
		v-model="loading"
		:finished="finished"
		finished-text="没有更多了"
		@load="onLoad"
	>
		<comment-item
			v-for="(item, index) in list"
			:key="index"
      :comment="item"
    />
	</van-list>
</template>
<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
	name: 'CommentList',
	components: {
    CommentItem
  },
	props: {
		source: {
			type: [Number, String, Object],
			required: true,
		},
	},
	data() {
		return {
			list: [], // 评论列表
			loading: false, // 上拉加载更多的 loading
			finished: false, // 是否加载结束
			offset: null, // 获取下一页数据的标记
			limit: 10,
			error: false,
		}
	},
  created(){
    this.onLoad()
  },

	methods: {
		async onLoad() {
			try {
				// 1.请求获取数据
				const { data } = await getComments({
					type: 'a', //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
					source: this.source.toString(),
					offset: this.offset,
					limit: this.limit, //获取评论个数
				})
				// 2.将数据添加到列表中
				// console.log(data);
				const { results } = data.data
				this.list.push(...results)

        //把文章评论的总数量传递到外部
        this.$emit('onload-success',data.data)
				// 3.将 loading 设置为 false
				this.loading = false
				// 4.判断是否还有数据
				if (results.length) {
					//   有就更新获取下一页的数据页码
					this.offset = data.data.last_id
				} else {
					//   没有就将 finished 设置结束
					this.finished = true
				}
			} catch (err) {
				console.log(err)
				this.error = true
				this.loading = false
			}
		},
	},
}
</script>
