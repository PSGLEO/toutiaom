<template>
	<div class="article-container">
		<!-- 导航栏 -->
		<van-nav-bar
			class="page-nav-bar"
			left-arrow
			title="黑马头条"
			@click-left="$router.back()"
		></van-nav-bar>
		<!-- /导航栏 -->

		<div class="main-wrap">
			<!-- 加载中 -->
			<div class="loading-wrap" v-if="loading">
				<van-loading color="#3296fa" vertical>加载中</van-loading>
			</div>
			<!-- /加载中 -->

			<!-- 加载完成-文章详情 -->
			<div class="article-detail" v-else-if="article.title">
				<!-- 文章标题 -->
				<h1 class="article-title">{{ article.title }}</h1>
				<!-- /文章标题 -->

				<!-- 用户信息 -->
				<van-cell class="user-info" center :border="false">
					<van-image
						class="avatar"
						slot="icon"
						round
						fit="cover"
						:src="article.aut_photo"
					/>
					<div slot="title" class="user-name">
						{{ article.aut_name }}
					</div>
					<div slot="label" class="publish-date">
						{{ article.pubdate | relativeTime }}
					</div>
					<follow-user
						class="follow-btn"
						:user-id="article.aut_id"
						v-model="article.is_followed"
					/>
				</van-cell>
				<!-- /用户信息 -->

				<!-- 文章内容 -->
				<div
					class="article-content markdown-body"
					ref="article-content"
					v-html="article.content"
				></div>
				<van-divider>正文结束</van-divider>
				<!-- 文章评论列表   ----------------------------------------->
				<comment-list
					:source="article.art_id"
					:list="commentList"
          @reply-click="onReplyClick"
					@onload-success="totalCommentCount = $event.total_count"
				/>
				<!-- /文章评论列表 -->
				<!-- 底部区域 -->
				<div class="article-bottom">
					<van-button
						class="comment-btn"
						type="default"
						round
						size="small"
						@click="isPostShow = true"
						>写评论</van-button
					>
					<van-icon
						name="comment-o"
						:info="totalCommentCount"
						color="#777"
					/>
					<collect-article
						class="btn-item"
						v-model="article.is_collected"
						:article-id="article.art_id"
					/>
					<!-- <liek-article
          class="btn-item"
          v-model="article.attitude"
          /> -->
					<like-article
						class="btn-item"
						:article-id="article.art_id"
						:attitudeNum.sync="article.attitude"
					/>
					<van-icon name="share" color="#777777"></van-icon>
				</div>
				<!-- /底部区域 -->
				<!-- ----------------------发布评论----------------------------      ---- -->
				<van-popup v-model="isPostShow" position="bottom">
					<comment-post
						:target="article.art_id"
						@post-success="onPostSuccess"
					/>
				</van-popup>
				<!----------------------- /发布评论------------------------------------ -->
			</div>
			<!-- /加载完成-文章详情 -->

			<!-- 加载失败：404 -->
			<div class="error-wrap" v-else-if="errStatus === 404">
				<van-icon name="failure" />
				<p class="text">该资源不存在或已删除！</p>
			</div>
			<!-- /加载失败：404 -->

			<!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
			<div class="error-wrap" v-else>
				<van-icon name="failure" />
				<p class="text">内容加载失败！</p>
				<van-button class="retry-btn" @click="loadArticle"
					>点击重试</van-button
				>
			</div>
			<!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
		</div>
     <!-- ----------------------------评论回复------------------------------------------ -->
        <van-popup 
          v-model="isReplyShow" 
          position="bottom"
          style="height: 100%"
          >
         <comment-reply
         :comment="currentComment"
         @close="isReplyShow=false"
         v-if="isReplyShow"
         />
        </van-popup>
  <!-- ----------------------------/评论回复------------------------------------------ -->
    
	</div>
 

</template>

<script>
// 1.导入请求方法
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'
export default {
	name: 'ArticleIndex',
	components: {
		FollowUser,
		CollectArticle,
		LikeArticle,
		CommentList,
		CommentPost,
    CommentReply
	},
	props: {
		// 使用props获取动态路由的数据
		articleId: {
			type: [Number, String, Object],
			required: true,
		},
	},
	data() {
		return {
			article: {}, //2.定义变量存储文章详情
			loading: true, //加载中的loading 状态
			errStatus: 0, //失败状态码
			totalCommentCount: 0, //文章评论总数量
			followLoading: false, //控制是否处于加载中
			isPostShow: false,
			commentList: [], //评论列表
      isReplyShow:false,
      currentComment:{} //当前点击回复的评论项
		}
	},
	computed: {},
	watch: {},
	created() {
		// 4.调用方法
		this.loadArticle()
	},
	mounted() {},
	methods: {
		// 3.定义获取数据请求方法
		async loadArticle() {
			this.loading = true
			try {
				// 3.1发送请求
				const { data } = await getArticleById(this.articleId)

				// if (Math.random() > 0.5) {
				// 	JSON.parse('dsankljdnskaljndlkjsa')
				// }
				// 3.3成功赋值
				this.article = data.data

				//初始化图片点击预览
				console.log(this.$refs['article-content'])
				setTimeout(() => {
					console.log(this.$refs['article-content'])
					this.previewImage()
				}, 0)

				console.log(this.article) //控制台查看数据输出
			} catch (err) {
				// 3.2失败处理
				console.log(err)
				if (err.response && err.response.status === 404) {
					this.errStatus = 404
				}
			}
			//无论成功失败 都要关闭loading
			this.loading = false
		},
		//预览图片处理事件函数
		previewImage() {
			//得到所有的 img 节点
			const articleContent = this.$refs['article-content'] //获得了容器节点
			const imgs = articleContent.querySelectorAll('img')

			//获得所有 img 地址
			const images = []
			imgs.forEach((img, index) => {
				images.push(img.src)

				//给每个img注册点击事件，在处理函数中调用预览
				img.onclick = () => {
					ImagePreview({
						//预览的图片地址数组
						images,
						//起始位置，从0开始
						startPosition: index,
					})
				}
			})
		},
		onPostSuccess(data) {
			//关闭弹出层
			this.isPostShow = false
			// console.log(data);
			//将发布内容显示到列表顶部
			this.commentList.unshift(data.new_obj)
			//评论数量+1
			this.totalCommentCount++
		},
    onReplyClick(comment){
      // console.log(comment);
      this.currentComment=comment
      //打开弹出层
      this.isReplyShow=true
    }
	},
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
	.main-wrap {
		position: fixed;
		left: 0;
		right: 0;
		top: 92px;
		bottom: 88px;
		overflow-y: scroll;
		background-color: #fff;
	}
	.article-detail {
		.article-title {
			font-size: 40px;
			padding: 50px 32px;
			margin: 0;
			color: #3a3a3a;
		}

		.user-info {
			padding: 0 32px;
			.avatar {
				width: 70px;
				height: 70px;
				margin-right: 17px;
			}
			.van-cell__label {
				margin-top: 0;
			}
			.user-name {
				font-size: 24px;
				color: #3a3a3a;
			}
			.publish-date {
				font-size: 23px;
				color: #b7b7b7;
			}
			.follow-btn {
				width: 170px;
				height: 58px;
			}
		}

		.article-content {
			padding: 55px 32px;
			/deep/ p {
				text-align: justify;
			}
		}
	}

	.loading-wrap {
		padding: 200px 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
	}

	.error-wrap {
		padding: 200px 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		.van-icon {
			font-size: 122px;
			color: #b4b4b4;
		}
		.text {
			font-size: 30px;
			color: #666666;
			margin: 33px 0 46px;
		}
		.retry-btn {
			width: 280px;
			height: 70px;
			line-height: 70px;
			border: 1px solid #c3c3c3;
			font-size: 30px;
			color: #666666;
		}
	}

	.article-bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		height: 88px;
		border-top: 1px solid #d8d8d8;
		background-color: #fff;
		.comment-btn {
			width: 282px;
			height: 46px;
			border: 2px solid #eeeeee;
			font-size: 30px;
			line-height: 46px;
			color: #a7a7a7;
		}
		/deep/.van-icon {
			font-size: 40px;
			.van-info {
				font-size: 16px;
				background-color: #e22829;
			}
		}
	}
}
</style>
