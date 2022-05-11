import requestProcess from "@/utils/request-process";
import {
    getTrainingContestList,
    getTrainingEditInfo,
    getTrainingProblemTitle,
    postTrainingCreate, postTrainingDelete,
    postTrainingEdit
} from "@/api/index";

//state存储
const state = () => ({
    contestList:[],
    problemTitle: [],
    total:0,
    editInfo:{}
})

//state获取
const getters = {
    problemTitle (state){
        return state.problemTitle
    },
    contestList (state){
        return state.contestList
    },
    total (state){
        return state.total
    },
    editInfo (state){
        return state.editInfo
    }
}

//数据设置
const mutations = {
    setProblemTitle (state, data){
        if(data.code === 200 || data.data !== null){
            state.problemTitle = data.data
        }else{
            state.problemTitle = []
        }
    },
    setContestList (state, data){
        if(data.code === 200){
            state.contestList = data.data.list
            state.total = data.data.count
        }else{
            state.contestList = []
            state.total = 0
        }
    },
    setEditInfo (state,data){
        if(data.code === 200){
            state.editInfo = data.data
            localStorage.setItem('editDes',data.data.description)
        }else{
            state.editInfo = {}
        }
    }
}

const actions = {
    getTrainingContestList ({ commit }, data){
        return requestProcess(getTrainingContestList, data, res =>
            commit("setContestList", res)
        );
    },
    getProblemTitle ({ commit }, data){
        return requestProcess(getTrainingProblemTitle, data, res =>
            commit("setProblemTitle", res)
        );
    },
    getTrainingEditInfo ({ commit }, data){
        return requestProcess(getTrainingEditInfo, data, res =>
            commit("setEditInfo", res)
        );
    },
    postTrainingCreate ({ commit }, data){
        return requestProcess(postTrainingCreate, data, ()=>{});
    },
    postTrainingEdit ({ commit }, data){
        return requestProcess(postTrainingEdit, data, ()=>{});
    },
    postTrainingDelete ({ commit }, data){
        return requestProcess(postTrainingDelete, data, ()=>{});
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
