<template>
	<div class="home-container">
		<!-- 导航栏 -->
		<van-nav-bar class="page-nav-bar" fixed>
			<van-button
				class="search-btn"
				slot="title"
				type="info"
				size="small"
				round
				icon="search"
				>搜索</van-button
			>
		</van-nav-bar>
		<!-- /导航栏 -->
		<!-- 频道列表 -->
		<!--
animated 滑动的动画
border 底边框线
swipeable 开启左右手势滑动
-->
		<van-tabs
			class="channel-tabs"
			v-model="active"
			swipeable
			animated
			border
		>
			<van-tab
				:title="channel.name"
				v-for="(channel,index) in channels"
				:key="index"
			>
				<!-- 频道的文章列表 -->
				<article-list :channel="channel" />
			</van-tab>

			<!-- 右侧自定义内容 -->
		
			<!-- 右侧按钮 -->
			<template #nav-right>
        	<!-- 占位元素 -->
			<div class="placeholder"></div>
				<div class="hamburger-btn">
					<i class="toutiao toutiao-gengduo"></i>
				</div>
			</template>
		</van-tabs>
		<!-- /频道列表 -->
	</div>
</template>

<script>
//导入频道列表封装的方法
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
	name: 'HomeIndex',
	components: {
		ArticleList
	},
	props: {},
	data() {
		return {
			active: 0,
			channels: [], //频道列表
		}
	},
	computed: {},
	watch: {},
	created() {
		this.loadChannels()
	},
	mounted() {},
	methods: {
		async loadChannels() {
			try {
				//发请求
				const { data } = await getUserChannels()
				//成功赋值
				this.channels = data.data.channels
			} catch (err) {
				//失败处理
				this.$toast('获取频道数据失败')
			}
		},
	},
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 85px;
  padding-bottom: 100px;
  // tabs 标签导航也设置为固定定位
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
	/deep/ .van-nav-bar__title {
		max-width: unset;
	}
	.search-btn {
		width: 555px;
		height: 64px;
		background-color: #5babfb;
		border: none;
		font-size: 28px;
		.van-icon {
			font-size: 32px;
		}
	}
	/deep/ .channel-tabs {
		padding-top: 90px;
		.van-tab {
			border-right: 1px solid #edeff3;

			min-width: 200px;
			font-size: 30px;
			color: #777777;
		}

		.van-tab--active {
			color: #333333;
		}

		.van-tabs__nav {
			padding-bottom: 0;
		}

		.van-tabs__line {
			bottom: 8px;
			width: 31px !important;
			height: 6px;
			background-color: #3296fa;
		}

		.placeholder {
			flex-shrink: 0;
			width: 66px;
			height: 82px;
		}

		.hamburger-btn {
			position: fixed;
			right: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 66px;
			height: 82px;
			background-color: #fff;
			background-color: rgba(255, 255, 255, 0.902);
			i.toutiao {
				font-size: 33px;
			}
			&:before {
				content: '';
				position: absolute;
				left: 0;
				width: 1px;
				height: 58px;
				background-image: url(~@/assets/gradient-gray-line.png);
				background-size: contain;
			}
		}
	}
}
</style>
