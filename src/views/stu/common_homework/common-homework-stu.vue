<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="0">
        <All></All>
      </el-tab-pane>
      <el-tab-pane label="进行中" name="1">
        <Ing></Ing>
      </el-tab-pane>
      <el-tab-pane label="历史作业" name="2">
        <History></History>
      </el-tab-pane>
    </el-tabs>

  </el-card>
</template>

<script>
import All from "@/views/stu/common_homework/all";
import Ing from "@/views/stu/common_homework/ing";
import History from "@/views/stu/shixun_homework/history";

export default {
  name: "common-homework-stu",
  components: {
    All,Ing,History
  },
  data() {
    return {
      activeName: '0',
    };
  },
  methods: {
    handleClick(tab, event) {

    }
  }
}
</script>

<style scoped>

</style>
