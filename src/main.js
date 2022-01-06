import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store from './store';

import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import { Button,MessageBox} from 'element-ui';
import VueLazyload from 'vue-lazyload'//引入图片懒加载插件
import '@/mock/mockServer'//引入mock数据
import 'swiper/css/swiper.css'//引入swiper样式
import *  as API from '@/api'//统一引入所有请求 as别名
import atm from '@/assets/1.gif'//引入gif
import myPlugins from '@/plugins/myPlugins' //引入自定义插件
import '@/plugins/validate'//引入validata插件
Vue.use(myPlugins,{
  name:'upper'
})


Vue.config.productionTip = false
//注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
//注册element-ui
Vue.component(Button.name, Button);
//element-ui
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//注册懒加载插件
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: atm,
})

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this//安装全局事件总线
    Vue.prototype.$API = API
  },
  router,//注册路由信息 $router $route
  store,//注册store $store
}).$mount('#app')
