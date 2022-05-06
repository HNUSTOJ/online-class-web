<template>
  <div>
    <div>
      <div class="loginOut">
        <el-button type="text" icon="el-icon-edit-outline" @click="createAt" style="font-size: 14px">创建签到</el-button>
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

    <el-dialog title="创建签到" :visible.sync="dialog" width="35%" :before-close="close">
      <el-form ref="form" :model="form" :rules="rules" label-width="90px" size="small">
        <el-form-item label="签到名称:" prop="sign_name">
          <el-input autocomplete="off" v-model="form.sign_name"></el-input>
        </el-form-item>
        <el-form-item label="签到班级:" prop="class_list">
          <el-select clearable multiple placeholder="请选择签到班级" style="width: 100%" v-model="form.class_list">
            <el-option v-for="item in classList" :key="item.class_id" :label="item.class_name" :value="item.class_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间:" prop="start_time">
          <el-date-picker v-model="form.start_time" type="datetime" placeholder="选择开始时间" style="width: 100%" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="迟到时间:" prop="late_time">
          <el-date-picker v-model="form.late_time" type="datetime" placeholder="在迟到时间至结束时间签到的同学记为迟到" style="width: 100%" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="end_time">
          <el-date-picker v-model="form.end_time" type="datetime" placeholder="超过结束时间的同学记为未签到" style="width: 100%" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
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
      classList: 'classStore/classAll'
    })
  },
  data() {
    return {
      activeName:'all',
      dialog: false,
      id:'',
      form:{
        course_id:parseInt(this.$route.params.courseId),
        sign_name:'',
        class_list:[],
        start_time:'',
        late_time:'',
        end_time:''
      },
      rules: {
        sign_name: [
          {required: true, message: '请输入签到名称', trigger: 'blur'},
          {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'}
        ],
        class_list:[
          {required: true, message: '请选择签到班级', trigger: 'blur'},
        ],
        start_time:[
          {required: true, message: '请选择开始时间', trigger: 'blur'},
        ],
        late_time:[
          {required: true, message: '请选择迟到时间', trigger: 'blur'},
        ],
        end_time:[
          {required: true, message: '请选择结束时间', trigger: 'blur'},
        ]
      }
    }
  },
  mounted(){
    this.$store.dispatch('classStore/getClassAll',{id:parseInt(this.$route.params.courseId)}).then(res=>{})
  },
  methods: {
    createAt(){
      this.dialog = true
    },
    found(){
      this.$refs['form'].validate((valid) => {
        if(valid){
          //console.log(this.form)
          this.$store.dispatch('attendanceStore/postAttendanceCreate',this.form).then(res=>{
            if(res.code === 200){
              this.$message.success('创建成功！')
            }
            this.close()
            this.activeName = 'all'
            this.$router.push({name:'all'})
          })
        }
      });
    },
    handleClick(tab, event) {
      this.$router.push({name:tab.name})
    },
    close(){
      this.dialog = false
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    },
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
