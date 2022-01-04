import { reqGetCartList, reqDeleteCartBySkuId, reqUpdateCheckedBySkuId } from '@/api'

const state = {
    cartList: []
}
const actions = {
    async getCartList({ commit }) {
        const result = await reqGetCartList()
        //    console.log(result);
        if (result.code === 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    async deleteCartBySkuId({ commit }, skuId) {
        const result = await reqDeleteCartBySkuId(skuId)
        //    console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        const result = await reqUpdateCheckedBySkuId(skuId, isChecked)
        //    console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    deleteAllCheckedCart({ getters, dispatch }) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartBySkuId', item.skuId) : ''
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    },
    updateAllCheckedCart({dispatch,state},isChecked){
        // console.log(state.cartList[0].cartInfoList);
          // console.log(isChecked);
          let PromiseAll=[]
        state.cartList[0].cartInfoList.forEach((item)=>{
           let promise= dispatch('updateCheckedById',{isChecked,skuId:item.skuId})
           PromiseAll.push(promise)
        })
      return Promise.all(PromiseAll)
    }
  
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || []
    }

}
export default {
    state,
    actions,
    mutations,
    getters

}