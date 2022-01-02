//home模块的store
import { reqGetCategoryList, reqGetBannersList, reqGetFloorsList } from '@/api'

const actions = {
    async getCategoryList({ commit }) {
        const result = await reqGetCategoryList()
        //    console.log(result);
        if (result.code === 200) {
            commit('GETCATEGORYLIST', result.data)
        }
    },
    //获取轮播图数据
    async getBannersList({ commit }) {
        const result = await reqGetBannersList()
        // console.log(result);
        if (result.code === 200) {
            commit('BANNERSLIST', result.data)
        }
    },
    //获取floor数据
    async getFloorsList({ commit }) {
        const result = await reqGetFloorsList()
        // console.log(result);
        if (result.code === 200) {
            commit('FLOORSLIST', result.data)
        }
    },
}
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        // console.log(state, categoryList);
        state.categoryList = categoryList.slice(0, 16)//服务器返回数据不符合要求，截取
    },
    BANNERSLIST(state, bannersList) {
        // console.log(state, list);
        state.bannersList = bannersList
    },
    FLOORSLIST(state, floorsList) {
        // console.log(state, list);
        state.floorsList = floorsList
    },

}
const state = {
    categoryList: [],
    bannersList: [],
    floorsList: [],


}
const getters = {

}
export default {
    actions,
    mutations,
    state,
    getters,
}