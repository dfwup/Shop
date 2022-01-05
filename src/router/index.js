import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes'

import store from '@/store'
Vue.use(VueRouter)

// console.log(VueRouter.prototype.push);
//重写push和replace方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}



// 配置路由
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
//全局前置路由守卫
router.beforeEach(async(to, from, next) => {
    let token = store.state.user.token
    let name=store.state.user.userInfo.name
    //token判断用户是否已经登录
    if (token) {
        if (to.path == '/login'||to.path=='/register') {
            next('/home')
        }else{
            //name判断是否有用户信息
            if (name) {
                next()
            } else {
              try {
                  //获取用户信息之后再放行
                await store.dispatch('getUserInfo')
                next()
              } catch (error) {
                  //token过期，清除相关信息
                  await store.dispatch('userLogout')
                  next('/login')
              }
            }
        }
    }else{
        //未登录
        next()
    }
})


export default router
