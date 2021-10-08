<template>
  
  <div class="update-gender">
    <van-picker
    show-toolbar
    title="标题"
    :columns="columns"
    :default-index="value"
    @cancel="$emit('close')"
    @confirm="onConfirm"
    @change="onPickerChenge"
    />
  </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
export default {
name:'UpdateGender',
components:{},
props:{
  //接收用户性别
  value:{
    type:Number,
    required:true
  }

},
data(){
  return {
    columns:['男','女'],
    localGender:this.value //当前性别
  }
},
methods:{
  //确定事件
    	async onConfirm() {
			this.$toast.loading({
				message: '保存中..',
				forbidClick: true, //禁止背景点击
				duration: 0, //持续展示
			})
			try {
				const localGender = this.localGender

				await updateUserProfile({
					gender: localGender,
				})
				//更新视图
				this.$emit('input', localGender)
				//关闭弹层
				this.$emit('close')
				//提示成功
				this.$toast.success('更新成功')
			} catch (err) {
				console.log(err)
	
          this.$toast.fail('更新失败')
        
				
			}
		},
     //选择器发生变化的时候
  onPickerChenge(picker,value,index){
    this.localGender=index
  }

  },
 
}

</script>

<style>

</style>