<template>
    <el-menu default-active="1" style="width: 150px" router :default-active="$route.path">
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
      <el-menu-item :index="`/course/${id}/shixun_homework`" v-if="permissions === role.isTeacher">
        <i class="el-icon-document"></i>
        <span slot="title">实训作业</span>
      </el-menu-item>
      <el-menu-item :index="`/course/${id}/shixun_homework_stu`" v-if="permissions === ''||permissions === '0'||permissions === null">
        <i class="el-icon-document"></i>
        <span slot="title">实训作业</span>
      </el-menu-item>
      <el-menu-item :index="`/course/${id}/common_homework`" v-if="permissions === role.isTeacher">
        <i class="el-icon-document"></i>
        <span slot="title">普通作业</span>
      </el-menu-item>
      <el-menu-item :index="`/course/${id}/common_homework_stu`" v-if="permissions === ''||permissions === '0'||permissions === null">
        <i class="el-icon-document"></i>
        <span slot="title">普通作业</span>
      </el-menu-item>
      <el-menu-item :index="`/course/${id}/file`">
        <i class="el-icon-folder-opened"></i>
        <span slot="title">文件资源</span>
      </el-menu-item>
      <el-menu-item :index="`/course/${id}/file_category`">
        <i class="el-icon-folder-opened"></i>
        <span slot="title">视频资源</span>
      </el-menu-item>
      <el-menu-item :index="`/course/${id}/code`" v-if="permissions === role.isTeacher">
        <i class="el-icon-pie-chart"></i>
        <span slot="title">竞赛代码</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
import {mapGetters} from "vuex";

export default {
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
    }
  },
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  },
}
</script>

<style>
  a {
    text-decoration: none;
    color: inherit;
  }
</style>
