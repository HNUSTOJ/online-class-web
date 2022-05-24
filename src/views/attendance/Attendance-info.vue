<template>
  <div>
    <el-card>
      <div>
        <el-page-header @back="goBack" :content="sign_name">
        </el-page-header>
      </div>
      <div style="display: flex;margin-top: 20px">
        <span>签到人数</span>
        <el-progress :percentage="setItemProgress()" style="width: 25%;margin: auto 5px" :show-text="false"></el-progress>
        <span style="font-size: small;margin-left: 5px">已签到{{signedNum}}/</span>
        <span style="font-size: small">应签到{{signNum}}</span>
      </div>
      <div style="margin-top: 20px">
        <span style="font-size: small">签到发起人:{{userName}}</span>
        <span style="font-size: small;margin-left: 10%">开始时间:{{startTime.substring(0,19).replace('T',' ')}}</span>
        <span style="font-size: small;margin-left: 10%">结束时间:{{endTime.substring(0,19).replace('T',' ')}}</span>
      </div>
    </el-card>
    <div style="margin-top: 15px">
      <el-select v-model="region" placeholder="请选择状态" @change="selectChange(region)">
        <el-option v-for="item in stateData" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <div style="margin-top: 15px">
      <el-table :data="list" border stripe :header-cell-class-name="headerBg" style="font-size: 13px">
        <el-table-column prop="id" label="序号" width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user_name" label="姓名" width="300" align="center"></el-table-column>
        <el-table-column prop="user_id" label="学号" width="400" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state === '0'">未签到</span>
            <span v-if="scope.row.state === '1'">已签到</span>
            <span v-if="scope.row.state === '2'">迟到</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding: 10px 0">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="listNum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Attendance-detail",
  data() {
    return {
      region: '3',
      stateData: [
        {id: '3',name:'全部状态'},
        {id: '1',name:'已签到'},
        {id: '0',name:'未签到'},
        {id: '2',name:'迟到'}
      ],
      pageNum: 1,
      pageSize: 6,
      headerBg: 'headerBg',
      sign_name:sessionStorage.getItem('sign_name')
    }
  },
  computed:{
    ...mapGetters({
      list:'attendanceStore/attendanceInfoList',
      signedNum:'attendanceStore/signedNum',
      signNum:'attendanceStore/signNum',
      startTime:'attendanceStore/startTime',
      endTime:'attendanceStore/endTime',
      userName:'attendanceStore/userName',
      listNum:'attendanceStore/listNum'
    })
  },
  created() {
    this.load(1,3)
  },
  methods:{
    goBack() {
      this.$router.push({name: sessionStorage.getItem('sign-activeName')})
    },
    load(page,state){
      this.$store.dispatch('attendanceStore/getAttendanceInfoList',{page:page,sign_state:state,sign_id:this.$route.params.aid}).then(res=>{
      //console.log(res)
      })
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load(pageNum,this.region)
    },
    selectChange(id){
      this.pageNum = 1
      this.load(1,id)
    },
    setItemProgress() {
      if (this.signedNum > this.signNum) {
        return 100
      } else if(this.signNum === 0){
        return 0
      }else{
        return parseInt((this.signedNum / this.signNum).toFixed(1) * 100)
      }
    },
  }
}
</script>

<style scoped>

</style>
