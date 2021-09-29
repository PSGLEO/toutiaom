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
        to="/search"
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
				v-for="(channel, index) in channels"
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
				<div class="hamburger-btn" @click="isChannelEditShow = true">
					<i class="toutiao toutiao-gengduo"></i>
				</div>
			</template>
		</van-tabs>
		<!-- /频道列表 -->
		<!-- <频道编辑 -->
		<van-popup
			v-model="isChannelEditShow"
			closeable
			position="bottom"
			:style="{ height: '100%' }"
			close-icon-position="top-left"
		>
			<Channel-edit
				:my-channels="channels"
				:active="active"
				@update-active="onUpdateActive"
			/>
		</van-popup>
		<!-- /频道编辑 -->
	</div>
</template>

<script>
//导入频道列表封装的方法
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
	name: 'HomeIndex',
	components: {
		ArticleList,
		ChannelEdit,
	},
	props: {},
	data() {
		return {
			active: 0,
			channels: [], //频道列表
			isChannelEditShow: false,
		}
	},
	computed: {
		...mapState(['user']),
	},
	watch: {},
	created() {
		this.loadChannels()
	},
	mounted() {},
	methods: {
		async loadChannels() {
			try {
				//发请求
				// const { data } = await getUserChannels()
				// //成功赋值
				// this.channels = data.data.channels
				let channels = []
				if (this.user) {
					//已登录，请求获取用户频道列表
					const { data } = await getUserChannels()
					channels = data.data.channels
				} else {
					//未登录，判断是否有本地的频道列表数据
					const locaChannels = getItem('TOUTIAO_CHANNELS')
					//有，拿来使用
					if (locaChannels) {
						channels = locaChannels
					} else {
						//没有，请求获取默认频道列表
						const { data } = await getUserChannels()
						channels = data.data.channels
					}
				}
				this.channels = channels
			} catch (err) {
				//失败处理
				this.$toast('获取频道数据失败')
			}
		},
		onUpdateActive(index, isChannelEditShow = true) {
			this.active = index //更新激活的频道项
			this.isChannelEditShow = isChannelEditShow //关闭编辑频道弹层
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
