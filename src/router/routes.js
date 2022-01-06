import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import Cart from "@/pages/Cart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder";

export default [

    {
        name: 'home',
        path: '/home',
        component: Home,
        meta: { show: true }
    },
    {
        name: 'search',
        path: '/search/:keyword?',//params需要占位
        component: Search,
        meta: { show: true },
        //函数写法的简化版本
        props: (route) => ({ keyword: route.params.keyword, k: route.query.k })

    },
    {
        name: 'detail',
        path: '/detail/:skuid',//params占位
        component: Detail,
        meta: { show: true }
    },
    {
        name: 'addCartSuccess',
        path: '/addCartSuccess',
        component: AddCartSuccess,
        meta: { show: true },
        beforeEnter(to, from, next) {
            // console.log(to,from);
            //获取要跳转路由的query参数
            const skuNum = to.query.skuNum
            //获取session中的字符串数据，并解析为对象
            const skuInfo = JSON.parse(sessionStorage.getItem('SKUINFO'))
            // console.log(skuNum, skuInfo);
            if (skuNum && skuInfo) {
                next()
            } else {
                next('/')
            }
        }
    },
    {
        name: 'cart',
        path: '/cart',
        component: Cart,
        meta: [{ show: true }]
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: [{ show: true }],
        //路由独享守卫
        beforeEnter: (to, from, next) => {
           if (from.path=='/cart') {
               next()
           }else{
               next('/cart')
           }
          }
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta: [{ show: true }]
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: [{ show: true }]
    },
    {
        // name: 'center',
        path: '/center',
        component: Center,
        // meta: [{ show: true }],
        children:[
            {
                path:'myorder',
                component:MyOrder,
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'',
                redirect:'myorder'
            }
        ]
    },

    {
        path: '/login',
        component: Login,
        meta: [{ show: false }]
    },
    {
        path: '/register',
        component: Register,
        meta: [{ show: false }]
    },
    //路由重定向
    {
        path: '*',
        redirect: '/home'
    }
]