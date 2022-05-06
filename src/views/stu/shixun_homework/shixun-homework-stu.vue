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
      activeName: 'shixun-all'
    };
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push({name:tab.name})
    },
  }
}
</script>

<style scoped>
</style>
