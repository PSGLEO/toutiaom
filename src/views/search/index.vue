<template>
	<div class="search-container">
		<!-- 搜索栏 -->
		<!--
          Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
         -->
		<form class="search-form" action="/">
			<van-search
				v-model="searchText"
				show-action
				placeholder="请输入搜索关键词"
				background="#3296fa"
				@search="onSearch"
				@cancel="onCancel"
				@focus="isResultShow = false"
			/>
		</form>
		<!-- /搜索栏 -->

		<!-- 搜索结果 -->
		<search-result v-if="isResultShow" :search-text="searchText" />
		<!-- /搜索结果 -->

		<!-- 联想建议 -->
		<search-suggestion
			v-else-if="searchText"
			:search-text="searchText"
			@search="onSearch"
		/>
		<!-- /联想建议 -->

		<!-- 搜索历史记录 -->
		<search-history
			v-else
			:search-histories="searchHistories"
			@clear-search-histories="searchHistories = []"
			@search="onSearch"
		/>
		<!-- /搜索历史记录 -->
	</div>
</template>
<script>
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchHistory from './components/search-history.vue'
//数据持久化  导入本地存储封装方法
import { setItem, getItem } from '@/utils/storage'
export default {
	name: 'SearchPage',
	components: {
		SearchResult,
		SearchSuggestion,
		SearchHistory,
	},
	props: {},
	data() {
		return {
			searchText: '', // 绑定输入框变量
			isResultShow: false,
			searchHistories: getItem('search-histories') || [],
		}
	},
	computed: {},
	watch: {
		searchHistories(val) {
			//同步到本地存储
			setItem('search-histories', val)
		},
	},
	created() {},
	methods: {
		onSearch(val) {
			console.log(val) // 输入的值
			//  //更新文本框内容
			this.searchText = val

			//存储搜索历史记录
			//要求：不要有重复的历史记录、最新的牌子啊最前面
			const index = this.searchHistories.indexOf(val)
			if (index !== -1) {
				this.searchHistories.splice(index, 1)
			}
			this.searchHistories.unshift(val)

			//渲染搜索结果
			this.isResultShow = true
		},
		onCancel() {
			this.$router.back()
		},
	},
}
</script>
<style scoped lang="less">
.search-container {
	padding-top: 108px;
	.van-search__action {
		color: #fff;
	}
	.search-form {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
	}
}
</style>
