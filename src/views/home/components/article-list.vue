<template>
	<div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
                  >
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			:error.sync="error"
			error-text="请求失败，点击重新加载"
			@load="onLoad"
		>
      <article-item
      	v-for="(article, index) in list"
				:key="index"
        :article="article"
      />
			<!-- <van-cell
				v-for="(article, index) in list"
				:key="index"
				:title="article.title"
			/> -->
		</van-list>
    </van-pull-refresh>
	</div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
	name: 'ArticleList',
	components: {
    ArticleItem
  },
	props: {
		// 设置一个props用来接收属于自己的频道信息数据
		channel: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			list: [], // 存储列表数据的数组
			loading: false, // 控制加载中 loading 状态
			finished: false, // 控制数据加载结束的状态
			error: false, // 是否加载失败
			timestamp: null, // 请求下一页数据的时间戳
       isreFreshLoading: false, // 控制下拉刷新的 loading 状态
       refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本
		}
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		// 初始化或滚动到底部的时候会触发调用 onLoad
		async onLoad() {
			try {
				//1.请求获取数据
				const { data } = await getArticles({
					channel_id: this.channel.id,
					timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
					with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
				})
				console.log('11')
				//2.把数据添加到list数组中【追加】
				const { results } = data.data
				this.list.push(...results)
				//3.设置本次加载中的loading状态结束
				this.loading = false
				//4.判断数据是否加载结束
				if (results.length) {
					//更新获取下一页数据的时间戳
					this.timestamp = data.data.pre_timestamp
				} else {
					//没有数据了，设置加载状态结束，不再触发上拉加载更多
					this.finished = true
				}
			} catch (err) {
				//请求失败
				// this.$toast('请求数据失败')
				console.log(err)
				this.loading = false //关闭loading加载
				this.error = true //开启错误提示
			}
		},
    async onRefresh(){
      try{
         // 1. 请求获取数据
    const { data } = await getArticles({
      channel_id: this.channel.id, // 频道 id
      timestamp: Date.now(), // 下拉刷新每次都应该获取最新数据
      with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
    })

    // 2. 将数据追加到列表的顶部
    const { results } = data.data
    this.list.unshift(...results)

    // 3. 关闭下拉刷新的 loading 状态
    this.isreFreshLoading = false

    // 提示成功
    this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`

      }catch(err){
        console.log(err);
        this.isreFreshLoading = false // 关闭下拉刷新的 loading 状态
    this.$toast('刷新失败')
      }
    }
	},
}
</script>

<style scoped lang="less">
.article-list {
	// 百分比单位是相对于父元素的
	// height: 100%;

	// 视口（在移动端是布局视口）单位：vw 和 vh，不受父元素影响
	// 1vw = 视口宽度的百分之一
	// 1vh = 视口高度的百分之一
	height: 79vh;
	overflow-y: auto;
}
</style>
