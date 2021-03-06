import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入导航守卫代码
import './permission'

//加载全局样式
import './styles/index.less'
//引入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

//加载动态设置的REM基准值
import 'amfe-flexible'

//加载dayjs
import './utils/dayjs'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
