import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store from './store';

import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import '@/mock/mockServer'//引入mock数据
import 'swiper/css/swiper.css'//引入swiper样式


Vue.config.productionTip = false
//注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)


new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this//安装全局事件总线
  },
  router,//注册路由信息 $router $route
  store,//注册store $store
}).$mount('#app')
