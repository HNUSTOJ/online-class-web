<template>
  <div>
    <div v-if="total">
      <div v-for="item in list">
        <el-card shadow="hover">
          <div style="margin: 10px 0">
            <span>{{ item.sign_name }}</span>
            <el-tag v-if="compare(item.start_time,currentTime)">准备中</el-tag>
            <el-tag type="success" v-if="compare(currentTime,item.start_time)&&compare(item.end_time,currentTime)">进行中</el-tag>
            <el-tag type="danger" v-if="compare(currentTime,item.end_time)">已结束</el-tag>
          </div>
          <div class="signInStatus blue" v-if="item.state === '1'"><span>已签到</span></div>
          <div class="signInStatus red" v-if="item.state === '2'"><span>迟到</span></div>
          <div class="signInStatus red" v-if="item.state === '0'"><span>未签到</span></div>
          <div class="atNum">
            <span>签到人数</span>
            <el-progress :percentage="setItemProgress(item)" style="width: 25%;margin: auto 5px" :show-text="false"></el-progress>
            <span style="font-size: small;margin-left: 5px">已签到{{item.signed_num}}/</span>
            <span style="font-size: small">应签到{{item.sign_num}}</span>
          </div>
          <div style="margin: 10px 0">
            <span style="font-size: small">签到发起人:{{item.user_name}}</span>
            <span style="font-size: small;margin-left: 12%">开始时间:{{item.start_time.substring(0,19).replace('T',' ')}}</span>
            <span style="font-size: small;margin-left: 4%">迟到时间:{{item.late_time.substring(0,19).replace('T',' ')}}</span>
            <span style="font-size: small;margin-left: 4%">结束时间:{{item.end_time.substring(0,19).replace('T',' ')}}</span>
            <div style="float: right">
              <el-button type="primary" @click="sign(item)" v-if="compare(currentTime,item.start_time)&&compare(item.end_time,currentTime)&&item.state==='0'">签到</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div v-else>
      <el-empty :image-size="300"></el-empty>
    </div>
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

</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";

export default {
  name: "all-stu",
  data(){
    return{
      pageNum: 1,
      pageSize: 3,
      query:{},
      state:['未签到','正常','迟到'],
      currentTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    }
  },
  computed:{
    ...mapGetters({
      list: 'attendanceStore/attendanceList',
      total: 'attendanceStore/attendanceTotal'
    })
  },
  created() {
    this.load(1)
  },
  methods:{
    load(page){
      this.query.id = this.$route.params.courseId;
      this.query.page = page;
      this.$store.dispatch('attendanceStore/getAttendanceList', this.query).then(res=>{
        //console.log(res)
      });
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load(pageNum)
    },
    sign(item){
      let state;
      if(this.compare(item.late_time,this.currentTime)){
        state = '1'
      }else{
        state = '2'
      }
      this.$store.dispatch('attendanceStore/postAttendanceSign', {sign_id:item.sign_id,state:state}).then(res=>{
        if(res.code === 200){
          this.$message.success('签到成功！')
        }
        this.load(this.pageNum)
      })
    },
    setItemProgress(data) {
      if (data.signed_num > data.sign_num) {
        return 100
      } else if(data.sign_num === 0){
        return 0
      }else{
        return parseInt((data.signed_num / data.sign_num).toFixed(1) * 100)
      }
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
.blue {
  background-color: rgba(24,144,255,.2);
  color: #1890ff;
}
.red{
  background-color: rgba(224,32,32,.2);
  color: #e02020;
}
.signInStatus {
  position: absolute;
  float: right;
  right: -35px;
  top: -35px;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transform: rotate(45deg);
  font-size: 14px;
}
.el-card{
  margin: 10px 0;
  position: relative;
}
.atNum{
  display: flex;
  margin: 10px 0;
}
.el-tag{
  border-radius: 10px;
  margin-left: 5px
}
</style>
