// import request from "@/utils/request";
//
// const store = {
//     namespaced: true,
//     state: {
//         list: [],
//         total: 0
//     },
//     getters: {
//         list: state => state.list,
//         sum: state => state.sum,
//         total: state => state.total
//     },
//     mutations: {
//         find(state, type){
//             request.get(type).then(res=>{
//                 state.list = res.data.list
//                 state.total = res.data.total
//             })
//         }
//     }
// }
// export default store

import requestProcess from "@/utils/request-process";
import {getCourseAll, getIndexSearch, postCourseDelete, postCourseJoin} from "@/api/index";
import { getCourseIngAll } from "@/api/index";
import { getCourseEndAll } from "@/api/index";
import { getCourseManagementAll } from "@/api/index";
import { getCourseManagementIng } from "@/api/index";
import { getCourseManagementEnd } from "@/api/index";
import { getCourseStudyAll } from "@/api/index";
import { getCourseStudyIng } from "@/api/index";
import { getCourseStudyEnd } from "@/api/index";
import { postCourseInsert } from "@/api/index";

//state存儲
const state = () => ({
    courseList: [],
    total: 0,
})

//state获取
const getters = {
    courseList (state){
        return state.courseList
    },
    courseTotal(state){
        return state.total
    }
}

//数据设置
const mutations = {
    setCourse (state, data){
        if(data.code === 200){
            state.courseList = data.data.list
            state.total = data.data.count
        }else{
            state.courseList = []
            state.total = 0
        }
    },
}

const actions = {
    getCourseAll ({ commit }, data){
        return requestProcess(getCourseAll, data, res =>
            commit("setCourse", res)
        );
    },
    getCourseIngAll ({ commit }, data){
        return requestProcess(getCourseIngAll, data, res =>
            commit("setCourse", res)
        );
    },
    getCourseEndAll ({ commit }, data){
        return requestProcess(getCourseEndAll, data, res =>
            commit("setCourse", res),
        );
    },
    getCourseManagementAll ({ commit }, data){
        return requestProcess(getCourseManagementAll, data, res =>
            commit("setCourse", res)
        );
    },
    getCourseManagementIng ({ commit }, data){
        return requestProcess(getCourseManagementIng, data, res =>
            commit("setCourse", res) );
    },
    getCourseManagementEnd ({ commit }, data){
        return requestProcess(getCourseManagementEnd, data, res =>
            commit("setCourse", res)
        );
    },
    getCourseStudyAll ({ commit }, data){
        return requestProcess(getCourseStudyAll, data, res =>
            commit("setCourse", res)
        );
    },
    getCourseStudyIng ({ commit }, data){
        return requestProcess(getCourseStudyIng, data, res =>
            commit("setCourse", res)
        );
    },
    getCourseStudyEnd ({ commit }, data){
        return requestProcess(getCourseStudyEnd, data, res =>
            commit("setCourse", res)
        );
    },
    postCourseInsert({ commit }, data){
        return requestProcess(postCourseInsert, data, ()=>{});
    },
    postCourseJoin({ commit }, data){
        return requestProcess(postCourseJoin, data, ()=>{});
    },
    getIndexSearch ({ commit }, data){
        return requestProcess(getIndexSearch, data, res =>
            commit("setCourse", res)
        );
    },
    postCourseDelete({ commit }, data){
        return requestProcess(postCourseDelete, data, ()=>{});
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
