<template>
  <div>
    <div style="padding: 10px 0;display: flex;justify-content: space-between">
      <div>
        <el-input style="width: 200px" placeholder="请输入名称进行搜索" suffix-icon="el-icon-search" v-model="input"></el-input>
        <el-button style="margin-left: 5px" type="primary" @click="search">搜索</el-button>
      </div>
      <div>
        <el-button type="text" icon="el-icon-plus" @click="createHw" style="font-size: 14px">创建作业</el-button>
      </div>
    </div>
    <el-card style="min-height: 60vh">
      <el-table :data="list" stripe style="margin-top:10px">
        <el-table-column prop="job_id" label="作业编号" align="center" width="100"></el-table-column>
        <el-table-column label="作业标题" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="open(scope.row.job_id,scope.row.title,scope.row.create_time)">{{ scope.row.title }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="200">
          <template slot-scope="scope">
            <span class="ready" v-if="compare(scope.row.create_time,currentTime)">准备</span>
            <span class="run" v-if="compare(currentTime,scope.row.create_time)&&compare(scope.row.end_time,currentTime)">进行中</span>
            <span class="end" v-if="compare(currentTime,scope.row.end_time)" >已结束</span>
          </template>
        </el-table-column>
        <el-table-column prop="submit_num" label="提交人数" align="center" width="150"></el-table-column>
        <el-table-column prop="user_id" label="创建者" align="center" width="150"></el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="del(scope.row.job_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";

export default {
  name: "common-homework",
  computed:{
    ...mapGetters({
      list:'commonStore/commonList',
      total:'commonStore/commonTotal',
    })
  },
  data() {
    return {
      currentTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      pageNum:1,
      pageSize:8,
      input:'',
      input2:'',
      query:{}
    };
  },
  created() {
    this.load(1,'')
  },
  methods: {
    load(page,title){
      this.query.course_id = parseInt(this.$route.params.courseId)
      this.query.page = page
      this.query.title = title
      this.$store.dispatch('commonStore/getCommonList',this.query).then(res=>{
        // console.log(res)
      })
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load(pageNum,this.input2)
    },
    open(id,title,time){
      sessionStorage.setItem('common_title',title)
      sessionStorage.setItem('common_startTime',time)
      this.$router.push({name:'common-des',params:{commonId:id}})
    },
    createHw(){
      this.$router.push({name:'common-homework-add'})
    },
    search(){
      this.input2 = this.input
      this.pageNum = 1
      this.load(1,this.input2)
    },
    del(id){
      this.$confirm('此操作将永久删除该作业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('commonStore/postCommonDelete',{job_id:id}).then(res=>{
          if(res.code === 200){
            this.load(1,'')
            this.pageNum = 1
          }
        })
      }).catch(() => {
        this.$message({type: 'info', message: '已取消删除'});
      });
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
.ready{
  font-weight: bold;
  color: blue;
}
.run{
  font-weight: bold;
  color: red;
}
.end{
  font-weight: bold;
  color: black;
}
.el-table{
  margin-bottom: 20px;
}
</style>
