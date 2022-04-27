<template>
  <div>
    <el-card>
      <div>
        <span style="font-size: 15px;font-weight: bold">标题:</span>
        <el-input v-model="title" placeholder="请输入作业标题："></el-input>
      </div>
      <div style="margin-top: 20px">
        <span style="font-size: 15px;font-weight: bold">题目编号:</span>
        <el-input v-model="number" placeholder="Example:1000,1001,1002" style="margin-bottom: 20px" @blur="inputBlur"></el-input>
        <div v-for="item in this.nums">
          <span>{{item}}:</span>
          <span>计算职工工资</span>
        </div>
      </div>
      <div style="margin-top: 20px">
        <span style="font-size: 15px;font-weight: bold">作业描述:</span>
      </div>
      <tinymce></tinymce>
      <div style="display: flex;margin-top: 40px">
        <div>
          <span style="font-size: 15px;font-weight: bold">公开:</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-left: 10px">
          <span style="font-size: 15px;font-weight: bold">密码:</span>
          <el-input v-model="password" size="mini" style="width: auto"></el-input>
        </div>
      </div>

      <div style="margin-top: 20px">
        <span style="font-size: 15px;font-weight: bold">语言:</span>
        <el-select v-model="value1" multiple placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div style="margin-top: 20px">
        <span style="font-size: 15px;font-weight: bold">用户 ( Add private contest's userIDs with newline \n ) :</span>
        <el-input
            type="textarea"
            :rows="2"
            resize="none"
            placeholder="user1
user2
user3"
            v-model="textarea">
        </el-input>
      </div>

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
  name: "commonHw-add",
  components:{
    Tinymce
  },
  data() {
    return {
      title: '',
      number: '',
      nums: [],
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
      display: false,
      options: [
        {value: '1', label: 'C'}, {value: '2', label: 'C++'}, {value: '3', label: 'Pascal'}, {value: '4', label: 'Java'}, {value: '5', label: 'Ruby'},
        {value: '6', label: 'Bash'}, {value: '7', label: 'Python'}, {value: '8', label: 'PHP'}, {value: '9', label: 'Perl'}, {value: '10', label: 'C#'},
        {value: '11', label: 'Obj-C'}, {value: '12', label: 'FreeBasic'}, {value: '13', label: 'Scheme'}, {value: '14', label: 'Clang'}, {value: '15', label: 'Clang++'},
        {value: '16', label: 'Lua'}, {value: '17', label: 'JavaScript'}, {value: '18', label: 'Go'}, {value: '19', label: 'SQL'}, {value: '20', label: 'Fortran'}, {value: '21', label: 'Matlab'}
      ],
      options2:[
        {value: '1', label: '公开'},{value: '2', label: '私有'}
      ],
      password:'',
      value: '',
      textarea: ''
    }
  },
  methods: {
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
    inputBlur(){
      this.nums = this.number.split(',')
    }
  }
}
</script>

<style scoped>

</style>
