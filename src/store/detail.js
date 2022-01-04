import { reqGetGoodsInfo, reqAddOrUpdateCart } from '@/api'
import { getUUID } from "@/utils/uuid_token.js";
const state = {
    goodsInfo: {},
    uuid_token:getUUID()
}
const mutations = {
    //获取产品信息
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

    //产品添加到购物车
    //服务器只返回code==200,没有返回其他数据，不需要mutations存储
    async addOrUpdateCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateCart(skuId, skuNum)
        // console.log(result)
        if (result.code == 200) {
            //返回成功的标记
            return 'ok'
        } else {
            //返回失败的标记
            return Promise.reject(new Error('failure'))
        }

    }
}
const getters = {
    //路径导航
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    //产品信息
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
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