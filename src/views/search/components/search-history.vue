<template>
  <div class="search-history">
    <van-cell title="搜索历史">
     <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories')">全部删除&nbsp;</span>
        <span @click="isDeleteShow=false">完成</span>
     </div>
      <van-icon v-else name="delete" @click="isDeleteShow=true" />
    </van-cell>
    <van-cell 
      :title="text"
      v-for="(text,index) in searchHistories"
      :key="index"
      @click="onSearchItemClick(text,index)"
    >
      <van-icon name="close"  v-show="isDeleteShow"/>
    </van-cell>
    
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    //搜索历史，接收外部传入数据
    searchHistories:{
      type:Array,
      required:true
    }
  },
  data () {
    return {
      isDeleteShow:false  //控制删除状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearchItemClick(text,index){
      //如果是删除状态，则执行删除操作
      if(this.isDeleteShow){
        //删除历史记录
        this.searchHistories.splice(index,1)
      }else{
        //执行搜索操作
        this.$emit('search',text)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>