<template>
  <div>
    <div style="margin-top: 15px">
      <span>分班情况:</span>
      <el-select v-model="grade" placeholder="请选择班级" style="margin-left: 5px" @change="Change">
        <el-option key="all" label="全部班级" value="all"></el-option>
        <el-option v-for="item in commonClass" :key="item.class_id" :label="item.class_name" :value="item.class_id"></el-option>
      </el-select>
      <span style="margin-left: 20px">提交状态:</span>
      <el-select v-model="state" placeholder="请选择状态" style="margin-left: 5px" @change="Change">
        <el-option v-for="item in stateData" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 20px">一键导出</el-button>
      <span style="font-size: 12px">(选中一键导出)</span>
    </div>
    <div style="margin-top: 15px">
      <el-table :data="list" border stripe :header-cell-class-name="headerBg">
        <el-table-column prop="user_id" label="序号"  type="selection" width="100" align="center"></el-table-column>
        <el-table-column prop="user_name" label="姓名" width="150" align="center"></el-table-column>
        <el-table-column prop="user_id" label="学号" align="center"></el-table-column>
        <el-table-column prop="state" label="提交状态" width="150" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.state===1">已提交</div>
            <div v-else>未提交</div>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.state===0">-</div>
            <div v-else>{{scope.row.update_time.substring(0,19).replace('T',' ')}}</div>
          </template>
        </el-table-column>
        <el-table-column label="评阅状态" width="150" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.state===0">-</div>
            <div v-else-if="scope.row.judge===0">未评阅</div>
            <div v-else-if="scope.row.judge===1">已评阅</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="165" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="download(scope.row.state)">导出</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding: 10px 0">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "common-homework-sub",
  computed:{
    ...mapGetters({
      list:'commonStore/submitList',
      total:'commonStore/submitTotal',
      commonClass:'commonStore/commonClass',
      classId:'commonStore/commonClassId'
    })
  },
  data(){
    return{
      headerBg: 'headerBg',
      pageNum: 1,
      pageSize: 6,
      grade: 'all',
      grade2: 'all',
      state: -1,
      state2: -1,
      stateData: [
        {id: -1,name:'全部状态'}, {id: 1,name:'已提交'}, {id: 0,name:'未提交'},
      ],
      query:{}
    }
  },
  created() {
    this.$store.dispatch('commonStore/getCommonClass',{job_id:parseInt(this.$route.params.commonId)}).then(res=>{
      if(this.commonClass.length){
        this.load(1,this.classId,-1)
      }else{
        this.$message.warning('所在课堂未创建班级！')
      }
    })
  },
  methods:{
    load(page,classId,state){
      this.query.job_id = this.$route.params.commonId
      this.query.page = page
      this.query.state = state
      this.query.class_id = classId
      this.$store.dispatch('commonStore/getCommonSubmitInfo',this.query).then(res=>{
      })
    },
    Change(){
      this.pageNum = 1
      this.grade2=this.grade
      this.state2=this.state
      if(this.grade==='all'){
        this.load(1,this.classId,this.state)
      }else{
        this.load(1,[this.grade],this.state)
      }
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      if(this.grade2==='all'){
        this.load(pageNum,this.classId,this.state2)
      }else{
        this.load(pageNum,this.grade2,this.state2)
      }
    },
    download(state){
      if(state===1){
        this.$message.success('该同学已提交报告。')
      }else{
        this.$message.warning('该同学还未提交报告。')
      }
    }
  }
}
</script>

<style scoped>

</style>
