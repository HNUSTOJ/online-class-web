import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/course',
    name: '首页',
    component: () => import('../views/Course'),
    children: [
      {
        path: '/',
        name: '班级管理',
        component: () => import('../views/class/Class'),
      },
      {
        path: '/class_stu',//////////////////////////
        name: '班级管理',
        component: () => import('../views/class/Class-stu')
      },
      {
        path: '/class_detail',
        name: '班级管理-详细信息',
        component: () => import('../views/class/Class-detail')
      },
      {
        path: '/class_stu/detail',
        name: '班级管理-详细信息',
        component: () => import('../views/class/Class-stu-detail')
      },
      {
        path: '/shixun_homework',
        name: '实训作业',
        component: () => import('../views/shixun_homework/shixun-homework')
      },
      {
        path: '/shixun_homework_stu',/////////////////////////////
        name: '实训作业',
        component: () => import('../views/shixun_homework/shixun-homework-stu')
      },
      {
        path: '/shixun_homework/add',
        name: '实训作业-添加',
        component: () => import('../views/shixun_homework/shixun-homework-add'),
      },
      {
        path: '/shixun_homework/detail',
        name: '实训作业-详细',
        component: () => import('../views/shixun_homework/shixun-homework-detail'),
      },
      {
        path: '/shixun_homework_stu/detail',//////////////////////////////////
        name: '实训作业-详细',
        component: () => import('../views/shixun_homework/shixun-homework-stuDetail'),
      },
      {
        path: '/common_homework',
        name: '普通作业',
        component: () => import('../views/common_homework/common-homework')
      },
      {
        path: '/common_homework_stu',/////////////////////////
        name: '普通作业',
        component: () => import('../views/common_homework/common-homework-stu')
      },
      {
        path: '/common_homework/detail',
        name: '普通作业-详细',
        component: () => import('../views/common_homework/common-homework-detail'),
      },
      {
        path: '/common_homework_stu/detail',////////////////////////////
        name: '普通作业-详细',
        component: () => import('../views/common_homework/common-homework-stuDetail'),
      },
      {
        path: '/common_homework/add',
        name: '普通作业-添加',
        component: () => import('../views/common_homework/common-homework-add'),
      },
      {
        path: '/attendance',
        name: '签到',
        component: () => import('../views/attendance/Attendance')
      },
      {
        path: '/attendance_stu',////////////////////////////////////
        name: '签到',
        component: () => import('../views/attendance/Attendance-stu')
      },
      {
        path: '/attendance/detail',
        name: '签到-详情',
        component: () => import('../views/attendance/Attendance-detail')
      },
      {
        path: '/data',
        name: '竞赛代码',
        component: () => import('../views/Data/Data')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login')
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import('../components/Info')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称

  // // 未找到路由的情况
  // if (!to.matched.length) {
  //   const storeMenus = localStorage.getItem("menus")
  //   if (storeMenus) {
  //     next("/404")
  //   } else {
  //     // 跳回登录页面
  //     next("/login")
  //   }
  // }

  // 其他的情况都放行
  next()

})

export default router
