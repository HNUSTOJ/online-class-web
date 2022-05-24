<template>
  <el-card>
    <div style="margin-bottom: 20px">
      <el-page-header @back="goBack" :content="title"></el-page-header>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="作业描述" name="common-des"></el-tab-pane>
      <el-tab-pane label="提交情况" name="common-sub"></el-tab-pane>
      <el-tab-pane label="设置" name="common-set"></el-tab-pane>
    </el-tabs>
    <router-view v-if="this.$route.params.courseId"></router-view>
  </el-card>
</template>

<script>

export default {
  name: "common-homework-detail",
  data(){
    return{
      activeName:sessionStorage.getItem('common-activeName'),
      title:sessionStorage.getItem('common_title')
    }
  },
  created() {
    if(!sessionStorage.getItem('common-activeName')){
      sessionStorage.setItem('common-activeName','common-des')
      this.activeName = 'common-des'
    }
  },
  methods:{
    goBack(){
      this.$router.push({name:'common_homework'})
    },
    handleClick(tab, event) {
      sessionStorage.setItem('common-activeName',tab.name)
      this.$router.push({name:tab.name})
    }
  },
  destroyed: function () {
    sessionStorage.removeItem('common-activeName')
  }
}
</script>

<style scoped>

</style>
