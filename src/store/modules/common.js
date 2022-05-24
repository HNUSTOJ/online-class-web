import requestProcess from "@/utils/request-process";
import {
    getCommonClass,
    getCommonInfo,
    getCommonList, getCommonSubmitInfo, getFileDownload, getFileDownloadJob,
    postCommonCreate, postCommonDelete, postCommonEdit, postCommonUpload
} from "@/api/index";

//state存储
const state = () => ({
    commonList:[],
    commonTotal:0,
    submitList:[],
    submitTotal:0,
    commonClass:[],
    commonClassId:[],
    jobContent:'',
    fileList:[],

})

//state获取
const getters = {
    commonList (state){
        return state.commonList
    },
    commonTotal (state){
        return state.commonTotal
    },
    submitList(state){
        return state.submitList
    },
    submitTotal(state){
        return state.submitTotal
    },
    commonClass(state){
        return state.commonClass
    },
    commonClassId(state){
      return state.commonClassId
    },
    jobContent(state){
        return state.jobContent
    },
    fileList(state){
        return state.fileList
    }
}

//数据设置
const mutations = {
    setCommonList (state, data){
        if(data.code === 200){
            state.commonList = data.data.list
            state.commonTotal = data.data.count
        }else{
            state.commonList = []
            state.commonTotal = 0
        }
    },
    setSubmitList (state,data){
      if(data.code === 200){
          state.submitList = data.data.list
          state.submitTotal = data.data.count
      }else{
          state.submitList = []
          state.submitTotal = 0
      }
    },
    setCommonClass (state,data){
        if(data.code === 200){
            state.commonClass = data.data
            data.data.forEach(function (item,index){
                state.commonClassId[index] = item.class_id
            })
        }else{
            state.commonClass = []
            state.commonClassId = []
        }
    },
    setJobContent(state,data){
        if(data.code===200){
            state.jobContent = data.data.job_content
            state.fileList = data.data.list
        }else{
            state.jobContent = ''
            state.fileList = []
        }
    },
}

const actions = {
    getCommonList ({ commit }, data){
        return requestProcess(getCommonList, data, res =>
            commit("setCommonList", res)
        );
    },
    getCommonInfo ({ commit }, data){
        return requestProcess(getCommonInfo, data, res =>
            commit("setJobContent", res)
        );
    },
    getCommonSubmitInfo ({ commit }, data){
        return requestProcess(getCommonSubmitInfo, data, res =>
            commit("setSubmitList", res)
        );
    },
    getCommonClass ({ commit }, data){
        return requestProcess(getCommonClass, data, res =>
            commit("setCommonClass", res)
        );
    },
    getFileDownloadJob ({ commit }, data){
        return requestProcess(getFileDownloadJob, data, ()=>{});
    },
    postCommonCreate ({ commit }, data){
        return requestProcess(postCommonCreate, data, ()=>{});
    },
    postCommonEdit ({ commit }, data){
        return requestProcess(postCommonEdit, data, ()=>{});
    },
    postCommonDelete ({ commit }, data){
        return requestProcess(postCommonDelete, data, ()=>{});
    },
    postCommonUpload ({ commit }, data){
        return requestProcess(postCommonUpload, data, ()=>{});
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
