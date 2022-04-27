<template>
  <div>
    <div style="padding: 10px 0;display: flex;justify-content: space-between">
      <div>
        <el-input style="width: 200px" placeholder="请输入名称进行搜索" suffix-icon="el-icon-search" v-model="classname"></el-input>
        <el-button style="margin-left: 5px" type="primary" @click="">搜索</el-button>
      </div>
      <div>
        <el-button type="text" icon="el-icon-plus" v-if="isAdmin" @click="create" style="font-size: 14px">创建作业</el-button>
      </div>
    </div>
    <el-card style="min-height: 60vh">
      <el-table :data="list" stripe style="margin-top:10px">
        <el-table-column prop="cid" label="作业编号" align="center" width="100"></el-table-column>
        <el-table-column label="作业标题" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="open">{{ scope.row.title }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="200">
          <template slot-scope="scope">
            <span class="ready" v-if="scope.row.start > currentTime">准备</span>
            <span class="run" v-if="scope.row.start < currentTime && scope.row.end > currentTime">进行中</span>
            <span class="end" v-if="scope.row.end < currentTime" >已结束</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center" width="150"></el-table-column>
        <el-table-column prop="tname" label="创建者" align="center" width="150"></el-table-column>
        <el-table-column v-if="isAdmin||isTeacher" label="操作" align="center" width="120">
          <el-button type="text" @click="edit">编辑</el-button>
          <el-button type="text">删除</el-button>
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
    </el-card>

  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "shixun-homework-list",
  components: {
  },
  data() {
    return {
      isAdmin: this.$store.state.idAdmin,
      isTeacher: this.$store.state.isTeacher,
      isStu: this.$store.state.isStu,
      currentTime:Date.now(),
      list:[
        {cid: 1000,title: '21级潇湘计算机【01-04】班数据结构实验2',tname: '谢沅峰',start:Date.now()-5,end:Date.now()+1,type: '私有'},
        {cid: 1000,title: '21级潇湘计算机【01-04】班数据结构实验2',tname: '谢沅峰',start:Date.now()-5,end:Date.now()-1,type: '私有'},
        {cid: 1000,title: '21级潇湘计算机【01-04】班数据结构实验2',tname: '谢沅峰',start:Date.now()+1,end:Date.now()+2,type: '私有'},
        {cid: 1000,title: '21级潇湘计算机【01-04】班数据结构实验2',tname: '谢沅峰',start:Date.now()-5,end:Date.now()+1,type: '私有'},
        {cid: 1000,title: '21级潇湘计算机【01-04】班数据结构实验2',tname: '谢沅峰',start:Date.now()-5,end:Date.now()+1,type: '私有'},
        {cid: 1000,title: '21级潇湘计算机【01-04】班数据结构实验2',tname: '谢沅峰',start:Date.now()-5,end:Date.now()+1,type: '私有'},
        {cid: 1000,title: '21级潇湘计算机【01-04】班数据结构实验2',tname: '谢沅峰',start:Date.now()-5,end:Date.now()+1,type: '私有'},
        {cid: 1000,title: '21级潇湘计算机【01-04】班数据结构实验2',tname: '谢沅峰',start:Date.now()-5,end:Date.now()+1,type: '私有'},
        {cid: 1000,title: '21级潇湘计算机【01-04】班数据结构实验2',tname: '谢沅峰',start:Date.now()-5,end:Date.now()+1,type: '私有'},
        {cid: 1000,title: '21级潇湘计算机【01-04】班数据结构实验2',tname: '谢沅峰',start:Date.now()-5,end:Date.now()+1,type: '私有'}
      ]
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    open(){
      this.$router.push({name:'shixun-homework-info',params:{cid:'123'}})
    },
    edit(){
      this.$router.push({name:'shixun-homework-edit',params:{cid:'123'}})
    },
    create(){
      this.$router.push({name:'shixun-homework-add'})
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
