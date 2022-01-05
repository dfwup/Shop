import { reqGetAddressInfo, reqGetTradeInfo } from '@/api'
const state = {
    address: [],
    orderInfo:{}
}
const mutations = {
    //修改state中的数据
    GETADDRESSINFO(state, address) {
        state.address = address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo
    }
}
const actions = {
    //获取用户地址
    async getAddressInfo({ commit }) {
        let result = await reqGetAddressInfo()
        //   console.log(result);
        if (result.code == 200) {
            commit('GETADDRESSINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    //获取订单交易页信息
    async getOrderInfo({commit}) {
        let result = await reqGetTradeInfo()
        // console.log(result);
       if (result.code==200) {
        commit('GETORDERINFO',result.data)
        return 'ok'
       }else{
           return Promise.reject(new Error('failure'))
       }
    }
}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}