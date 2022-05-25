import requestProcess from "@/utils/request-process";
import {
    getAdminList,
    getVideoList, postAdminEdit, postFileDelete,
} from "@/api/index";

//state存储
const state = () => ({
    userList:[],
    total:0
})

//state获取
const getters = {
    userList (state){
        return state.userList
    },
    total(state){
        return state.total
    }
}

//数据设置
const mutations = {
    setUserList(state,data){
        if(data.code===200){
            state.userList = data.data.list
            state.total = data.data.count
        }else{
            state.userList = []
            state.total = 0
        }
    }
}

const actions = {
    getAdminList ({ commit }, data){
        return requestProcess(getAdminList, data, res =>
            commit("setUserList", res)
        );
    },
    postAdminEdit ({ commit }, data){
        return requestProcess(postAdminEdit, data, ()=>{});
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
