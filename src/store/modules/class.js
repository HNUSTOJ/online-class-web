import requestProcess from "@/utils/request-process";
import {
    getClassAll,
    getClassList,
    getClassListInfo,
    getClassSearch,
    getClassSearchInfo,
    postClassDelete, postClassEdit,
    postClassInsert, postClassMove
} from "@/api/index";

//state存储
const state = () => ({
    classList: [],
    total: 0,
    classStu: [],
    stuTotal: 0,
    classAll:[],
})

//state获取
const getters = {
    classList (state){
        return state.classList
    },
    classTotal(state){
        return state.total
    },
    classStu (state){
        return state.classStu
    },
    stuTotal (state){
        return state.stuTotal
    },
    classAll (state){
        return state.classAll
    }
}

//数据设置
const mutations = {
    setClassList (state, data){
        if(data.code === 200){
            state.classList = data.data.list
            state.total = data.data.total
        }else{
            state.classList = []
            state.total = 0
        }
    },
    setClassStu (state, data){
        if(data.code === 200){
            state.classStu = data.data.list
            state.stuTotal = data.data.total
        }else{
            state.classStu = []
            state.stuTotal = 0
        }
    },
    setClassAll(state, data){
        if(data.code === 200){
            state.classAll = data.data
        }else{
            state.classAll = []
        }
    }
}

const actions = {
    getClassList ({ commit }, data){
        return requestProcess(getClassList, data, res =>
            commit("setClassList", res)
        );
    },
    getClassSearchInfo ({ commit }, data){
        return requestProcess(getClassSearchInfo, data, res =>
            commit("setClassStu", res)
        );
    },
    getClassSearch ({ commit }, data){
        return requestProcess(getClassSearch, data, res =>
            commit("setClassList", res)
        );
    },
    getClassStu ({ commit }, data){
        return requestProcess(getClassListInfo, data, res =>
            commit("setClassStu", res)
        );
    },
    getClassAll ({ commit }, data){
        return requestProcess(getClassAll, data, res =>
            commit("setClassAll", res)
        );
    },
    postClassInsert ({ commit }, data){
        return requestProcess(postClassInsert, data, ()=>{});
    },
    postClassDelete ({ commit }, data){
        return requestProcess(postClassDelete, data, ()=>{});
    },
    postClassEdit ({ commit }, data){
        return requestProcess(postClassEdit, data, ()=>{});
    },
    postClassMove ({ commit }, data){
        return requestProcess(postClassMove, data, ()=>{});
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
