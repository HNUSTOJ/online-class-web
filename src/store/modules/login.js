import requestProcess from "@/utils/request-process";
import {postLogin} from "@/api";

//state存储
const state = () => ({
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    username: localStorage.getItem('username'),
    isLogin: !!localStorage.getItem('token'),
    role:{isTeacher:'1', isStu:'0'||''||null},
    permissions:localStorage.getItem('permissions'),
    loginDialog: false,
})

//state获取
const getters = {
    token(state){
        return state.token
    },
    username(state){
        return state.username
    },
    isLogin(state){
        return state.isLogin
    },
    role(state){
        return state.role
    },
    permissions(state){
        return state.permissions
    },
    loginDialog(state){
        return state.loginDialog
    }
}

//数据设置
const mutations = {
    //变更token
    changeLogin(state,data){
        if(data.code === 200){
            state.token = data.data.token
            state.username = data.data.name
            state.permissions = data.data.permissions
            localStorage.setItem('token',data.data.token)
            localStorage.setItem('username',data.data.name)
            localStorage.setItem('permissions',data.data.permissions)
        }
    },
    triggerLogin(state){
        state.loginDialog = !state.loginDialog
    }
}

const actions = {
    postLogin ({ commit }, data){
        return requestProcess(postLogin, data, res =>
            commit("changeLogin", res)
        );
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
