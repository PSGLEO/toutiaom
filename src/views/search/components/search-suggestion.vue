<template>
	<div class="search-suggestion">
		<van-cell
			:title="text"
			icon="search"
			v-for="(text, index) in suggestions"
			:key="index"
      @click="$emit('search',text)"
		>
    <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
	</div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import {debounce} from 'lodash'
export default {
	name: 'SearchSuggestion',
	components: {},
	props: {
		//接收输入框数据
		searchText: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			suggestions: [], //联想建议数据列表
		}
	},
	computed: {},
	watch: {
		searchText: {
			//当serarchText发生改变的时候就会调用handler函数
			//注意：handler函数名称是固定不变的
			// handler(value) {
			// 	console.log(value)
			// 	this.loadSearchSuggestions(value)
			// },

      //debounce 函数
      //参数1：一个函数
      //参数2：延迟时间，单位毫秒
      //返回值：防抖之后的函数
      handler:debounce(function (value){
        console.log(value);
        this.loadSearchSuggestions(value)
      },300),
			immediate: true, //该回调将会在侦听开始之后被立即调用，第一次输入也会被调用
		},
	},
	created() {},
	mounted() {},
	methods: {
		//定义获取数据的方法
		async loadSearchSuggestions(q) {
			try {
				const { data } = await getSearchSuggestions(q)
				this.suggestions = data.data.options
			} catch (err) {
        console.log(err);
				this.$toast('数据获取失败，请稍后重试')
			}
		},
    highlight(text){
      const highlightStr=`<span style="color:red">${this.searchText}</span>`

      //正则表达式--RegExp 正则表达式构造函数
      const reg=new RegExp(this.searchText,'gi')
      return text.replace(reg,highlightStr)
    }
	},
}
</script>

<style scoped lang="less"></style>
