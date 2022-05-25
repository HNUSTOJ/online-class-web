<template>
  <div>
    <div style="text-align: center;margin-top: 20px">
      <h3>Contest{{contest.contest_id}} - {{ contest.title }}</h3><br>
      <p v-html="contest.description"></p>
      <br>Start Time: <span style="color: #993399; ">{{ contest.start_time }}&nbsp;&nbsp;</span>
      End Time: <span style="color: #993399; ">{{ contest.end_time }}</span><br>
      Current Time: <span style="color: #993399; "><span id="nowdate">{{ currentTime }}</span></span><br>
      Status:
      <span v-if="compare(currentTime,contest.end_time)">Ended</span>
      <span v-if="compare(contest.start_time,currentTime)">Start</span>
      <span v-if="compare(currentTime,contest.start_time)&&compare(contest.end_time,currentTime)">Running</span>&nbsp;&nbsp;
      <span v-if="contest.private===1">Private</span>
      <span v-if="contest.private===0">Public</span>
      <br>
      <span>
        [<router-link :to="{name: 'shixun-homework-status'}"><a>Status</a></router-link>]
        [<router-link :to="{name: 'shixun-homework-standing'}"><a>Standing</a></router-link>]
        [<a>Statistics</a>]
      </span>
    </div>
    <el-table :data="contestInfo" stripe style="width: 100%;margin-top:10px">
      <el-table-column align="center" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.result===1">Y</span>
          <span v-if="scope.row.result===0">N</span>
        </template>
      </el-table-column>
      <el-table-column label="题目编号" align="center" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.problem_id}}</span>&nbsp;&nbsp;Problem  {{num[scope.row.num]}}
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openProblem(scope.row.problem_id,scope.row.num)">{{ scope.row.title }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="source" label="来源/分类" align="center"></el-table-column>
      <el-table-column prop="c_accepted" label="正确" align="center" width="80"></el-table-column>
      <el-table-column prop="c_submit" label="提交" align="center" width="80"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";
import {ascii} from "@/assets/data";
export default {
  name: "shixun-homework-info",
  data(){
    return{
      info:this.$route.query.info,
      contest:{},
      num:ascii,
      currentTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      pNum:[]
    }
  },
  computed:{
    ...mapGetters({
      contestInfo:'shixunStore/contestInfo'
    })
  },
  mounted() {
    this.currentTimes();
  },
  created() {
    this.contest = JSON.parse(sessionStorage.getItem('shixunInfo'))
    this.contest.start_time = moment(new Date(this.contest.start_time)).format('YYYY-MM-DD HH:mm:ss')
    this.contest.end_time = moment(new Date(this.contest.end_time)).format('YYYY-MM-DD HH:mm:ss')
    this.load()
  },
  methods: {
    currentTimes() {
      const timer = setInterval(this.formatDate, 1000);
      this.$once('hook:beforeDestroy',()=>{
        clearInterval(timer);
      })
    },
    formatDate(){
      this.currentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    },
    load(){
      let _this = this
      this.$store.dispatch('shixunStore/getTrainingContestInfo',{id:parseInt(this.contest.contest_id)}).then(res=>{
        _this.contestInfo.forEach(function (item, index) {
          let num = _this.num[index]
          let id = item.problem_id
          _this.pNum.push({num,id})
        });
        localStorage.setItem('pNum',JSON.stringify(_this.pNum))
        console.log(res)
      })
    },
    openProblem(id,num){
      this.$router.push({name:'shixun-homework-problem',params:{problemId:id},query:{num:num}})
    },
    compare(date1,date2) {
      let dates1 = new Date(date1);
      let dates2 = new Date(date2);
      if (dates1 > dates2) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.jumbotron {
  color: inherit;
}
body {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
}
html {
  font-size: 10px;
}
html {
  font-family: sans-serif;
  -webkit-text-size-adjust: 100%;
}
a{
  text-decoration:none;
  color: #993399;
}
</style>
