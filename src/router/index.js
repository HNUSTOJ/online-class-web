import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject){
//     return originalPush.call(this, location, onResolve, onReject)
//   }
//   return originalPush.call(this, location).catch(err => err)
// }


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/course/:courseId',
    name: 'course',
    component: () => import('../views/Course'),
    children: [
      {
        path: 'class',
        name: 'class',
        component: () => import('../views/class/Class'),
        meta:{title:'班级管理',activeMenu:'/class'}
      },
      {
        path: 'class/:classId',
        name: 'classInfo',
        component: () => import('../views/class/Class-info'),
        meta:{title:'班级管理-详细信息',activeMenu:'/class'}
      },
      {
        path: 'attendance',
        component: () => import('../views/attendance/Attendance'),
        meta:{title:'签到'},
        children: [
          {
            path: '/',
            name: 'all',
            component: () => import('../views/attendance/Attendance-list'),
            meta:{title:'签到',activeMenu:'/attendance'},
          },
          {
            path: 'ing',
            name: 'ing',
            component: () => import('../views/attendance/Attendance-ing'),
            meta:{title:'签到',activeMenu:'/attendance'},
          },
          {
            path: 'history',
            name: 'history',
            component: () => import('../views/attendance/Attendance-history'),
            meta:{title:'签到',activeMenu:'/attendance'},
          },
          {
            path: 'statistics',
            name: 'statistics',
            component: () => import('../views/attendance/AttendanceStatistics'),
            meta:{title:'签到',activeMenu:'/attendance'},
          }
        ]
      },
      {
        path: 'attendance/:aid',
        name: 'attendanceInfo',
        component: () => import('../views/attendance/Attendance-info'),
        meta:{title:'签到-详细信息',activeMenu:'/attendance'}
      },
      {
        path: 'shixun_homework',
        name: 'shixun-homework-list',
        component: () => import('../views/shixun_homework/shixun-homework-list'),
        meta:{title:'实训作业',activeMenu:'/shixun_homework'}
      },
      {
        path: 'shixun_homework/add',
        name: 'shixun-homework-add',
        component: () => import('../views/shixun_homework/shixun-homework-add'),
        meta:{title:'实训作业-添加',activeMenu:'/shixun_homework'}
      },
      {
        path: 'shixun_homeworks/:contestId',
        component: () => import('../views/shixun_homework/shixun-homework'),
        children:[
          {
            path: '',
            name: 'shixun-homework-info',
            component: () => import('../views/shixun_homework/shixun-homework-info'),
            meta:{title:'实训作业-详细',activeMenu:'/shixun_homework'}
          },
          {
            path: 'status',
            name: 'shixun-homework-status',
            component: () => import('../views/shixun_homework/shixun-homework-status'),
            meta:{title:'实训作业-提交状态',activeMenu:'/shixun_homework'}
          },
          {
            path: 'standing',
            name: 'shixun-homework-standing',
            component: () => import('../views/shixun_homework/shixun-homework-standing'),
            meta:{title:'实训作业-统计',activeMenu:'/shixun_homework'}
          },
          {
            path: 'edit',
            name: 'shixun-homework-edit',
            component: () => import('../views/shixun_homework/shixun-homework-edit'),
            meta:{title:'实训作业-编辑',activeMenu:'/shixun_homework'}
          },
          {
            path: 'problem/:problemId',
            name: 'shixun-homework-problem',
            component: () => import('../views/shixun_homework/shixun-homework-problem'),
            meta:{title:'实训作业-问题',activeMenu:'/shixun_homework'}
          },
          {
            path: 'problem/submit',
            name: 'shixun-homework-submit',
            component: () => import('../views/shixun_homework/shixun-homework-submit'),
            meta:{title:'实训作业-提交',activeMenu:'/shixun_homework'}
          }
        ]
      },

      {
        path: 'common_homework',
        name: 'common_homework',
        component: () => import('../views/common_homework/common-homework'),
        meta:{title:'普通作业',activeMenu:'/common_homework'}
      },
      {
        path: 'common_homework/add',
        name: 'common-homework-add',
        component: () => import('../views/common_homework/common-homework-add'),
        meta:{title:'普通作业-添加',activeMenu:'/common_homework'}
      },
      {
        path: 'common_homeworks/:commonId',
        name: 'common-homework-info',
        component: () => import('../views/common_homework/common-homework-detail'),
        meta:{title:'普通作业-详情',activeMenu:'/common_homework'},
      },
      {
        path: 'class_stu',////////////////////////////////////////////////////////////////////////////////////
        name: 'class-stu',
        component: () => import('../views/stu/class/Class-stu'),
        meta:{title:'班级管理',activeMenu:'/class_stu'}
      },
      {
        path: 'class_stu/:classId',
        name: 'class-stu-info',
        component: () => import('../views/stu/class/Class-stu-info'),
        meta:{title:'班级管理-详细信息',activeMenu:'/class_stu'}
      },
      {
        path: 'attendance_stu',
        component: () => import('../views/stu/attendance/Attendance-stu'),
        meta:{title:'签到'},
        children: [
          {
            path: '/',
            name: 'all-stu',
            component:() => import('../views/stu/attendance/all-stu'),
            meta:{title:'签到',activeMenu:'/attendance_stu'},
          },
          {
            path: 'ing',
            name: 'ing-stu',
            component:() => import('../views/stu/attendance/ing-stu'),
            meta:{title:'签到',activeMenu:'/attendance_stu'},
          },
          {
            path: 'history',
            name: 'history-stu',
            component:() => import('../views/stu/attendance/histoty-stu'),
            meta:{title:'签到',activeMenu:'/attendance_stu'},
          }
        ]
      },
      {
        path: 'shixun_homework_stu',
        component: () => import('../views/stu/shixun_homework/shixun-homework-stu'),
        children: [
          {
            path: '/',
            name: 'shixun-all',
            component: () => import('../views/stu/shixun_homework/all'),
            meta:{title:'实训作业',activeMenu:'/shixun_homework_stu'},
          },
          {
            path: 'ing',
            name: 'shixun-ing',
            component: () => import('../views/stu/shixun_homework/ing'),
            meta:{title:'实训作业',activeMenu:'/shixun_homework_stu'},
          },
          {
            path: 'history',
            name: 'shixun-history',
            component: () => import('../views/stu/shixun_homework/history'),
            meta:{title:'实训作业',activeMenu:'/shixun_homework_stu'},
          }
        ]
      },
      {
        path: 'common_homework_stu',
        component: () => import('../views/stu/common_homework/common-homework-stu'),
        children: [
          {
            path: '/',
            name: 'common-all',
            component: () => import('../views/stu/common_homework/all'),
            meta:{title:'普通作业',activeMenu:'/common_homework_stu'},
          },
          {
            path: 'ing',
            name: 'common-ing',
            component: () => import('../views/stu/common_homework/ing'),
            meta:{title:'普通作业',activeMenu:'/common_homework_stu'},
          },
          {
            path: 'history',
            name: 'common-history',
            component: () => import('../views/stu/common_homework/history'),
            meta:{title:'普通作业',activeMenu:'/common_homework_stu'},
          }
        ]
      },
      {
        path: 'common_homework_stus/:cid',
        name: 'common-homework-stuInfo',
        component: () => import('../views/stu/common_homework/info'),
        meta:{title:'普通作业-详细',activeMenu:'/common_homework_stu'}
      },
      {
        path: 'code',
        name: 'code',
        component: () => import('../views/code/Code'),
        meta:{title:'竞赛代码'}
      },
      {
        path: 'file',
        name: 'file',
        component: () => import('../views/file/File'),
        meta:{title:'文件资源'}
      },
      {
        path:'video',
        name:'video',
        component:() => import('../views/file/Video'),
        meta:{title:'视频资源'}
      }
    ]
  },
  {
    path:'/admin',
    name:'admin',
    component: () => import('../views/admin/authority')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})


router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.meta.title)  // 设置当前的路由名称
  if(from.name === 'shixun-homework-edit'){
    localStorage.removeItem("editDes");
  }
  if(to.path === '/'||to.path === '/404'){
    next();
  }
  let token = localStorage.getItem('token');
  if(token === null || token === ''){
    next('/404');
  }
  next()
})

export default router
