<template>
  <div>
    <div v-if="total">
      <div v-for="item in list">
        <el-card shadow="hover" style="margin: 10px 0">
          <div style="margin: 10px 0">
            <el-button type="text" style="font-size: 16px" @click="info(item.sign_id,item.sign_name)">{{ item.sign_name }}</el-button>
            <el-tag type="success">进行中</el-tag>
            <div style="float: right">
              <el-dropdown trigger="click" style="cursor: pointer;">
                <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="info" icon="el-icon-more-outline" @click.native="info(item.sign_id,item.sign_name)">详 细</el-dropdown-item>
                  <el-dropdown-item command="edit" icon="el-icon-edit" @click.native="edit(item)">编 辑</el-dropdown-item>
                  <el-dropdown-item command="delete" icon="el-icon-folder-delete" @click.native="del(item.sign_id)">删 除</el-dropdown-item>
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
            <span style="font-size: small">签到发起人:{{item.user_name}}</span>
            <span style="font-size: small;margin-left: 11%">开始时间:{{item.start_time.substring(0,19).replace('T',' ')}}</span>
            <span style="font-size: small;margin-left: 5%">迟到时间:{{item.late_time.substring(0,19).replace('T',' ')}}</span>
            <span style="font-size: small;margin-left: 5%">结束时间:{{item.end_time.substring(0,19).replace('T',' ')}}</span>
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
          <el-input autocomplete="off" v-model="form.sign_name"></el-input>
        </el-form-item>
        <el-form-item label="迟到时间:">
          <el-date-picker v-model="form.late_time" type="datetime" placeholder="在迟到时间至结束时间签到的同学记为迟到" style="width: 100%" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:">
          <el-date-picker v-model="form.end_time" type="datetime" placeholder="超过结束时间的同学记为未签到" style="width: 100%" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendEdit">确 定</el-button>
      </div>
    </el-dialog>


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
  name: "Attendance-ing",
  data() {
    return {
      dialogFormVisible: false,
      pageNum: 1,
      pageSize: 3,
      dialogName:'',
      query:{},
      form:{},
      currentTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      readonly:true,
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
  methods: {
    load(page){
      this.query.id = this.$route.params.courseId;
      this.query.page = page;
      this.$store.dispatch('attendanceStore/getIngList', this.query).then(res=>{
        console.log(res)
      });
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load(pageNum)
    },
    del(id){
      this.$store.dispatch('attendanceStore/postAttendanceDel',{signId:id}).then(res=>{
        if(res.code === 200){
          this.$message.success('删除成功！')
        }
        this.pageNum = 1
        this.load(1)
      })
    },
    edit(item){
      this.dialogName = "编辑签到"
      this.dialogFormVisible = true
      this.form = {sign_id:item.sign_id, sign_name:item.sign_name, late_time:item.late_time.substring(0,19).replace('T',' '),
        end_time:item.end_time.substring(0,19).replace('T',' ')}
    },
    sendEdit(){
      this.$store.dispatch('attendanceStore/postAttendanceEdit',this.form).then(res=>{
        if(res.code === 200){
          this.$message.success('修改成功！')
        }
        this.dialogFormVisible = false
        this.load(this.pageNum)
      })
    },
    info(id,name){
      sessionStorage.setItem('sign_name',name)
      this.$router.push({name: 'attendanceInfo', params: {aid: id}})
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
