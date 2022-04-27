<template>
<div>
  <div v-if="jtotal">
    <div v-for="item in datalist">
      <el-card shadow="hover" style="margin: 10px 0">
        <div style="margin: 10px 0">
          <span>{{ item.sign_name }}</span>
          <el-tag v-if="compare(item.start_time,currentTime)">准备中</el-tag>
          <el-tag type="success" v-if="compare(currentTime,item.start_time)&&compare(item.end_time,currentTime)">进行中</el-tag>
          <el-tag type="danger" v-if="compare(currentTime,item.end_time)">已结束</el-tag>
          <div style="float: right">
            <el-dropdown @command="handleCommand" trigger="click" style="cursor: pointer;">
                      <span class="el-dropdown-link">
                        更多<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info" icon="el-icon-more-outline">详 细</el-dropdown-item>
                <el-dropdown-item command="edit" icon="el-icon-edit">编 辑</el-dropdown-item>
                <el-dropdown-item command="delete" icon="el-icon-folder-delete">删 除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div style="display: flex;margin: 10px 0">
          <span>签到人数</span>
          <el-progress :percentage="setItemProgress(item)" :show-text="false"></el-progress>
          <span style="font-size: small;margin-left: 5px">已签到{{item.signed_num}}/</span>
          <span style="font-size: small">应签到{{item.sign_num}}</span>
        </div>
        <div style="margin: 10px 0">
          <span style="font-size: small">签到发起人:{{item.user_id}}</span>
          <span style="font-size: small;margin-left: 22%">开始时间:{{item.start_time}}</span>
          <span style="font-size: small;margin-left: 3%">结束时间:{{item.end_time}}</span>
        </div>
      </el-card>
    </div>
  </div>
  <div v-else>
    <el-empty :image-size="300"></el-empty>
  </div>


  <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" width="35%" >
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item label="签到名称:">
        <el-input autocomplete="off" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="签到班级:">
        <el-select clearable placeholder="请选择签到班级" style="width: 100%" v-model="form.class">
          <el-option v-for="item in form.classData" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间:">
        <el-date-picker v-model="form.date1" type="datetime" placeholder="选择开始时间" style="width: 100%">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="迟到时间:">
        <el-date-picker v-model="form.date2" type="datetime" placeholder="在迟到时间至结束时间签到的同学记为迟到" style="width: 100%">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间:">
        <el-date-picker v-model="form.date3" type="datetime" placeholder="超过结束时间的同学记为未签到" style="width: 100%">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>


  <div style="padding: 10px 0">
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="jtotal">
    </el-pagination>
  </div>

</div>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";
export default {
  name: "Attendance-list",
  data() {
    return {
      dialogFormVisible: false,
      pageNum: 1,
      pageSize: 4,
      dialogName:'',
      query:{},
      form:{},
      currentTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      datalist:[
        {sign_name:'数据结构',start_time:'2022-01-22 13:00:00',end_time:'2022-01-22 18:00:00',signed_num:22,sign_num:55,user_id:'谢沅峰'},
        {sign_name:'数据结构',start_time:'2022-04-25 13:00:00',end_time:'2022-04-25 18:00:00',signed_num:22,sign_num:55,user_id:'谢沅峰'},
        {sign_name:'数据结构',start_time:'2022-04-24 12:00:00',end_time:'2022-04-24 20:00:00',signed_num:22,sign_num:55,user_id:'谢沅峰'},
      ],
      jtotal:20
    }
  },
  computed:{
    ...mapGetters({
      list: 'attendanceStore/attendanceList',
      total: 'attendanceStore/attendanceTotal'
    })
  },
  created() {
    this.query.id = this.$route.params.courseId;
    this.query.page = 1;
    //this.$store.dispatch('attendanceStore/getAttendanceList', this.query).then(res=>console.log(res));
  },
  methods: {
    detail() {
      this.$router.push({name: 'attendanceInfo', params: {aid: '123'}})
    },
    handleCommand(command) {
      if (command === "info") {
        this.detail()
      }
      if (command === "edit") {
        this.dialogName = "编辑签到"
        this.dialogFormVisible = true
      }
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.query.id = this.$route.params.courseId;
      this.query.page = pageNum;
      //this.$store.dispatch('attendanceStore/getAttendanceList', this.query).then(res=>console.log(res));
    },
    setItemProgress(data) {
      if (data.signed_num > data.sign_num) {
        return 100
      } else {
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
.el-progress{
  width: 25%;
  margin: auto 5px;
}
.el-tag{
  border-radius: 10px;
  margin-left: 5px
}
</style>
