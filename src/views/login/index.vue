<template>
	<div class="login-container">
		<!-- 导航栏 -->
		<van-nav-bar class="page-nav-bar" title="登录" />

		<!-- 登录表单 -->
		<van-form @submit="onSubmit">
			<van-field
				v-model="user.mobile"
				name="手机号"
				placeholder="请输入手机号"
			>
				<i slot="left-icon" class="toutiao toutiao-shouji"></i>
			</van-field>
			<van-field
				v-model="user.code"
				name="验证码"
				placeholder="请输入验证码"
			>
				<i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
				<template #button>
					<van-button
						round
						class="send-sms-btn"
						size="small"
						native-type="button"
						type="default"
						>发送验证码</van-button
					>
				</template>
			</van-field>
			<div class="login-btn-wrap">
				<van-button
					block
					class="login-btn"
					type="info"
					native-type="submit"
					>登录</van-button
				>
			</div>
		</van-form>
	</div>
</template>

<script>
import { login } from '@/api/user'
export default {
	name: 'LoginIndex',
	components: {},
	props: {},
	data() {
		return {
			user: {
				mobile: '', //手机号
				code: '', //验证码
			},
		}
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		async onSubmit(values) {
			//1.获取表单数据
			const user = this.user
			//2.表单验证
        //在组件中必须通过this.$toast来调用Toast组件
        this.$toast.loading({
        message: '加载中...',
        forbidClick: true,   //禁用背景点击
        duration:0           //持续时间，默认2000，如果为0则持续展示
      });
			// 3.提交表单请求登录
			try {
				const res = await login(user)
				console.log('登录成功', res)
        this.$toast.success('登录成功')
			} catch (err) {
				if (err.response.status === 400) {
					this.$toast.fail('手机号或验证码错误')
				} else {
					this.$toast.fail('登录失败，请稍后重试')
				
				}
			}
			// 4.根据请求响应结果处理后续操作
		},
	},
}
</script>

<style scoped lang="less">
// .login-container{
//   .toutiao{
//     font-size: 37px;
//   }
// }
// .send-sms-btn{
//   background-color: #ededed;
//   width: 152px;
//   height: 46px;
//   line-height: 46px;
//   font-size: 22px;
// }
.login-container {
	.toutiao {
		font-size: 37px;
	}
	.send-sms-btn {
		width: 180px;
		height: 55px;
		line-height: 55px;
		background-color: #ededed;
		font-size: 22px;
		color: #666;
	}
	.login-btn-wrap {
		padding: 53px 33px;
		.login-btn {
			background-color: #6db4fb;
			border: none;
		}
	}
}
</style>
