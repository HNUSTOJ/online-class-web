import requestProcess from "@/utils/request-process";
import {
    getClassList, getFileResources, postFileDelete,
    postFileUploadOne
} from "@/api/index";

//state存储
const state = () => ({
    fileList:[],
    total:0
})

//state获取
const getters = {
    fileList(state){
        return state.fileList
    },
    total(state){
        return state.total
    }
}

//数据设置
const mutations = {
    setFileList(state,data){
        if(data.code === 200){
            state.fileList = data.data.list
            state.total = data.data.total
        }else{
            state.fileList = []
            state.total = 0
        }
    }
}

const actions = {
    getFileResources ({ commit }, data){
        return requestProcess(getFileResources, data, res =>
            commit("setFileList", res)
        );
    },
    postFileUploadOne ({ commit }, data){
        return requestProcess(postFileUploadOne, data, ()=>{});
    },
    postFileDelete ({ commit }, data){
        return requestProcess(postFileDelete, data, ()=>{});
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
