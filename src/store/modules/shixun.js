import requestProcess from "@/utils/request-process";
import {
    getTrainingContestInfo,
    getTrainingContestList, getTrainingContestListEnd, getTrainingContestListIng,
    getTrainingEditInfo, getTrainingProblem,
    getTrainingProblemTitle, getTrainingSearchStatus, getTrainingSubmitLanguage,
    postTrainingCreate, postTrainingDelete,
    postTrainingEdit, postTrainingSubmit
} from "@/api/index";

//state存储
const state = () => ({
    contestList:[],
    problemTitle: [],
    total:0,
    editInfo:{},
    contestInfo:[],
    problem:{},
    problemStatus:[],
    problemStatusTotal:0,
    langmask:0
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
    },
    contestInfo(state){
        return state.contestInfo
    },
    problem(state){
        return state.problem
    },
    problemStatus(state){
        return state.problemStatus
    },
    problemStatusTotal(state){
        return state.problemStatusTotal;
    },
    langmask(state){
        return state.langmask
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
    },
    setContestInfo(state,data){
        if(data.code === 200){
            state.contestInfo = data.data.sort((a,b)=>a.num-b.num)
        }else{
            state.contestInfo = []
        }
    },
    setProblem(state,data){
        if(data.code===200){
            state.problem = data.data
        }else{
            state.problem = {}
        }
    },
    setProblemStatus(state,data){
        if(data.code===200){
            state.problemStatus = data.data.list
            state.problemStatusTotal = data.data.count
        }else{
            state.problemStatus = []
            state.problemStatusTotal = 0
        }
    },
    setLangMask(state,data){
        if(data.code===200){
            state.langmask = data.langmask
        }else{
            state.langmask = 0
        }
    }
}

const actions = {
    getTrainingContestList ({ commit }, data){
        return requestProcess(getTrainingContestList, data, res =>
            commit("setContestList", res)
        );
    },
    getTrainingContestListIng ({ commit }, data){
        return requestProcess(getTrainingContestListIng, data, res =>
            commit("setContestList", res)
        );
    },
    getTrainingContestListEnd ({ commit }, data){
        return requestProcess(getTrainingContestListEnd, data, res =>
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
    getTrainingContestInfo ({ commit }, data){
        return requestProcess(getTrainingContestInfo, data, res =>
            commit("setContestInfo", res)
        );
    },
    getTrainingProblem ({ commit }, data){
        return requestProcess(getTrainingProblem, data, res =>
            commit("setProblem", res)
        );
    },
    getTrainingSearchStatus ({ commit }, data){
        return requestProcess(getTrainingSearchStatus, data, res =>
            commit("setProblemStatus", res)
        );
    },
    getTrainingSubmitLanguage ({ commit }, data){
        return requestProcess(getTrainingSubmitLanguage, data, res =>
            commit("setLangMask", res)
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
    postTrainingSubmit ({ commit }, data){
        return requestProcess(postTrainingSubmit, data, ()=>{});
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
