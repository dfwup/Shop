//api接口的统一管理
import request from './request'
import mockRequest from './mockRequest'



//三级联动接口
//  /api/product/getBaseCategoryList    get     无参数
// export const reqCategoryList = () => {
//     // 返回Promise对象
//     return request({ url: '/product/getBaseCategoryList', method: 'get' })
// }
//三级联动接口
export const reqGetCategoryList = () => request({
    url: '/product/getBaseCategoryList',
    method: 'get'
})
//轮播图接口mock
export const reqGetBannersList = () => mockRequest({ url: '/banners', method: 'get' })
//floors接口mock
export const reqGetFloorsList = () => mockRequest({
    url: '/floors',
    method: 'get'
})
//搜索接口      /api/list   post    需要参数
export const reqGetSearchInfo = (params) => request({
    url: '/list',
    method: 'post',
    data: params
})
export const reqGetGoodsInfo = (skuId) => request({
    url: `/item/${skuId}`,
    method: 'get',
})
//将产品添加到购物车中（更新）
export const reqAddOrUpdateCart = (skuId, skuNum) => request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
})
//获取购物车数据
export const reqGetCartList = () => request({
    url: '/cart/cartList',
    method: 'get',
})
//删除购物车商品
export const reqDeleteCartBySkuId = (skuId) => request({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete',
})
//切换商品选择状态/api/cart/checkCart/{skuID}/{isChecked}   get
export const reqUpdateCheckedBySkuId = (skuId, isChecked) => request({
    url: `/cart/checkCart/${skuId}/${isChecked} `,
    method: 'get',
})


//获取验证码接口/api/user/passport/sendCode/{phone}----文档上的接口失效了
export const reqGetCode = (phone) => request({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

//注册接口/api/user/passport/register   post    phone,password,code
export const reqUserRegister = (data) => request({
    url: '/user/passport/register',
    method: 'post',
    data,
})
//登录接口/api/user/passport/login  post    phone,password
export const reqUserLogin = (data) => request({
    url: '/user/passport/login',
    method: 'post',
    data
})
//获取用户信息，（请求头） get  token校验接口 /api/user/passport/auth/getUserInfo
export const reqGetUserInfo = () => request({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})
//退出登录  /api/user/passport/logout   get 无参数
export const reqUserLogout = () => request({
    url: 'user/passport/logout',
    method: 'get'
})

// 获取用户地址信息   /api/user/userAddress/auth/findUserAddressList   get 无参数
export const reqGetAddressInfo = () => request({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})
//获取订单交易页信息 /api/order/auth/trade  get 无参数
export const reqGetTradeInfo = () => request({
    url: '/order/auth/trade',
    method: 'get'
})

//提交订单接口  /api/order/auth/submitOrder?tradeNo={tradeNo}   post    有参数
//练习不使用vuex
export const reqSubmitOrder=(tradeNo,data)=>request({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data
})