<template>
  <el-container style="min-height: 100vh">
    <el-aside :width="sideWidth+'px'">
      <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header :collapseBtnClass="collapseBtnClass" @asideCollapse="collapse"/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <About/>
    </el-container>
  </el-container>


</template>

<script>

import Aside from "@/components/Aside";
import Header from "@/components/Header";
import About from "@/components/About";

export default {
  name: 'Course',
  components: {
    Aside,
    Header,
    About,
  },
  data(){
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 180,
      logoTextShow: true
    }
  },
  methods:{
    collapse(){    //点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      if(this.isCollapse){
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      }else {
        this.sideWidth = 180
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    }
  }
}
</script>

<style>
.el-footer {
  line-height: 60px;
  background: #2b2e33;
}
.header{
  border-bottom: 1px solid #ccc;
}
</style>
