<template>
  <el-menu style="min-height: 100%;overflow-x: hidden"
           background-color="rgb(48, 65, 86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px;line-height: 60px;text-align: center">
      <img src="../assets/logo.png" alt="" style="width: 20px;position: relative;top: 5px;margin-right: 5px">
      <b style="color: white" v-show="logoTextShow">实训教学平台</b>
    </div>
    <div v-for="item in Data">
      <div v-if="item.path">
        <el-menu-item :index="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </div>
      <div v-else>
        <el-submenu>
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <div v-for="i in item.hw">
            <el-menu-item :index="i.path">
              <i :class="i.icon"></i>
              <span slot="title">{{ i.name }}</span>
            </el-menu-item>
          </div>
        </el-submenu>
      </div>
    </div>

<!--    <el-menu-item index="/class_stu">-->
<!--      <i class="el-icon-user"></i>-->
<!--      <span slot="title">班级管理</span>-->
<!--    </el-menu-item>-->
<!--    <el-menu-item index="/attendance_stu">-->
<!--      <i class="el-icon-date"></i>-->
<!--      <span slot="title">签到</span>-->
<!--    </el-menu-item>-->
<!--    <el-submenu>-->
<!--      <template slot="title">-->
<!--        <i class="el-icon-document"></i>-->
<!--        <span slot="title">作业管理</span>-->
<!--      </template>-->
<!--      <el-menu-item index="/shixun_homework_stu">-->
<!--        <span slot="title">实训作业</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/common_homework_stu">-->
<!--        <span slot="title">普通作业</span>-->
<!--      </el-menu-item>-->
<!--    </el-submenu>-->
<!--    <el-menu-item index="/data">-->
<!--      <i class="el-icon-pie-chart"></i>-->
<!--      <span slot="title">竞赛代码</span>-->
<!--    </el-menu-item>-->
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  created() {
    this.Data = this.itemData;
  },
  data(){
    return{
      Data:[],
      itemData: [
        {path:'/course',icon:'el-icon-user',name:'班级管理'},
        {path:'/attendance',icon:'el-icon-date',name:'签到'},
        {path:'',icon:'el-icon-document',name:'作业管理',hw:[{path:'/shixun_homework',icon:'el-icon-monitor',name:'实训作业'},{path:'/common_homework',icon:'el-icon-reading',name:'普通作业'}]},
        {path:'/data',icon:'el-icon-thumb',name:'竞赛代码'},
      ],
      itemData_stu: [
        {path:'/class_stu',icon:'el-icon-user',name:'班级管理'},
        {path:'/attendance_stu',icon:'el-icon-date',name:'签到'},
        {path:'',icon:'el-icon-document',name:'作业管理',hw:[{path:'/shixun_homework_stu',icon:'el-icon-monitor',name:'实训作业'},{path:'/common_homework_stu',icon:'el-icon-reading',name:'普通作业'}]},
      ]
    }
  },
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  },
}
</script>

<style scoped>
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
</style>
