<template>
<div style="margin-left: 10px">
  <div style="margin: 10px 0">
    <el-input style="width: 200px" placeholder="请输入名称进行搜索" suffix-icon="el-icon-search" v-model="name"></el-input>
    <el-button style="margin-left: 5px" type="primary" @click="">搜索</el-button>
  </div>
  <div style="margin: 30px 0">
    <el-radio v-model="radio1" label="1">设置为学生</el-radio>
    <el-radio v-model="radio1" label="2">设置为老师</el-radio>
    <el-button type="primary">确定</el-button>
  </div>
  <el-table :data="tableData" border stripe>
    <el-table-column prop="id" type="selection" width="80" align="center"></el-table-column>
    <el-table-column prop="name" label="姓名" width="250" align="center"></el-table-column>
    <el-table-column prop="id" label="学号" width="350" align="center"></el-table-column>
    <el-table-column label="是否为老师" align="center">
      <template slot-scope="scope">
        <span v-if="scope.row.teacher === 1">是</span>
        <span v-else>否</span>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="30">
  </el-pagination>
</div>
</template>

<script>
export default {
  name: "authority",
  data(){
    return{
      name:'',
      radio1:'',
      radio2:'',
      tableData: [
        {id:'1855010216',name: 'xyf',teacher: 0},
        {id:'1855010216',name: 'xyf',teacher: 0},
        {id:'1855010216',name: 'xyf',teacher: 1},
        {id:'1855010216',name: 'xyf',teacher: 0},
      ],
    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  }
}
</script>

<style scoped>
.el-pagination{
  margin-top: 20px;
}
.el-table{
  width: 60%;
}
</style>
