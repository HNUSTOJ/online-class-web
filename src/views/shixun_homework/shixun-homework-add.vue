<template>
  <div>
    <el-card>
      <div style="size: 6px;margin-bottom: 10px">
        <span style="font-size: 15px;font-weight: bold">标题:</span>
      </div>
      <div style="margin-bottom: 10px">
        <el-input v-model="input" placeholder="请输入内容" maxlength="60" size="medium"></el-input>
      </div>
    </el-card>
    <el-card style="margin-top: 10px">
      <div style="size: 6px;margin-bottom: 10px">
        <span style="font-size: 15px;font-weight: bold">简介:</span>
      </div>
      <tinymce></tinymce>
      <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
          style="margin-top: 10px">
        <el-button size="small">上传附件</el-button>
      </el-upload>
      <span style="font-size: 10px">(单个文件最大150MB)</span>
    </el-card>
    <div style="margin-top: 10px">
      <el-button type="primary" @click="promote">确定</el-button>
      <el-button type="primary" @click="back">取消</el-button>
    </div>



    <el-dialog title="发布作业" :visible.sync="dialogFormVisible" width="40%">
      <el-form label-width="80px" size="small">
        <el-form-item label="发布时间:">
          <el-date-picker
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
          <el-radio v-model="radio" label="1" @change="closeDialog">统一发布</el-radio>
          <el-radio v-model="radio" label="2" @change="openDialog">分班发布</el-radio>
        </el-form-item>
        <el-transfer
            v-model="yesData"
            :props="{key: 'id',label: 'name'}"
            :titles="['全选', '已选择分班']"
            @change="handleChange"
            :data="noData"
            v-if="display"
        ></el-transfer>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from "@/components/tinymce";
import router from "@/router";
export default {
  name: "shixunHw-add",
  components:{
    Tinymce
  },
  data() {
    return {
      input: '',
      fileList: [
        {name: 'hustoj文档大全.pdf', url: 'C:\\Users\\Administrator\\Desktop\\hustoj文档大全.pdf'}
      ],
      dialogFormVisible: false,
      classFormVisible: false,
      value1: '',
      value2: '',
      radio: '1',
      yesData: [],
      noData: [],
      Data:[
        {id:1,name:'计算机一班'},
        {id:2,name:'计算机二班'},
        {id:3,name:'计算机三班'}
      ],
      display: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    back(){
      router.push("/shixun_homework")
    },
    promote(){
      this.dialogFormVisible = true
    },
    openDialog(){
      this.noData = this.Data
      this.display = !this.display
    },
    closeDialog(){
      this.noData = []
      this.display = !this.display
    },
    handleChange(value, direction, movedKeys) {
      //console.log(value, direction, movedKeys);
      //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
      if(direction === "right") {

      }
      if(direction === "left") {

      }

    },
  }
}
</script>

<style scoped>

</style>
