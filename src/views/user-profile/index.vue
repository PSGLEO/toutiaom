<template>
	<div class="user-profile">
		<!-- 导航栏 -->
		<van-nav-bar
			class="page-nav-bar"
			title="个人信息"
			left-arrow
			@click-left="$router.back()"
		/>
		<!-- /导航栏 -->
     <input type="file" hidden ref="file" @change="onFileChange">
		<!-- 个人信息 -->
		<van-cell 
    class="avatar-cell" 
    title="头像" 
    is-link center
    @click="$refs.file.click()"
    >
			<van-image class="avatar" round fit="cover" :src="user.photo" />
		</van-cell>
		<van-cell 
    title="昵称" 
    :value="user.name" 
    is-link 
    @click="isUpdateNameShow=true"
    />
		<van-cell
			title="性别"
			:value="user.gender === 0 ? '男' : '女'"
			is-link
      @click="isUpdateGenderShow=true"
		/>
		<van-cell 
    title="生日" 
    :value="user.birthday" 
    is-link 
    @click="isUpdateBirthdayShow=true"
    />
		<!-- /个人信息 -->
    <!-- 编辑头像 -->
    <van-popup 
    v-model="isUpdatePhotoShow"
    position="bottom"
    style="height:100%"
    >
      <update-photo
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
          @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- /编辑头像 -->

    <!-- 编辑昵称 -->
    <van-popup 
    style="height:100%"
    position="bottom"
    v-model="isUpdateNameShow"
    >
     <update-name 
     v-if="isUpdateNameShow"
     @close="isUpdateNameShow=false"
     v-model="user.name"
     />
    </van-popup>
    <!-- /编辑昵称 -->
    <!-- 修改性别 -->
    <van-popup
    position="bottom"
    v-model="isUpdateGenderShow"
    >
  <update-gender
  v-if="isUpdateGenderShow"
  v-model="user.gender"
  @close="isUpdateGenderShow=false"
  />
    </van-popup>
    <!-- /修改性别 -->

    <!-- 编辑生日 -->
    <van-popup
        position="bottom"
        v-model="isUpdateBirthdayShow"
        >
     <update-birthday
     v-if="isUpdateBirthdayShow"
     v-model="user.birthday"
        @close="isUpdateBirthdayShow=false"
     />
    </van-popup>
    <!-- /编辑生日 -->
	</div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name.vue'
// import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
	name: 'UserProfile',
	components: {
    UpdateName,
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
	props: {},
	data() {
		return {
			user: {}, //个人中心
      isUpdateNameShow:false, //昵称弹出层
      isUpdateGenderShow:false,  // 性别弹出层
      isUpdateBirthdayShow:false, //生日弹出层
      isUpdatePhotoShow:false,  //编辑头像弹出层
      img:null  //预览的图片
		}
	},
	computed: {},
	watch: {},
	created() {
		this.loadUserProfile()
	},
	mounted() {},
	methods: {
		async loadUserProfile() {
			try {
				const { data } = await getUserProfile()
				this.user = data.data
				console.log(data)
			} catch (err) {
				console.log(err)
				this.$toast('数据获取失败')
			}
		},
    onFileChange(){
      //获取文件对象
      const file = this.$refs.file.files[0]
      //基于文章对象获取 bolb数据
      this.img=window.URL.createObjectURL(file)
      // console.log(data);
      //
      //展示预览弹出层
      this.isUpdatePhotoShow=true
        // file-input 如果选了同一个文件不会触发 change 事件
    // 解决办法就是每次使用完毕，把它的 value 清空
    this.$refs.file.value = ''
    }
	},
}
</script>

<style scoped lang="less">
.user-profile {
	.avatar-cell {
		.van-cell__value {
			display: flex;
			flex-direction: row-reverse;
		}
		.avatar {
			width: 60px;
			height: 60px;
		}
	}
	.van-popup {
		background-color: #f5f7f9;
	}
}
</style>
