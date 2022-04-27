<template>
  <div>
    <div>
      <div class="loginOut">
        <el-button type="text" icon="el-icon-edit-outline" @click="create" style="font-size: 14px">创建签到</el-button>
      </div>
      <el-card style="margin-top: 10px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部签到" name="all"></el-tab-pane>
          <el-tab-pane label="正在签到" name="ing"></el-tab-pane>
          <el-tab-pane label="历史签到" name="history"></el-tab-pane>
          <el-tab-pane label="签到统计" name="statistics"></el-tab-pane>
        </el-tabs>
        <router-view v-if="this.$route.params.courseId"></router-view>
      </el-card>

    </div>

    <el-dialog title="创建签到" :visible.sync="dialog" width="35%" >
      <el-form ref="form" :model="form" label-width="80px" size="small">
        <el-form-item label="签到名称:">
          <el-input autocomplete="off" v-model="form.sign_name"></el-input>
        </el-form-item>
        <el-form-item label="签到班级:">
          <el-select clearable multiple placeholder="请选择签到班级" style="width: 100%" v-model="form.class_list">
            <el-option v-for="item in classList" :key="item.class_id" :label="item.class_name" :value="item.class_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间:">
          <el-date-picker v-model="form.start_time" type="datetime" placeholder="选择开始时间" style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="迟到时间:">
          <el-date-picker v-model="form.late_time" type="datetime" placeholder="在迟到时间至结束时间签到的同学记为迟到" style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:">
          <el-date-picker v-model="form.end_time" type="datetime" placeholder="超过结束时间的同学记为未签到" style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="found">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Attendance",
  components:{},
  computed:{
    ...mapGetters({
      classList: 'classStore/classList'
    })
  },
  data() {
    return {
      activeName:'all',
      dialog: false,
      id:'',
      form:{course_id:parseInt(this.$route.params.courseId)},
    }
  },
  methods: {
    create(){
      this.dialog = true
    },
    found(){
      console.log(this.form)
      this.$store.dispatch('attendanceStore/postAttendanceCreate',this.form).then(res=>{
        console.log(res)
      })
    },
    handleClick(tab, event) {
      this.$router.push({name:tab.name})
    }
  }
}
</script>

<style scoped>
.loginOut{
  position: absolute;
  right:40px;
  top:60px;
  font-weight: 600;
  font-size: 14px;
}
</style>
