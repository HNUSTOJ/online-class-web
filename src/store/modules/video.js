import requestProcess from "@/utils/request-process";
import {
    getVideoList,
} from "@/api/index";

//state存储
const state = () => ({
    videoList:[],
    videoTotal:0
})

//state获取
const getters = {
    videoList (state){
        return state.videoList
    },
    videoTotal(state){
        return state.videoTotal
    }
}

//数据设置
const mutations = {
    setVideoList(state,data){
        if(data.code===200){
            state.videoList = data.data.list
            state.videoTotal = data.data.total
        }else{
            state.videoList = []
            state.videoTotal = 0
        }
    }
}

const actions = {
    getVideoList ({ commit }, data){
        return requestProcess(getVideoList, data, res =>
            commit("setVideoList", res)
        );
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
