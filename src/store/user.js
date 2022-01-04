import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqUserLogout } from "@/api";
import { getToken, removeToken, setToken } from "../utils/token";
const state = {
    code: '',//验证码
    token: getToken(),//token
    userInfo: {},//用户信息
}
const mutations = {
    //修改state中 code数据
    GETCODE(state, code) {
        state.code = code
    },
    //用户登录，修改state中的token数据
    USERLOGIN(state, token) {
        state.token = token
    },
//获取state中的用户信息
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //清除state所有数据
    ClEARALL(state) {
        // console.log(state);
        state.code=''
        state.userInfo = {}
        removeToken()
    }
}
const actions = {
    //验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        // console.log(result);
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    //注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }
    },
    //登录
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user)
        // console.log(result);
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            //持久化存储token,刷新后不数据不丢失
            setToken(result.data.token);
            return 'ok'
        } else {
            return Promise.reject(new Error('failure'))
        }

    },
    // 获取用户信息getUserInfo
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo()
        // console.log(result);
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } 
    },
    //退出登录
    async userLogout({ commit }) {
        let result = await reqUserLogout()
        console.log(result);
        if (result.code == 200) {
            commit('ClEARALL')
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
    getters,
}