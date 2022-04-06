<template>
<div>
  <div style="margin-bottom: 20px">
    <el-page-header @back="goBack" content="作业详情"></el-page-header>
  </div>
  <el-tabs type="border-card" @tab-click="handleClick">
    <el-tab-pane label="作业描述" name="0">
      <div>
        <span>标题:</span>
      </div>
      <div>
        <span>简介:</span>
      </div>
    </el-tab-pane>
    <el-tab-pane label="提交情况" name="1">
      <div style="margin-top: 15px">
        <span>分班情况:</span>
        <el-select v-model="ruleForm.region" placeholder="请选择班级" style="margin-left: 5px">
          <el-option v-for="item in classData" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <span style="margin-left: 20px">提交状态:</span>
        <el-select v-model="ruleForm.region2" placeholder="请选择状态" style="margin-left: 5px">
          <el-option v-for="item in stateData" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 5px">一键导出</el-button>
        <span style="font-size: 12px">(选中一键导出)</span>
      </div>
      <div style="margin-top: 15px">
        <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
          <el-table-column prop="id" label="序号"  type="selection" width="100" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" width="150" align="center"></el-table-column>
          <el-table-column prop="num" label="学号" align="center"></el-table-column>
          <el-table-column prop="state" label="提交状态" width="150" align="center"></el-table-column>
          <el-table-column prop="refresh" label="更新时间" align="center"></el-table-column>
          <el-table-column prop="review" label="评阅状态" width="150" align="center"></el-table-column>
          <el-table-column label="操作" width="165" align="center">
            <template>
              <el-button type="primary" @click="">导出<i class="el-icon-top"></i></el-button>
            </template>
          </el-table-column>
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
    </el-tab-pane>
    <el-tab-pane label="设置" name="2">
      <el-form label-width="80px" size="small">
        <el-form-item label="发布时间:">
          <el-date-picker
              disabled
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间:">
          <el-date-picker
              v-model="value2"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发布设置:">
          <el-radio v-model="radio" label="1" disabled>统一发布</el-radio>
          <el-radio v-model="radio" label="2" disabled>分班发布</el-radio>
        </el-form-item>
      </el-form>
      <div style="margin-top: 10px">
        <el-button type="primary">确认修改</el-button>
        <el-button type="primary">取消</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import router from "@/router";

export default {
  name: "shixun-homework-detail",
  data(){
    return{
      total: 0,
      pageNum: 1,
      pageSize: 2,
      headerBg: 'headerBg',
      value1: '2022-03-21 14:10',
      value2: '',
      radio: '1',
      ruleForm: {
        region: 'all',
        region2: 'all'
      },
      classData: [
        {id: 'all',name:'全部班级'},
        {id: '1',name:'计算机一班'},
        {id: '2',name:'计算机二班'},
        {id: '3',name:'计算机三班'},
        {id: '4',name:'计算机四班'}
      ],
      stateData: [
        {id: 'all',name:'全部状态'},
        {id: 'yes',name:'已提交'},
        {id: 'no',name:'未提交'},
      ],
      tableData: [
        {id:'1',name: '张三',num: '1855010216',state:'已提交',refresh:'2022-03-25 14:53',review:'已评阅'},
        {id:'2',name: '张三',num: '1855010216',state:'已提交',refresh:'2022-03-25 14:53',review:'未评阅'},
        {id:'3',name: '张三',num: '1855010216',state:'未提交',refresh:'2022-03-25 14:53',review:'未评阅'},
        {id:'4',name: '张三',num: '1855010216',state:'未提交',refresh:'2022-03-25 14:53',review:'未评阅'},
        {id:'5',name: '张三',num: '1855010216',state:'未提交',refresh:'2022-03-25 14:53',review:'未评阅'},
        {id:'6',name: '张三',num: '1855010216',state:'已提交',refresh:'2022-03-25 14:53',review:'已评阅'},
      ]
    }
  },
  methods:{
    goBack(){
      router.push("/shixun_homework")
    },
    handleClick(tab, event) {
      router.push({ path: '/shixun_homework/detail', query: { tab: tab.name } })
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
