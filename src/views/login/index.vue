<template>
	<div class="login-container">
		<!-- 导航栏 -->
		<van-nav-bar class="page-nav-bar" title="登录" >
        <template #left>
    <!-- 后退上一页:  $router.back() 或 $router.go(-1) -->
    <van-icon name="cross" @click="$router.back()" />
      </template>
    </van-nav-bar>

		<!-- 登录表单 -->
		<van-form ref="loginForm" @submit="onSubmit">
			<van-field
				v-model="user.mobile"
				name="mobile"
				placeholder="请输入手机号"
				:rules="userFormRules.mobile"
				type="number"
				maxlength="11"
			>
				<i slot="left-icon" class="toutiao toutiao-shouji"></i>
			</van-field>
			<van-field
				v-model="user.code"
				name="code"
				placeholder="请输入验证码"
				:rules="userFormRules.code"
				type="number"
				maxlength="6"
			>
				<i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
				<template #button>
					<van-count-down
						v-if="isCountDownShow"
						:time="1000 * 6"
						format=" ss 秒"
						@finish="isCountDownShow = false"
					/>
					<van-button
						v-else
						round
						class="send-sms-btn"
						size="small"
						native-type="button"
						type="default"
						@click="onSendSms"
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
import { login, sendSms } from '@/api/user'
export default {
	name: 'LoginIndex',
	components: {},
	props: {},
	data() {
		return {
			user: {
				mobile: '17754817548', //手机号
				code: '246810', //验证码
			},
			//设置成属性变量，在上面调用
			userFormRules: {
				mobile: [
					{
						required: true,
						message: '手机号不能为空',
					},
					{
						pattern: /^1[3|5|7|8]\d{9}$/,
						message: '手机号格式错误',
					},
				],
				code: [
					{
						required: true,
						message: '请填写用户名',
					},
					{
						pattern: /^\d{6}$/,
						message: '验证码格式错误',
					},
				],
			},
			isCountDownShow: false, //是否显示倒计时
		}
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		async onSubmit(values) {
			//1.获取表单数据
			// const user = this.user
			//2.表单验证
			//在组件中必须通过this.$toast来调用Toast组件
			this.$toast.loading({
				message: '登录中...',
				forbidClick: true, //禁用背景点击
				duration: 0, //持续时间，默认2000，如果为0则持续展示
			})
			// 3.提交表单请求登录
			try {
				const {data} = await login(this.user)
				// console.log('登录成功', res)
        //存储数据，存储到仓库中
        this.$store.commit('setUser',data.data)
				this.$toast.success('登录成功')
        // this.$router.back()
        let url=this.$route.query.url
        this.$router.replace( url || '/my')

			} catch (err) {
				if (err.response.status === 400) {
					this.$toast.fail('手机号或验证码错误')
				} else {
					this.$toast.fail('登录失败，请稍后重试')
				}
			}
			// 4.根据请求响应结果处理后续操作
		},
		async onSendSms() {
			console.log('onSendSms')
			//1.校验手机号
			try {
				await this.$refs.loginForm.validate('mobile') //主动校验手机号是否正确，验证失败返回promise的reject状态
			} catch (err) {
				return console.log('验证失败', err)
			}
			// 2.验证通过，显示倒计时
			this.isCountDownShow = true // <========【增加这一句】

			// 3.请求发送验证码
			try {
				const res = await sendSms(this.user.mobile)
				this.$toast('发送成功')
			} catch (err) {
				//发送失败，关闭倒计时
				this.isCountDownShow = false
				if (err.response.status === 429) {
					this.$toase('发送太频繁，请稍后重试')
				} else {
					this.$toast('发送失败，请稍后重试')
				}
			}
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
