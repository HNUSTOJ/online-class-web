<template>
  <div>
    <el-row class="filter">
      <el-col :offset="1" :span="5">
        <el-col :span="6"><label>题目:</label></el-col>
        <el-col :span="15"><el-input v-model="form.pid" placeholder="A"></el-input></el-col>
      </el-col>
      <el-col :span="4">
        <el-col :span="6"><label>用户:</label></el-col>
        <el-col :span="15"><el-input v-model="form.uid" placeholder="1855010216"></el-input></el-col>
      </el-col>
      <el-col :span="6">
        <el-col :span="6"><label>结果:</label></el-col>
        <el-col :span="16">
          <el-select v-model="form.judge" placeholder="请选择">
            <el-option key="16" label="ALL" value="16"></el-option>
            <el-option v-for="(item,index) in judgeResult" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="4">
        <el-col :span="12"><label>语言:</label></el-col>
        <el-col :span="12">
          <el-select v-model="form.language" placeholder="请选择">
            <el-option key="21" label="ALL" value="21"></el-option>
            <el-option v-for="item in languageList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="search">查找</el-button>
      </el-col>
    </el-row>
    <el-row class="pagination">
      <el-col :span="16">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </el-col>
      <el-col :span="8">
        <el-button icon="el-icon-refresh" @click="fresh"></el-button>
      </el-col>
    </el-row>
    <el-table :data="problemStatus" stripe style="margin-top:10px">
      <el-table-column prop="solution_id" label="题交编号" align="center"></el-table-column>
      <el-table-column prop="user_id" label="用户" align="center"></el-table-column>
      <el-table-column label="问题" align="center">
        <template  slot-scope="scope">
          <el-button type="text" @click="toProblem(num[scope.row.num])">{{num[scope.row.num]}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="结果" align="center">
        <template  slot-scope="scope">
          <span v-if="scope.row.result===4&&scope.row.sim_s_id===-1">{{judgeResult[scope.row.result]}}100</span>
          <span v-if="scope.row.result===4&&scope.row.sim_s_id!==-1">{{judgeResult[scope.row.result]}}({{scope.row.sim_s_id}})</span>
          <span v-if="scope.row.result===6">{{judgeResult[6]}}{{(scope.row.pass_rate*100).toFixed(0)}}</span>
          <span v-if="scope.row.result!==4&&scope.row.result!==6">{{judgeResult[scope.row.result]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="memory" label="内存(KB)" align="center"></el-table-column>
      <el-table-column prop="time" label="耗时(MS)" align="center"></el-table-column>
      <el-table-column prop="language" label="语言" align="center">
        <template  slot-scope="scope">
          <span>{{langName[scope.row.language]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="code_length" label="代码长度" align="center"></el-table-column>
      <el-table-column label="提交时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.in_date.substring(0,19).replace('T',' ')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {judge_result} from "@/assets/data";
import {lang} from "@/assets/data";
import {lang_name} from "@/assets/data";
import {ascii} from "@/assets/data";
export default {
  name: "shixun-homework-status",
  computed:{
    ...mapGetters({
      problemStatus:'shixunStore/problemStatus',
      total:'shixunStore/problemStatusTotal',
      contestInfo:'shixunStore/contestInfo'
    })
  },
  data () {
    return {
      form:{uid: '', pid: '', judge: '16', language: '21'},
      form2:{uid: '', pid: '', judge: '', language: ''},
      pageSize: 10,
      pageNum:0,
      judgeResult:judge_result,
      languageList:lang,
      langName:lang_name,
      pNum:JSON.parse(localStorage.getItem('pNum')),
      num:ascii,
    }
  },
  created() {
    this.load(1)
  },
  methods: {
    load(page){
      let query={}
      query.page = page
      query.contest_id = parseInt(this.$route.params.contestId)
      query.user_id = this.form2.uid
      query.problem_id = ''
      if(this.form2.judge==='16'){
        query.result = ''
      }else{
        query.result = this.form2.judge
      }
      if(this.form2.language==='21'){
        query.language = ''
      }else{
        query.language = this.form2.language
      }
      let _this = this
      this.pNum.forEach(function (item, index) {
        if(_this.form2.pid===item.num){
          query.problem_id=item.id
          return;
        }
      });
      //console.log(query)
      this.$store.dispatch('shixunStore/getTrainingSearchStatus',query).then(res=>{
        //console.log(res)
      })
    },
    fresh(){
      this.load(1)
    },
    search(){
      this.pageNum = 1
      this.form2 = this.form
      this.load(1)
    },
    handleCurrentChange(page) {
      this.pageNum = page
      this.load(page)
    },
    toProblem(num){
      let problem_id
      this.pNum.forEach(function (item, index) {
        if(num===item.num){
          problem_id = item.id
        }
      });
      this.$router.push({name:'shixun-homework-problem',params:{problemId:problem_id}})
    }
  }
}
</script>

<style scoped>
.filter{
  margin-bottom: 20px;
  height: 32px;
  line-height: 32px;
}
.filter .el-col{
  text-align: center;
}
.pagination{
  margin-bottom: 10px;
}
</style>
