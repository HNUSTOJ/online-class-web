<template>
  <div>
    <el-card>
      <div>
        <el-page-header @back="goBack" content="计算机二班"></el-page-header>
      </div>
      <div style="display: flex;margin-top: 30px">
        <div>
          <span>共5个学生</span>
        </div>
        <div style="margin-left: 905px">
          <el-input style="width: 200px" placeholder="请输入姓名、学号进行搜索" suffix-icon="el-icon-search" v-model="name"></el-input>
          <el-button style="margin-left: 5px" type="primary" @click="load">搜索</el-button>
        </div>
      </div>
    </el-card>

    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200" align="center"></el-table-column>
      <el-table-column prop="num" label="学号" width="250" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
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
import router from "@/router";
import request from "@/utils/request";

export default {
  name: "Class-stu-info",
  data(){
    return{
      name: '',
      tableData: [
        {id:'1',name: '张三',num: '1855010216',phone:'123456789',email:'123456'},
        {id:'1',name: '张三',num: '1855010216',phone:'123456789',email:'123456'},
        {id:'1',name: '张三',num: '1855010216',phone:'123456789',email:'123456'},
        {id:'1',name: '张三',num: '1855010216',phone:'123456789',email:'123456'},
        {id:'1',name: '张三',num: '1855010216',phone:'123456789',email:'123456'}
      ],
      total: 0,
      pageNum: 1,
      pageSize: 2,
      classname: "",
      headerBg: 'headerBg'
    }
  },
  methods: {
    goBack() {
      this.$router.push({name:'class-stu'})
    },
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
    }
  }
}
</script>

<style scoped>

</style>
