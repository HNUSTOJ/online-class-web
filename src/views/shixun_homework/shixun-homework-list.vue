<template>
  <div>
    <div style="padding: 10px 0;display: flex;justify-content: space-between">
      <div>
        <el-input style="width: 200px" placeholder="请输入名称进行搜索" suffix-icon="el-icon-search" v-model="input"></el-input>
        <el-button style="margin-left: 5px" type="primary" @click="search">搜索</el-button>
      </div>
      <div>
        <el-button type="text" icon="el-icon-plus" v-if="permissions === '1'||permissions === '2'" @click="create" style="font-size: 14px">创建作业</el-button>
      </div>
    </div>
    <el-card>
      <el-table :data="contestList" stripe style="margin-top:10px;font-size: 13px">
        <el-table-column prop="contest_id" label="作业编号" align="center" width="100"></el-table-column>
        <el-table-column label="作业标题" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="open">{{ scope.row.title }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="200">
          <template slot-scope="scope">
            <span class="ready" v-if="compare(scope.row.start_time,currentTime)">准备</span>
            <span class="run" v-if="compare(currentTime,scope.row.start_time)&&compare(scope.row.end_time,currentTime)">进行中</span>
            <span class="end" v-if="compare(currentTime,scope.row.end_time)" >已结束</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.private === 1">私有</span>
            <span v-if="scope.row.private === 0">公开</span>
          </template>
        </el-table-column>
        <el-table-column prop="user_id" label="创建者" align="center" width="150"></el-table-column>
        <el-table-column label="操作" align="center" width="120" v-if="permissions === '1'||permissions === '2'">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row.contest_id)">编辑</el-button>
            <el-button type="text" @click="del(scope.row.contest_id)">删除</el-button>
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
  name: "shixun-homework-list",
  components: {
  },
  computed:{
    ...mapGetters({
      contestList:'shixunStore/contestList',
      total:'shixunStore/total',
      permissions:'loginStore/permissions',
    })
  },
  created() {
    this.load(1,'')
  },
  data() {
    return {
      currentTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      pageSize:8,
      pageNum:1,
      input:'',
      input2:'',
      query:{},
    }
  },
  methods: {
    load(page,title){
      this.query.page = page
      this.query.id = parseInt(this.$route.params.courseId)
      this.query.title = title
      this.$store.dispatch('shixunStore/getTrainingContestList',this.query).then(res=>{
        //console.log(res)
      })
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load(pageNum,this.input2)
    },
    search(){
      this.pageNum = 1
      this.input2 = this.input
      this.load(1,this.input2)
    },
    open(){
      this.$router.push({name:'shixun-homework-info',params:{cid:'123'}})
    },
    edit(id){
      this.$router.push({name:'shixun-homework-edit',params:{contestId:id}})
    },
    del(id){
      this.$confirm('此操作将永久删除该作业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('shixunStore/postTrainingDelete',{id:parseInt(id)}).then(res=>{
          if(res.code === 200) this.$message.success('删除成功！')
          this.load(this.pageNum,'')
        })
      }).catch(() => {
        this.$message({type: 'info', message: '已取消删除'});
      });
    },
    create(){
      this.$router.push({name:'shixun-homework-add'})
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
