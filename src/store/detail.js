import { reqGetGoodsInfo } from '@/api'
const state = {
    goodsInfo: {}
}
const mutations = {

    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }

}
const actions = {
    //获取detail模块的数据
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGetGoodsInfo(skuId)
        // console.log(result);
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
}
const getters = {
    //路径导航
    categoryView(state) {
        return state.goodsInfo.categoryView||{}
    }, 
    //产品信息
    skuInfo(state) {
        return state.goodsInfo.skuInfo||{}
    }, 
   //产品售卖属性
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList
    }, 
   
}
export default {
    state,
    mutations,
    actions,
    getters
}