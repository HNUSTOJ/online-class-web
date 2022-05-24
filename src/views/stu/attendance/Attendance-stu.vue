<template>
<div>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部签到" name="all-stu"></el-tab-pane>
      <el-tab-pane label="正在签到" name="ing-stu"></el-tab-pane>
      <el-tab-pane label="历史签到" name="history-stu"></el-tab-pane>
    </el-tabs>
    <router-view v-if="this.$route.params.courseId"></router-view>
  </el-card>

</div>
</template>

<script>

export default {
  name: "Attendance-stu",
  components: {
  },
  data(){
    return{
      activeName:sessionStorage.getItem('sign-activeName'),
    }
  },
  created() {
    if(!sessionStorage.getItem('sign-activeName')){
      sessionStorage.setItem('sign-activeName','all-stu')
      this.activeName = 'all-stu'
    }
  },
  methods:{
    handleClick(tab, event) {
      sessionStorage.setItem('sign-activeName',tab.name)
      this.$router.push({name:tab.name})
    }
  },
  destroyed: function () {
    sessionStorage.removeItem('sign-activeName')
  }
}
</script>

<style scoped>

</style>
