<template>
  <div>
    <el-card>
      <div>
        <el-page-header @back="goBack" :content="item.cname">
        </el-page-header>
      </div>
      <div style="display: flex;margin-top: 20px">
        <span>签到人数</span>
        <el-progress :percentage="60" style="width: 25%;margin: auto 5px" :show-text="false"></el-progress>
        <span style="font-size: small;margin-left: 5px">已签到{{item.num1}}/</span>
        <span style="font-size: small">应签到{{item.num2}}</span>
      </div>
      <div style="margin-top: 20px">
        <span style="font-size: small">签到发起人:{{item.tname}}</span>
        <span style="font-size: small;margin-left: 10%">开始结束时间:{{item.time}}</span>
      </div>
    </el-card>
    <div style="margin-top: 15px">
      <el-select v-model="ruleForm.region" placeholder="请选择班级">
        <el-option v-for="item in classData" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select v-model="ruleForm.region2" placeholder="请选择状态" style="margin-left: 20px">
        <el-option v-for="item in stateData" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <span style="font-size: small;margin-left: 20px">已签到2/</span>
      <span style="font-size: small">应签到20</span>
    </div>
    <div style="margin-top: 15px">
      <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
        <el-table-column prop="id" label="序号" width="100" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="300" align="center"></el-table-column>
        <el-table-column prop="num" label="学号" width="400" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center"></el-table-column>
      </el-table>
      <div style="padding: 10px 0">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[2, 5, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import request from "@/utils/request";

export default {
  name: "Attendance-detail",
  data() {
    return {
      ruleForm: {
        region: 'all',
        region2: 'all'
      },
      item:{cname: '数据结构A', num1: '10', num2: '50', tname: '谢沅峰', time: '2022-03-17 15:25-19:00'},
      classData: [
        {id: 'all',name:'全部班级'},
        {id: '1',name:'计算机一班'},
        {id: '2',name:'计算机二班'},
        {id: '3',name:'计算机三班'},
        {id: '4',name:'计算机四班'}
      ],
      stateData: [
        {id: 'all',name:'全部状态'},
        {id: 'yes',name:'已签到'},
        {id: 'no',name:'未签到'},
        {id: 'delay',name:'迟到'}
      ],
      tableData: [
        {id:'1',name: '张三',num: '1855010216',state:'已签到'},
        {id:'2',name: '张三',num: '1855010216',state:'未签到'},
        {id:'3',name: '张三',num: '1855010216',state:'迟到'},
        {id:'4',name: '张三',num: '1855010216',state:'已签到'},
        {id:'5',name: '张三',num: '1855010216',state:'已签到'},
      ],
      total: 0,
      pageNum: 1,
      pageSize: 2,
      classname: "",
      headerBg: 'headerBg'
    }
  },
  methods:{
    goBack() {
      router.push("/attendance")
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
    },
  }
}
</script>

<style scoped>

</style>
