<template>
<div>
  <el-card style="margin-bottom: 15px">
    <div class="el-card-div">
      <span style="margin-top:5px">共2个分班</span>
      <div>
        <el-input style="width: 200px" placeholder="请输入分班名称进行搜索" suffix-icon="el-icon-search" v-model="username"></el-input>
        <el-button style="margin-left: 5px" type="primary">搜索</el-button>
      </div>
    </div>

  </el-card>
  <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" :cell-style="judge">
    <el-table-column prop="id" label="序号" width="80" align="center"></el-table-column>
    <el-table-column prop="classname" label="分班名称" width="200" align="center"></el-table-column>
    <el-table-column prop="stunum" label="学生成员" width="100" align="center"></el-table-column>
    <el-table-column prop="teacher" label="管理教师" align="center"></el-table-column>
    <el-table-column label="你所在的分班" align="center">
      <template slot-scope="scope">
        <i v-if="scope.row.id === inclass" class="el-icon-check"></i>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="300" align="center">
      <template>
        <el-button type="text" @click="detail">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="padding: 10px 0">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
import request from "@/utils/request";
import router from "@/router";

export default {
  name: "Class-student",
  data(){
    return{
      sign: '3',
      tableData: [
        {id:'1',classname: '18计算机二班',stunum: '30',teacher:'谢沅峰'},
        {id:'2',classname: '18计算机二班',stunum: '30',teacher:'谢沅峰'},
        {id:'3',classname: '18计算机二班',stunum: '30',teacher:'谢沅峰'},
        {id:'4',classname: '18计算机二班',stunum: '30',teacher:'谢沅峰'},
        {id:'5',classname: '18计算机二班',stunum: '30',teacher:'谢沅峰'},
      ],
      username:'',
      total: 10,
      pageNum: 1,
      pageSize: 2,
      classname: "",
      headerBg: 'headerBg',
      inclass: '3'
    }
  },
  methods:{
    load(){
      request.get("http://localhost:8443/user/page",{
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          classname: this.classname
        }
      })
          .then(res=>{
            this.tableData=res.records
            this.total=res.total
          })
    },
    handleSizeChange(pageSize){
      this.pageSize=pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load()
    },
    detail(){
      this.$router.push({name:'class-stu-info',params:{cid:'123'}})
    },
    judge({ row, column, rowIndex, columnIndex }) {
      // if (row.id === this.sign && columnIndex === 4) {
      //   return 'color: #0CB618;font-size:25px';
      // }
    }
  }
}
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-card-div{
  display: flex;
  justify-content: space-between;
}
i{
  color: #0CB618;
  font-size:25px
}
</style>
