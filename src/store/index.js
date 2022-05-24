import Vue from 'vue'
import Vuex from 'vuex'
import course from './modules/course'
import classStore from './modules/class'
import attendanceStore from './modules/attendance'
import loginStore from './modules/login'
import shixunStore from './modules/shixun'
import fileStore from './modules/file'
import commonStore from './modules/common'
import videoStore from './modules/video'

Vue.use(Vuex)

const state = {
    idAdmin: true,
    isTeacher: true,
    isStu: false,
}

export default new Vuex.Store({
    state,
    modules: {
        course,
        classStore,
        attendanceStore,
        loginStore,
        shixunStore,
        fileStore,
        commonStore,
        videoStore
    }
})
