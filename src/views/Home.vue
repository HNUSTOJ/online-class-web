<template>

  <el-container>

    <el-header>
      <NavMenu/>
    </el-header>

    <el-main>
      <div class="home">
        <el-card class="box-card">
          <div slot="header" class="clearfix" id="container">
            <span v-for="(item,index) in options" id="index" :key="index" @click="choose(item)" class="card-span">
              {{ item.name }}
            </span>
          </div>
          <div id="container2">
            <span v-for="(item,index) in options2" id="index2" :key="index" @click="choose(item)" class="card-span">
              {{ item.name }}
            </span>
          </div>
        </el-card>

        <div style="margin: 15px 0">
          <span style="font-size: 12px;margin-right: 30px">共参与{{num}}个课堂</span>
          <el-button type="primary" @click="openDialog">新建教学课堂</el-button>
          <el-button type="success" @click="joinClass">加入教学课堂</el-button>
          <div style="float: right">
            <el-input placeholder="请输入课堂名称" v-model="input3" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>

        <div class="course">
          <div v-if="!courseData.length">
            <el-empty :image-size="260"></el-empty>
          </div>
          <div v-else>
            <el-row  :gutter="20">
              <el-col :span="6" v-for="index in courseData" style="margin: 5px 0;">
                <el-card :body-style="{ padding: '20px' }" shadow="hover" @click.native="openCard" class="card">

                  <div style="padding:15px;border-bottom: 1px solid #ccc">
                    <div style="text-align: center">
                      <span style="font-size: 16px">{{ index.cname }}</span>
                    </div>
                    <div style="text-align: center;margin-top: 25px">
                      <el-avatar :size="size" :src="index.curl" icon="el-icon-user-solid"></el-avatar>
                    </div>
                    <div class="bottom clearfix" style="text-align: center;margin-bottom: 25px">
                      <span style="font-size: 14px">{{ index.tname }}</span>
                    </div>
                  </div>

                  <div style="display: flex;justify-content:space-between">
                    <div style="margin-left: 10px">
                      <el-tooltip class="item" effect="dark" content="访问量" placement="bottom">
                        <el-button icon="el-icon-view" type="text"></el-button>
                      </el-tooltip>
                      <span style="margin-left: 5px;font-size: 14px">{{wNum}}</span>
                    </div>
                    <div>
                      <el-tooltip class="item" effect="dark" content="成员" placement="bottom">
                        <el-button icon="el-icon-user" type="text"></el-button>
                      </el-tooltip>
                      <span style="margin-left: 5px;font-size: 14px">{{pNum}}</span>
                    </div>
                    <div style="margin-right: 10px">
                      <el-tooltip class="item" effect="dark" content="作业" placement="bottom">
                        <el-button icon="el-icon-document" type="text"></el-button>
                      </el-tooltip>
                      <span style="margin-left: 5px;font-size: 14px">{{hNum}}</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="50"
            class="page">
        </el-pagination>

        <el-dialog title="创建课堂" :visible.sync="dialogFormVisible" width="35%" >
          <el-form label-width="80px" size="small">
            <el-form-item label="课堂名称:">
              <el-input autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="结束时间:">
              <el-date-picker type="date" placeholder="请选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="加入课堂" :visible.sync="dialogFormVisible2" width="35%" >
          <el-form label-width="100px" size="small">
            <el-form-item label="课堂邀请码:">
              <el-input autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </div>
        </el-dialog>

      </div>


    </el-main>

    <About/>

  </el-container>

</template>

<script>

import Aside from "@/components/Aside";
import Header from "@/components/Header";
import About from "@/components/About";
import NavMenu from "@/components/NavMenu";
import router from "@/router";

export default {
  name: 'Home',
  components: {
    NavMenu,
    Aside,
    Header,
    About,
  },
  data(){
    return {
      courseData: [
        {cname: '数据结构', curl: '', tname: '谢沅峰'},
        {cname: '数据结构', curl: '', tname: '谢沅峰'},
        {cname: '数据结构', curl: '', tname: '谢沅峰'},
        {cname: '数据结构', curl: '', tname: '谢沅峰'},
        {cname: '数据结构', curl: '', tname: '谢沅峰'},
        {cname: '数据结构', curl: '', tname: '谢沅峰'},
        {cname: '数据结构', curl: '', tname: '谢沅峰'},
        {cname: '数据结构', curl: '', tname: '谢沅峰'}
      ],
      options: [
        {index: 0, name: "全部" },{index: 1, name: "我管理的" },{index: 2, name: "我学习的" }
      ],
      options2: [
        {index: 3, name: "全部" },{index: 4, name: "正在进行" },{index: 5, name: "已结束" }
      ],
      form:{
        date1:''
      },
      num: 6,
      input3: '',
      size: 'large',
      wNum: 1050,
      pNum: 200,
      hNum: 5,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      spanArr: [],
      spanArr2: []
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      this.spanArr = document.getElementById("container").getElementsByTagName("span");
      this.spanArr2 = document.getElementById("container2").getElementsByTagName("span");
      this.spanArr[0].style.color = "#4cacff";
      this.spanArr2[0].style.color = "#4cacff";
    },
    openCard() {
      this.$message.success("进入课堂")
      router.push("/course")
    },
    openDialog(){
      this.dialogFormVisible = true
    },
    joinClass(){
      this.dialogFormVisible2 = true
    },
    choose(item) {
      var id = item.index;
      this.breadValue = item.name;
      for (var i = 0; i <= 2; i++) {
        if(id < 3){
          if (id === i)
            this.spanArr[id].style.color = "#4cacff";
          else
            this.spanArr[i].style.color = "#303133";
        }else{
          if (id - 3 === i)
            this.spanArr2[id - 3].style.color = "#4cacff";
          else
            this.spanArr2[i].style.color = "#303133";
        }
      }

    }
  }
}
</script>

<style>
.el-container{
  min-height: 100vh;
}
.el-header{
  border-bottom: 1px solid #ccc;
}
.box-card {
  margin-top: 5px;
  width: auto;
  height: auto;
  text-align: left;
}
.card-span{
  margin-right: 40px;
  font-size: 15px;
  cursor: pointer;
}
.card{
  cursor: pointer;
  border-radius: 10px;
}
.page{
  margin-top: 25px;
  text-align: center;
}
.home {
  width: 990px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -10px;
  height: auto;
}
.course{
  margin-top: 10px;
  width: 100%;
  height: auto;
}
.el-main{
  background: rgba(9, 0, 0, 0.04);
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}


.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

</style>
