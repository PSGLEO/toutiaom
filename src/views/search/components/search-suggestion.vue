<template>
  <div class="search-suggestion">
    <van-cell 
 
    icon="search"
    v-for="(text,index) in suggestions"
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
    searchText:{
      type:String,
      required:true
    }
  },
  data () {
    return {
      suggestions:[],  //联想建议数据列表  
    }
  },
  computed: {},
  watch: {
    searchText:{
      //当searchText 发生改变的时候就会调用 handler 函数
      //注意：handler 函数名称是固定的
      // handler(value){
      //   console.log(value);
      //   this.loadSearchSuggestions(value)
      // },
      handler:debounce(function(value){
        console.log(value);
        this.loadSearchSuggestions(value)
      },300),
      immediate:true  //该回调将会在侦听开始之后被立即调用
    }
  },
  created () {},
  mounted () {},
  methods: {
    //定义获取数据方法
    async loadSearchSuggestions(q){
      try{
        const {data} =await getSearchSuggestions(q)
        this.suggestions=data.data.options
      }catch(err){
        console.log(err);
        this.$toast('数据获取失败，请稍后重试')
      }
    },
      highlight(text){
    const highlightStr=`<span style="color:yellow">${this.searchText}</span>`

    const reg=new RegExp(this.searchText,'gi')
    return text.replace(reg,highlightStr)
  }
  },

}
</script>

<style scoped lang="less"></style>
