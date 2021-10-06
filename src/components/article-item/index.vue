<template>
  <!-- :to="`/article/${article.art_id}`"  模板拼接路径-->
 <!-- :to="'/article/' + article.art_id"   拼接路径 -->
	<van-cell 
  class="article-item"
  :to="{name:'article',params:{articleId:article.art_id}}"
  >
		<!-- 标题插槽 -->
		<template #title>
			<div class="title">{{ article.title }}</div>
		</template>

		<!-- 标题下方的内容 -->
		<template #label>
			<!-- 文章封面信息 -->
			<div v-if="article.cover.type === 3" class="cover-wrap">
				<div
					class="cover-item"
					v-for="(img, index) in article.cover.images"
					:key="index"
				>
					<van-image width="100" height="100" :src="img" />
				</div>
			</div>

			<!-- 文章标注信息 -->
			<div>
				<span>{{ article.aut_name }}</span>
				<span>{{ article.comm_count }}评论</span>
				<span>{{ article.pubdate | relativeTime }}</span>
			</div>
		</template>

		<!-- 默认的插槽: 右边的内容 -->
		<van-image
			v-if="article.cover.type === 1"
			width="100"
			height="100"
			:src="article.cover.images[0]"
		/>
	</van-cell>
</template>

<script>
export default {
	name: 'ArticleItem',
	components: {},
	props: {
		// 定义一个props，接收这一行的数据
		article: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {}
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},
}
</script>

<style scoped lang="less">
.article-item {
	.title {
		font-size: 32px;
		color: #3a3a3a;
	}

	.van-cell__title {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.van-cell__value {
		flex: unset;
		width: 232px;
		height: 146px;
		padding-left: 25px;
	}

	.right-cover {
		width: 100%;
		height: 146px;
	}

	.label-info-wrap span {
		font-size: 22px;
		color: #b4b4b4;
		margin-right: 25px;
	}

	.cover-wrap {
		display: flex;
		padding: 30px 0;
		.cover-item {
			flex: 1;
			height: 146px;
			&:not(:last-child) {
				padding-right: 4px;
			}
			.cover-item-img {
				width: 100%;
				height: 146px;
			}
		}
	}
}
</style>
