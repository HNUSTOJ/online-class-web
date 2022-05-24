<template>
  <div>
    <el-card>
      <div style="size: 6px;margin-bottom: 10px">
        <span style="font-size: 15px;font-weight: bold">标题:</span>
      </div>
      <div style="margin-bottom: 10px">
        <el-input v-model="form.title" placeholder="请输入内容" maxlength="60" size="medium"></el-input>
      </div>
    </el-card>
    <el-card style="margin-top: 10px">
      <div style="size: 6px;margin-bottom: 10px">
        <span style="font-size: 15px;font-weight: bold">简介:</span>
      </div>
      <tinymce></tinymce>
      <el-upload
          class="upload-demo"
          ref="upload"
          action=""
          :with-credentials="true"
          :limit="limit"
          :on-exceed="handleExceed"
          :on-change="fileChange"
          :on-remove="fileRemove"
          :auto-upload="false"
          style="margin-top: 10px">
        <el-button size="small">添加附件</el-button>
      </el-upload>
      <span style="font-size: 10px">(单个文件最大50MB,可添加3个)</span>
    </el-card>
    <div style="margin-top: 10px">
      <el-button type="primary" @click="promote">确定</el-button>
      <el-button type="primary" @click="back">取消</el-button>
    </div>



    <el-dialog title="发布作业" :visible.sync="dialogFormVisible" width="40%" :before-close="close">
      <el-form label-width="90px" size="small" :model="form" ref="form" :rules="rules">
        <el-form-item label="发布时间:" prop="create_time">
          <el-date-picker v-model="form.create_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间:" prop="end_time">
          <el-date-picker v-model="form.end_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="发布设置:">
          <el-radio v-model="radio" label="1" @change="closeDialog">统一发布</el-radio>
          <el-radio v-model="radio" label="2" @change="openDialog">分班发布</el-radio>
        </el-form-item>
        <el-transfer
            v-model="yesData"
            :props="{key: 'class_id',label: 'class_name'}"
            :titles="['全选', '已选择分班']"
            @change="handleChange"
            :data="noData"
            v-if="display"
        ></el-transfer>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commonAdd" :disabled="disabled">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from "@/components/tinymce";
import {mapGetters} from "vuex";
export default {
  name: "commonHw-add",
  components:{
    Tinymce
  },
  computed:{
    ...mapGetters({
      classAll:'classStore/classAll'
    })
  },
  data() {
    return {
      form:{title:'',job_content:'',course_id:'',create_time:'',end_time:'',class_id:[]},
      jobId:'',
      limit:3,
      fileList: [],
      fileData:{},
      dialogFormVisible: false,
      classFormVisible: false,
      radio: '1',
      yesData: [],
      noData: [],
      Data:[],
      display: false,
      disabled:false,
      rules:{
        create_time:[
          {required: true, message: '请选择开始时间', trigger: 'blur'},
        ],
        end_time:[
          {required: true, message: '请选择结束时间', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    httpRequest() {
      let fd = new FormData()// FormData 对象
      this.fileList.forEach(file=>{
        let fileObj = file.raw // 相当于input里取得的files
        const size = fileObj.size/1024/1024
        if(size>50){
          this.$notify.warning({
            title:'警告',
            message:'上传附件大小必须小于50M'
          })
          return;
        }else{
          fd.append('file', fileObj)// 文件对象
        }
      })
      let _this = this
      this.$store.dispatch('commonStore/postCommonCreate',this.form).then(res=>{
        if(res.code === 200){
          if(_this.fileList.length){
            this.fileData = {course_id:parseInt(this.$route.params.courseId ),job_id:parseInt(res.job_id),file:fd}
            this.$store.dispatch('commonStore/postCommonUpload',this.fileData).then(res=>{
              if(res.code === 200){
                this.back()
                this.$message.success('创建作业成功！')
                localStorage.removeItem("tinymceContent");//等文件上传成功后再执行！！！！！！
              }else{
                this.$message.warning(res)
              }
            })
          }
          this.back()
          this.$message.success('创建作业成功！')
        }else{
          this.$message.warning(res.msg)
        }
      })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    fileChange(files, fileList){
      this.fileList = fileList
      const size = files.size/1024/1024
      if(size>5){
        this.$notify.warning({
          title:'警告',
          message:files.name+'文件大小必须小于5M，请移除。'
        })
      }
    },
    fileRemove(files, fileList){
      this.fileList = fileList
    },
    back(){
      this.$router.push({name:'common_homework'})
    },
    promote(){
      if(this.form.title===''){
        this.$message.warning('请输入作业标题！')
        return;
      }else{
        this.dialogFormVisible = true
        this.$store.dispatch('classStore/getClassAll',{id:parseInt(this.$route.params.courseId)}).then(res=>{
          if(this.classAll.length===0){
            this.disabled = true
            this.$message.warning('所在课堂未创建班级！')
          }else{
            let IntClassId=[]
            this.classAll.forEach(function (item, index) {
              IntClassId[index] = parseInt(item.class_id)
            });
            this.Data = IntClassId
          }
        })
      }
    },
    openDialog(){
      this.noData = this.classAll
      this.display = !this.display
    },
    closeDialog(){
      this.noData = []
      this.display = !this.display
    },
    handleChange(value, direction, movedKeys) {
      if(direction === "right") {

      }
      if(direction === "left") {

      }
    },
    commonAdd(){
      if(this.radio === '1'){
        this.form.class_id = this.Data
      }else{
        if(this.yesData.length===0){
          this.$message.error('请选择作业发布的班级!')
          return ;
        }
        this.form.class_id = this.yesData
      }
      this.form.course_id = parseInt(this.$route.params.courseId)
      this.form.job_content = localStorage.getItem('tinymceContent')
      this.$refs['form'].validate((valid) => {
        if(valid){
          let date1 = new Date(this.form.create_time)
          let date2 = new Date(this.form.end_time)
          if(date1<date2){
            this.httpRequest()
          }else{
            this.$message.warning('请输入合法的时间段！(开始时间应早于结束时间)')
          }
        }
      });
    },
    close(){
      this.dialogFormVisible = false
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    },
  }
}
</script>

<style scoped>

</style>
