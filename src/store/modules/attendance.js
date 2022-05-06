import requestProcess from "@/utils/request-process";
import {
    getAttendanceInfo,
    getAttendanceList,
    getAttendanceListHistory,
    getAttendanceListNow,
    getAttendanceStatistics, postAttendaceEdit,
    postAttendanceCreate, postAttendanceDel, postAttendanceSign,
} from "@/api/index";

//state存储
const state = () => ({
    attendanceList: [],
    total: 0,
    statisticList:[],
    historyNum:0,
    scheduleNum:0,
    truancyRate:0,
    attendanceInfoList:[],
    signedNum:0,
    signNum:0,
    startTime:'',
    endTime:'',
    userName:'',
    listNum:0,
})

//state获取
const getters = {
    attendanceList (state){
        return state.attendanceList
    },
    attendanceTotal(state){
        return state.total
    },
    statisticList (state){
        console.log(state.statisticList )
        return state.statisticList
    },
    historyNum (state){
        return state.historyNum
    },
    scheduleNum (state){
      return state.scheduleNum
    },
    truancyRate (state){
        return state.truancyRate
    },
    attendanceInfoList (state){
        return state.attendanceInfoList
    },
    signedNum (state){
        return state.signedNum
    },
    signNum (state){
        return state.signNum
    },
    startTime (state){
        return state.startTime
    },
    endTime (state){
        return state.endTime
    },
    userName (state){
        return state.userName
    },
    listNum (state){
     return state.listNum
    }
}

//数据设置
const mutations = {
    setAttendanceList (state, data){
        if(data.code === 200){
            state.attendanceList = data.data.list
            state.total = data.data.count
        }else{
            state.attendanceList = []
            state.total = 0
        }
    },
    setStatisticList(state,data){
        if(data.code === 200){
            state.statisticList = data.data.list
            state.historyNum = data.data.history_num
            state.scheduleNum = data.data.schedule_rate
            state.truancyRate = data.data.truancy_rate
        }else{
            state.statisticList = []
            state.historyNum = 0
            state.scheduleNum = 0
            state.truancyRate = 0
        }
    },
    setAttendanceInfoList(state,data){
        if(data.code === 200){
            state.attendanceInfoList = data.data.list
            state.signedNum = data.data.signed_num
            state.signNum = data.data.sign_num
            state.startTime = data.data.start_time
            state.endTime = data.data.end_time
            state.userName = data.data.user_name
            state.listNum = data.data.list_num
        }else{
            state.attendanceInfoList = []
            state.signedNum = data.data.signed_num
            state.signNum = data.data.sign_num
            state.startTime = data.data.start_time
            state.endTime = data.data.end_time
            state.userName = data.data.user_name
            state.listNum = 0
        }
    },
}

const actions = {
    getAttendanceList ({ commit }, data){
        return requestProcess(getAttendanceList, data, res =>
            commit("setAttendanceList", res)
        );
    },
    getIngList ({ commit }, data){
        return requestProcess(getAttendanceListNow, data, res =>
            commit("setAttendanceList", res)
        );
    },
    getHistoryList ({ commit }, data){
        return requestProcess(getAttendanceListHistory, data, res =>
            commit("setAttendanceList", res)
        );
    },
    getStatisticList ({ commit }, data){
        return requestProcess(getAttendanceStatistics, data, res =>
            commit("setStatisticList", res)
        );
    },
    getAttendanceInfoList ({ commit }, data){
        return requestProcess(getAttendanceInfo, data, res =>
            commit("setAttendanceInfoList", res)
        );
    },
    postAttendanceCreate ({ commit }, data){
        return requestProcess(postAttendanceCreate, data, ()=>{});
    },
    postAttendanceDel ({ commit }, data){
        return requestProcess(postAttendanceDel, data, ()=>{});
    },
    postAttendanceEdit ({ commit }, data){
        return requestProcess(postAttendaceEdit, data, ()=>{});
    },
    postAttendanceSign ({ commit }, data){
        return requestProcess(postAttendanceSign, data, ()=>{});
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
