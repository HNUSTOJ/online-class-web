<template>
  <el-card>
    <div style="margin-bottom: 20px">
      <el-page-header @back="goBack" content="作业详情"></el-page-header>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="作业描述" name="common-stu-des"></el-tab-pane>
      <el-tab-pane label="提交情况" name="common-stu-sub"></el-tab-pane>
    </el-tabs>
    <router-view v-if="this.$route.params.courseId"></router-view>
  </el-card>

</template>

<script>

export default {
  name: "info",
  data(){
    return{
      activeName:sessionStorage.getItem('common-info-activeName')
    }
  },
  created() {
    if(!sessionStorage.getItem('common-info-activeName')){
      sessionStorage.setItem('common-info-activeName','common-stu-des')
      this.activeName = 'common-stu-des'
    }
  },
  methods:{
    goBack(){
      this.$router.push({ name: 'common-all'})
    },
    handleClick(tab, event) {
      sessionStorage.setItem('common-info-activeName',tab.name)
      this.$router.push({name:tab.name})
    },
  },
  destroyed: function () {
    sessionStorage.removeItem('common-info-activeName')
  },
}
</script>

<style scoped>

</style>
