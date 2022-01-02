//search 模块
import { reqGetSearchInfo } from "@/api";

const actions = {
    //获取search模块的数据
    async getSearchList({ commit }, searchParams) {
        let result = await reqGetSearchInfo(searchParams)
        // console.log(result);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    },
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        // console.log(list);
        state.searchList = searchList
    },
}
const state = {
    searchList: {},
}
//计算属性 简化state中数据
const getters = {
   
    goodsList(state) {
        return state.searchList.goodsList
    },
    attrsList(state) {
        return state.searchList.attrsList
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
   
}
export default {
    
    actions, mutations, state, getters
}