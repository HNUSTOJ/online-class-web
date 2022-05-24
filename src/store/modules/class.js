import requestProcess from "@/utils/request-process";
import {
    getClassAll,
    getClassList,
    getClassListInfo,
    getClassSearch,
    getClassSearchInfo, getCourseClass,
    postClassDelete, postClassDeleteStu, postClassEdit,
    postClassInsert, postClassMove
} from "@/api/index";

//state存储
const state = () => ({
    classList: [],
    total: 0,
    classStu: [],
    stuTotal: 0,
    classAll:[],
    inClass:0
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
    },
    inClass (state){
        return state.inClass
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
    },
    setInClass(state, data){
        if(data.code === 200){
            state.inClass = data.class_id
        }else{
            state.inClass = 0
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
    getInClass ({ commit }, data){
        return requestProcess(getCourseClass, data, res =>
            commit("setInClass", res)
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
    postClassDeleteStu ({ commit }, data){
        return requestProcess(postClassDeleteStu, data, ()=>{});
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
