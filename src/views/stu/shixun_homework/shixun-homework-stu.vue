<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="shixun-all"></el-tab-pane>
      <el-tab-pane label="进行中" name="shixun-ing"></el-tab-pane>
      <el-tab-pane label="历史作业" name="shixun-history"></el-tab-pane>
    </el-tabs>
    <router-view v-if="this.$route.params.courseId"></router-view>
  </el-card>
</template>

<script>

export default {
  name: "shixun-homework-stu",
  components: {
  },
  data() {
    return {
      activeName: sessionStorage.getItem('shixun-activeName')
    };
  },
  created() {
    if(!sessionStorage.getItem('shixun-activeName')){
      sessionStorage.setItem('shixun-activeName','shixun-all')
      this.activeName = 'shixun-all'
    }
  },
  methods: {
    handleClick(tab, event) {
      sessionStorage.setItem('shixun-activeName',tab.name)
      this.$router.push({name:tab.name})
    }
  },
  destroyed: function () {
    sessionStorage.removeItem('shixun-activeName')
  }
}
</script>

<style scoped>
</style>
