<template>
<div>
  <div style="margin-top: 15px">
    <span>{{this.time}}</span>
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
import moment from "moment";

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
      endTime: moment(sessionStorage.getItem('common_end_time')).format('YYYY-MM-DD HH:mm:ss'),
      currentTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      time:''
    }
  },
  created() {
    this.load()
  },
  mounted() {
    this.currentTimes();
  },
  methods:{
    currentTimes() {
      this.time = this.difference(this.currentTime,this.endTime)
      const timer = setInterval(this.formatDate, 1000);
      this.$once('hook:beforeDestroy',()=>{
        clearInterval(timer);
      })
    },
    formatDate(){
      this.currentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      this.time = this.difference(this.currentTime,this.endTime)
    },
    difference(beginTime, endTime) {
      let dateBegin = new Date(beginTime);
      let dateEnd = new Date(endTime);
      let dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
      let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
      let leave1 = dateDiff % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000));//计算出小时数
      //计算相差分钟数
      let leave2 = leave1 % (3600 * 1000);   //计算小时数后剩余的毫秒数
      let minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
      //计算相差秒数
      let leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
      let seconds = Math.round(leave3 / 1000);
      return "剩余提交时间" + dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
    },
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
