<template>
  <el-menu background-color="rgb(48, 65, 86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div class="divHeader">
      <img src="../assets/logo.png" alt="">
      <b style="color: white" v-show="logoTextShow">在线实训课堂</b>
    </div>
<!--    <div v-for="item in Data">-->
<!--      <div v-if="item.path">-->
<!--        <el-menu-item :index="item.path">-->
<!--          <i :class="item.icon"></i>-->
<!--          <span slot="title">{{ item.name }}</span>-->
<!--        </el-menu-item>-->
<!--      </div>-->
<!--      <div v-else>-->
<!--        <el-submenu>-->
<!--          <template slot="title">-->
<!--            <i :class="item.icon"></i>-->
<!--            <span slot="title">{{ item.name }}</span>-->
<!--          </template>-->
<!--          <div v-for="i in item.hw">-->
<!--            <el-menu-item :index="i.path">-->
<!--              <i :class="i.icon"></i>-->
<!--              <span slot="title">{{ i.name }}</span>-->
<!--            </el-menu-item>-->
<!--          </div>-->
<!--        </el-submenu>-->
<!--      </div>-->
<!--    </div>-->
    <el-menu-item :index="`/course/${id}/class`" v-if="permissions === role.isTeacher">
      <i class="el-icon-user"></i>
      <span slot="title">班级管理</span>
    </el-menu-item>
    <el-menu-item :index="`/course/${id}/class_stu`" v-if="permissions === ''||permissions === '0'||permissions === null">
      <i class="el-icon-user"></i>
      <span slot="title">班级管理</span>
    </el-menu-item>
    <el-menu-item :index="`/course/${id}/attendance`" v-if="permissions === role.isTeacher">
      <i class="el-icon-date"></i>
      <span slot="title">签到</span>
    </el-menu-item>
    <el-menu-item :index="`/course/${id}/attendance_stu`" v-if="permissions === ''||permissions === '0'||permissions === null">
      <i class="el-icon-date"></i>
      <span slot="title">签到</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">作业管理</span>
      </template>
        <el-menu-item :index="`/course/${id}/shixun_homework`" v-if="permissions === role.isTeacher">
          <span slot="title">实训作业</span>
        </el-menu-item>
      <el-menu-item :index="`/course/${id}/shixun_homework_stu`" v-if="permissions === ''||permissions === '0'||permissions === null">
        <span slot="title">实训作业</span>
      </el-menu-item>
        <el-menu-item :index="`/course/${id}/common_homework`" v-if="permissions === role.isTeacher">
          <span slot="title">普通作业</span>
        </el-menu-item>
        <el-menu-item :index="`/course/${id}/common_homework_stu`" v-if="permissions === ''||permissions === '0'||permissions === null">
          <span slot="title">普通作业</span>
        </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-folder-opened"></i>
        <span slot="title">资源管理</span>
      </template>
      <el-menu-item :index="`/course/${id}/file`">
        <span slot="title">文件资源</span>
      </el-menu-item>
      <el-menu-item :index="`/course/${id}/file_category`">
        <span slot="title">文件分类</span>
      </el-menu-item>
    </el-submenu>
<!--    <el-menu-item :index="`/course/${id}/file`">-->
<!--      <i class="el-icon-folder-opened"></i>-->
<!--      <span slot="title">资源管理</span>-->
<!--    </el-menu-item>-->
    <el-menu-item :index="`/course/${id}/code`" v-if="permissions === role.isTeacher">
      <i class="el-icon-pie-chart"></i>
      <span slot="title">竞赛代码</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Aside",
  computed:{
    ...mapGetters({
      role: 'loginStore/role',
      permissions:'loginStore/permissions',
    })
  },
  created() {
    //this.Data = this.itemData;
  },
  data(){
    return{
      id:this.$route.params.courseId
      // Data:[],
      // itemData: [
      //   {path:'/course/123',icon:'el-icon-user',name:'班级管理'},
      //   {path:'/course/123/attendance',icon:'el-icon-date',name:'签到'},
      //   {path:'',icon:'el-icon-document',name:'作业管理',hw:[{path:'/course/123/shixun_homework',icon:'el-icon-monitor',name:'实训作业'},{path:'/course/123/common_homework',icon:'el-icon-reading',name:'普通作业'}]},
      //   {path:'/file',icon:'el-icon-folder-opened',name:'资源管理'},
      //   {path:'/code',icon:'el-icon-thumb',name:'竞赛代码'},
      // ],
      // itemData_stu: [
      //   {path:'/class_stu',icon:'el-icon-user',name:'班级管理'},
      //   {path:'/attendance_stu',icon:'el-icon-date',name:'签到'},
      //   {path:'',icon:'el-icon-document',name:'作业管理',hw:[{path:'/shixun_homework_stu',icon:'el-icon-monitor',name:'实训作业'},{path:'/common_homework_stu',icon:'el-icon-reading',name:'普通作业'}]},
      //   {path:'/file',icon:'el-icon-folder-opened',name:'资源管理'},
      // ]
    }
  },
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  },
}
</script>

<style scoped>
.el-menu{
  min-height: 100%;
  overflow-x: hidden;
}
.el-menu-item.is-active {
  background-color: rgb(38, 52, 69) !important;
}
.el-menu-item:hover {
  background-color: rgb(38, 52, 69) !important;
}

.el-submenu__title:hover {
  background-color: rgb(38, 52, 69) !important;
}
/*解决收缩菜单文字不消失问题*/
.el-menu--collapse span {
  visibility: hidden;
}
.divHeader{
  height: 60px;
  line-height: 60px;
  text-align: center
}
.divHeader img{
  width: 20px;
  position: relative;top: 5px;
  margin-right: 5px;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>
