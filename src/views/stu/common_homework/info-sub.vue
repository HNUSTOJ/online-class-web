<template>
<div>
  <div style="margin-top: 15px">
    <span>剩余提交时间5 天 23 小时 36 分 </span>
  </div>
  <div style="margin: 15px 0">
    <el-table :data="list" border stripe :header-cell-class-name="headerBg" style="font-size: 14px">
      <el-table-column label="序号"  width="100" align="center">1</el-table-column>
      <el-table-column prop="user_name" label="姓名" width="150" align="center"></el-table-column>
      <el-table-column prop="user_id" label="学号" align="center"></el-table-column>
      <el-table-column label="提交状态" width="150" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.state===1">已提交</div>
          <div v-else>未提交</div>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.update_time.substring(0,19).replace('T',' ') }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="review" label="评阅状态" width="150" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.state===0">-</div>
          <div v-else-if="scope.row.judge===0">未评阅</div>
          <div v-else-if="scope.row.judge===1">已评阅</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "info-sub",
  computed:{
    ...mapGetters({
      list:'commonStore/submitList',
    })
  },
  data(){
    return{
      headerBg: 'headerBg',
      query:{},
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      this.query.job_id = this.$route.params.commonId
      this.query.page = 1
      this.query.state = -1
      this.query.class_id = [1]
      this.$store.dispatch('commonStore/getCommonSubmitInfo',this.query).then(res=>{
        //console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
