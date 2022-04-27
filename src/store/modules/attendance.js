import requestProcess from "@/utils/request-process";
import {
    getAttendanceList,
    getAttendanceListHistory,
    getAttendanceListNow,
    getAttendanceStatistics,
    postAttendanceCreate
} from "@/api/index";

//state存储
const state = () => ({
    attendanceList: [],
    total: 0,
    ingList:[],
    ingTotal:0,
    historyList:[],
    historyTotal:0,
    statisticList:[],
    historyNum:0,
    scheduleNum:0,
    truancyRate:0,
})

//state获取
const getters = {
    attendanceList (state){
        return state.attendanceList
    },
    attendanceTotal(state){
        return state.total
    },
    ingList (state){
      return state.ingList
    },
    ingTotal (state){
        return state.ingTotal
    },
    historyList (state){
      return state.historyList
    },
    historyTotal (state){
        return state.historyTotal
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
    }
}

//数据设置
const mutations = {
    setAttendanceList (state, data){
        state.attendanceList = data.list
        state.total = data.count
    },
    setIngList (state, data){
        state.ingList = data.list
        state.ingTotal = data.count
    },
    setHistoryList(state,data){
        state.historyList = data.list
        state.historyTotal = data.count
    },
    setStatisticList(state,data){
        state.statisticList = data.list
        state.historyNum = data.history_num
        state.scheduleNum = data.schedule_rate
        state.truancyRate = data.truancy_rate
    }
}

const actions = {
    getAttendanceList ({ commit }, data){
        return requestProcess(getAttendanceList, data, res =>
            commit("setAttendanceList", res.data)
        );
    },
    getIngList ({ commit }, data){
        return requestProcess(getAttendanceListNow, data, res =>
            commit("setIngList", res.data)
        );
    },
    getHistoryList ({ commit }, data){
        return requestProcess(getAttendanceListHistory, data, res =>
            commit("setHistoryList", res.data)
        );
    },
    getStatisticList ({ commit }, data){
        return requestProcess(getAttendanceStatistics, data, res =>
            commit("setStatisticList", res.data)
        );
    },
    postAttendanceCreate ({ commit }, data){
        return requestProcess(postAttendanceCreate, data, ()=>{});
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
