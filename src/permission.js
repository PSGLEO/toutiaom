import router from '@/router'
import store from '@/store'

//导航守卫
router.beforeEach((to,from,next)=>{
  //to 要去的路由地址信息
  //from 来自的路由地址信息
  //思路：判断要去的地址是否需要登录才可以访问
  //如果登录了 就放行
  //未登录 跳转


  //需要登录路由地址放在这个数组中
  let authList =['/user/profile']
  if(authList.includes(to.path)){
    //需要登录才可以进去
    //判断是否登录
    if(store.state.user){
      //登录了，放行
      next()
    }else{
      //未登录
      next('/login?url+to.path')
    }
  }else{
    next()
  }
})