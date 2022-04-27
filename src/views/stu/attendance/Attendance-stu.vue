<template>
<div>
  <el-tabs type="border-card">
    <el-tab-pane>
      <span slot="label">全部签到</span>
      <AttendanceListStu></AttendanceListStu>
    </el-tab-pane>

    <el-tab-pane>
      <span slot="label">正在签到</span>
      <AttendanceListStu></AttendanceListStu>
    </el-tab-pane>

    <el-tab-pane>
      <span slot="label">历史签到</span>
      <AttendanceListStu></AttendanceListStu>
    </el-tab-pane>

  </el-tabs>
</div>
</template>

<script>
import AttendanceListStu from "@/components/AttendanceListStu";

export default {
  name: "Attendance-stu",
  components: {
    AttendanceListStu
  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>

</style>
