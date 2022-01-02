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
export const reqGetCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' })
//轮播图接口mock
export const reqGetBannersList = () => mockRequest({ url: '/banners', method: 'get' })
//floors接口mock
export const reqGetFloorsList = () => mockRequest({ url: '/floors', method: 'get' })
//搜索接口      /api/list   post    需要参数
// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//   }
export const reqGetSearchInfo = (params) => request({
    url: '/list',
    method: 'post',
    data:params
})
export const reqGetGoodsInfo = (skuId) => request({
    url: `/item/${skuId}`,
    method: 'get',
})

