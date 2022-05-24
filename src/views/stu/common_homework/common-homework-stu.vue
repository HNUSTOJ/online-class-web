<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="common-all"></el-tab-pane>
      <el-tab-pane label="进行中" name="common-ing"></el-tab-pane>
      <el-tab-pane label="历史作业" name="common-history"></el-tab-pane>
    </el-tabs>
    <router-view v-if="this.$route.params.courseId"></router-view>
  </el-card>
</template>

<script>
export default {
  name: "common-homework-stu",
  components: {
  },
  data() {
    return {
      activeName: sessionStorage.getItem('common-activeName')
    };
  },
  created() {
    if(!sessionStorage.getItem('common-activeName')){
      sessionStorage.setItem('common-activeName','common-all')
      this.activeName = 'common-all'
    }
  },
  methods: {
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
