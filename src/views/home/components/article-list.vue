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
			error: false, //是否加载失败
			timestamp: null, //请求下一页数据的时间戳
      isreFreshLoading:false,//控制下拉刷新的loading状态
      refreshSuccessText:'刷新成功'//下拉刷新成功的提示文本
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
				// 1. 请求获取数据

				const { data } = await getArticles({
					channel_id: this.channel.id, // 频道 id
					timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
					with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
				})
				//测试错误
				// if(Math.random()>0.5){
				//   JSON.parse('sjdosdfin')
				// }
				// 2. 把请求结果数据追加放到 list 数组中  【一定要记住是追加，因为只有追加才会让列表高度不断增加】
				const { results } = data.data
				this.list.push(...results)
				// 3. 本次数据加载结束之后要把加载状态设置为结束
				this.loading = false
				// 4. 判断数据是否全部加载完成
				if (results.length) {
					//更新获取下一页数据的时间戳
					this.timestamp = data.data.pre_timestamp
				} else {
					//没有数据了，将finished设置为true,load不再加载更多
					this.finished = true
				}
			} catch (err) {
				// console.log('请求失败', err)
				//展示错误状态
				this.error = true
				//请求失败了，loading也需要关闭
				this.loading = false
			}
		},
    async onRefresh(){
      try{
      // 1.请求获取数据
        const {data} =await getArticles({
          channel_id:this.channel.id,  //频道ID
          timestamp:Date.now(),    // 下拉刷新，每次请求获取最新数据
          with_top:1   // 是否包含置顶
        })
        		//测试错误
				// if(Math.random()>0.5){
				//   JSON.parse('sjdosdfin')
				// }
        // 2.将数据追加到列表顶部
        const {results} =data.data
        this.list.unshift(...results)

        // 3.关闭下拉刷新的loading状态
        this.isreFreshLoading=false

        //4.更新下拉刷新成功提示的文本
        this.refreshSuccessText=`刷新成功，更新了${results.length}条数据`
      }catch(err){
        // console.log('刷新失败',err);
        this.isreFreshLoading=false  // 关闭下拉刷新的 loading 状态
        this.$toast('刷新失败')
      }
    }
	}
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
