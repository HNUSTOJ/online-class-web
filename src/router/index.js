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
        meta:{title:'班级管理'}
      },
      {
        path: 'class/:classId',
        name: 'classInfo',
        component: () => import('../views/class/Class-info'),
        meta:{title:'班级管理-详细信息'}
      },
      {
        path: 'attendance',
        name: 'attendance',
        component: () => import('../views/attendance/Attendance'),
        meta:{title:'签到'},
        children: [
          {
            path: '/',
            name: 'all',
            component: () => import('../views/attendance/Attendance-list'),
            meta:{title:'签到'},
          },
          {
            path: 'ing',
            name: 'ing',
            component: () => import('../views/attendance/Attendance-ing'),
            meta:{title:'签到'},
          },
          {
            path: 'history',
            name: 'history',
            component: () => import('../views/attendance/Attendance-history'),
            meta:{title:'签到'},
          },
          {
            path: 'statistics',
            name: 'statistics',
            component: () => import('../views/attendance/AttendanceStatistics'),
            meta:{title:'签到'},
          }
        ]
      },
      {
        path: 'attendance/:aid',
        name: 'attendanceInfo',
        component: () => import('../views/attendance/Attendance-info'),
        meta:{title:'签到-详细信息'}
      },
      {
        path: 'shixun_homework',
        name: 'shixun-homework-list',
        component: () => import('../views/shixun_homework/shixun-homework-list'),
        meta:{title:'实训作业'}
      },
      {
        path: 'shixun_homework/add',
        name: 'shixun-homework-add',
        component: () => import('../views/shixun_homework/shixun-homework-add'),
        meta:{title:'实训作业-添加'}
      },
      {
        path: 'shixun_homeworks/:cid',
        component: () => import('../views/shixun_homework/shixun-homework'),
        children:[
          {
            path: '/',
            name: 'shixun-homework-info',
            component: () => import('../views/shixun_homework/shixun-homework-info'),
            meta:{title:'实训作业-详细'}
          },
          {
            path: 'status',
            name: 'shixun-homework-status',
            component: () => import('../views/shixun_homework/shixun-homework-status'),
            meta:{title:'实训作业-提交状态'}
          },
          {
            path: 'standing',
            name: 'shixun-homework-standing',
            component: () => import('../views/shixun_homework/shixun-homework-standing'),
            meta:{title:'实训作业-统计'}
          },
          {
            path: 'edit',
            name: 'shixun-homework-edit',
            component: () => import('../views/shixun_homework/shixun-homework-edit'),
            meta:{title:'实训作业-编辑'}
          },
          {
            path: 'problem',
            name: 'shixun-homework-problem',
            component: () => import('../views/shixun_homework/shixun-homework-problem'),
            meta:{title:'实训作业-问题'}
          },
          {
            path: 'problem/submit',
            name: 'shixun-homework-submit',
            component: () => import('../views/shixun_homework/shixun-homework-submit'),
            meta:{title:'实训作业-提交'}
          }
        ]
      },

      {
        path: 'common_homework',
        name: 'common_homework',
        component: () => import('../views/common_homework/common-homework')
      },
      {
        path: 'common_homeworks/:cid',
        name: '',
        component: () => import('../views/common_homework/common-homework-detail'),
        children:[
        ]
      },
      {
        path: '/common_homework/add',
        name: '普通作业-添加',
        component: () => import('../views/common_homework/common-homework-add'),
      },
      {
        path: 'class_stu',////////////////////////////////////////////////////////////////////////////////////
        name: 'class-stu',
        component: () => import('../views/stu/class/Class-stu'),
        meta:{title:'班级管理'}
      },
      {
        path: 'class_stu/:cid',
        name: 'class-stu-info',
        component: () => import('../views/stu/class/Class-stu-info'),
        meta:{title:'班级管理-详细信息'}
      },
      {
        path: 'attendance_stu',
        name: 'attendance-stu',
        component: () => import('../views/stu/attendance/Attendance-stu'),
        meta:{title:'签到'}
      },
      {
        path: 'shixun_homework_stu',
        name: 'shixun_homework_stu',
        component: () => import('../views/stu/shixun_homework/shixun-homework-stu'),
        meta:{title:'实训作业'}
      },
      {
        path: 'common_homework_stu',
        name: 'common_homework_stu',
        component: () => import('../views/stu/common_homework/common-homework-stu'),
        meta:{title:'普通作业'}
      },
      {
        path: 'common_homework_stus/:cid',
        name: 'common-homework-stuInfo',
        component: () => import('../views/stu/common_homework/info'),
        meta:{title:'普通作业-详细'}
      },
      {
        path: 'code',
        name: 'code',
        component: () => import('../views/code/Code')
      },
      {
        path: 'file',
        name: 'file',
        component: () => import('../views/file/File')
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
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.meta.title)  // 设置当前的路由名称

  if(to.path === '/'||to.path === '/404'){
    next();
  }else{
    let token = localStorage.getItem('token');
    if(token === null || token === ''){
      next('/404');
    }else{
      next();
    }
  }
  next()
})

export default router
