import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
export default [
    {
        name:'detail',
        path: '/detail/:skuid',//params占位
        component: Detail,
        meta: { show: true }
    },
    {
        name:'home',
        path: '/home',
        component: Home,
        meta: { show: true }
    },
    {
        name: 'search',
        path: '/search/:keyword?',//params需要占位
        component: Search,
        meta: { show: true },
        //布尔值写法，只能传递params参数
        // props:true,
        //对象写法，额外传递一些props
        // props: {
        //     a: 1,
        //     b: 2
        // }
        //函数写法
        // props:(route)=>{
        //     return{
        //         keyword:route.params.keyword,
        //         k:route.query.k
        //     }
        // }
        //函数写法的简化版本
        props: (route) => ({ keyword: route.params.keyword, k: route.query.k })

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