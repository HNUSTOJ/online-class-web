<template>

  <el-container>

    <el-header>
      <NavMenu/>
    </el-header>

    <el-main>
      <div class="home">
        <el-card class="box-card">
          <div slot="header" class="clearfix" id="container">
            <span v-for="(item,index) in options" id="index1" :key="index" @click="choose(item)" class="card-span">
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
          <span style="font-size: 12px;margin-right: 30px">共参与{{total}}个课堂</span>
          <el-button type="primary" @click="openDialog" v-if="permissions === role.isTeacher">新建教学课堂</el-button>
          <el-button type="success" @click="joinClass">加入教学课堂</el-button>
          <div style="float: right">
            <el-input placeholder="请输入课堂名称" v-model="input" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="search(1)"></el-button>
            </el-input>
          </div>
        </div>

        <div class="course">
          <div v-if="!courseList.length">
            <el-empty :image-size="260"></el-empty>
          </div>
          <div v-else>
            <el-row :gutter="25">
              <el-col :span="6" v-for="item in courseList" style="margin: 5px 0;">
                <el-card shadow="hover" @click.native="openCard(item.course_id)" style="cursor: pointer;border-radius: 10px">
                  <div style="padding: 15px;border-bottom: 1px solid #ccc">
                    <div style="text-align: center;height: 37px">
                      <span style="font-size: 17px" class="tmp">{{ item.title }}</span>
                    </div>
                    <div style="text-align: center;margin-top: 15px">
                      <el-avatar :size="avatarSize" :src="require('../assets/b.jpg')" v-if="Math.floor(Math.random()*2)+1===1"></el-avatar>
                      <el-avatar :size="avatarSize" :src="require('../assets/g.jpg')" v-else></el-avatar>
                    </div>
                    <div class="bottom clearfix" style="text-align: center;margin-bottom: 25px">
                      <span style="font-size: 14px" class="tmp2">{{ item.user_id }}</span>
                    </div>
                  </div>

                  <div style="display: flex;justify-content:space-between">
                    <div style="margin-left: 10px">
                      <el-tooltip class="item" effect="dark" content="访问量" placement="bottom">
                        <el-button icon="el-icon-view" type="text"></el-button>
                      </el-tooltip>
                      <span style="margin-left: 5px;font-size: 14px">{{item.visit_num}}</span>
                    </div>
                    <div>
                      <el-tooltip class="item" effect="dark" content="成员" placement="bottom">
                        <el-button icon="el-icon-user" type="text"></el-button>
                      </el-tooltip>
                      <span style="margin-left: 5px;font-size: 14px">{{item.member}}</span>
                    </div>
                    <div style="margin-right: 10px">
                      <el-tooltip class="item" effect="dark" content="作业" placement="bottom">
                        <el-button icon="el-icon-document" type="text"></el-button>
                      </el-tooltip>
                      <span style="margin-left: 5px;font-size: 14px">{{item.job_num}}</span>
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
            :current-page="pageNum"
            :page-size="pageSize"
            :total="total"
            @current-change="handleCurrentChange"
            class="page">
        </el-pagination>

        <el-dialog title="创建课堂" :visible.sync="dialog" width="35%" >
          <el-form label-width="80px" size="small" :model="addForm">
            <el-form-item label="课堂名称:">
              <el-input autocomplete="off" v-model="addForm.title"></el-input>
            </el-form-item>
            <el-form-item label="结束时间:">
              <el-date-picker type="date" placeholder="请选择日期" v-model="addForm.end_time" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="加入课堂" :visible.sync="dialog2" width="35%" >
          <el-form label-width="100px" size="small" :model="joinForm">
            <el-form-item label="课堂邀请码:">
              <el-input autocomplete="off" v-model="joinForm.invite_code"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialog2 = false">取 消</el-button>
            <el-button type="primary" @click="join">确 定</el-button>
          </div>
        </el-dialog>
        <Login></Login>

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
import Login from "@/components/Login";
import { mapGetters } from "vuex";

export default {
  name: 'Home',
  components: {
    Login,
    NavMenu,
    Aside,
    Header,
    About,
  },
  data(){
    return {
      avatarSize: 'large',
      options: [{index: 0, name: "全部" },{index: 1, name: "我管理的" },{index: 2, name: "我学习的" }],
      options2: [{index: 3, name: "全部" },{index: 4, name: "正在进行" },{index: 5, name: "已结束" }],
      addForm:{},
      joinForm:{},
      input: '',
      input2: '',
      isSearch:false,
      dialog: false,
      dialog2: false,
      spanArr: [],
      spanArr2: [],
      pageSize: 8,
      pageNum: 1,
      query:{},
      src:[]
    }
  },
  mounted() {
    this.spanArr = document.getElementById("container").getElementsByTagName("span");
    this.spanArr2 = document.getElementById("container2").getElementsByTagName("span");
    this.spanArr[0].style.color = "#4cacff";
    this.spanArr2[0].style.color = "#4cacff"
  },
  created(){
    this.query.page = 1
    this.$store.dispatch('course/getCourseAll', this.query).then(res=>{});
  },
  computed: {
    ...mapGetters({
      courseList: 'course/courseList',
      total: 'course/courseTotal',
      role: 'loginStore/role',
      permissions:'loginStore/permissions',
      isLogin:'loginStore/isLogin',
      code:'course/code',
      msg:'course/msg',
      token:'loginStore/token'
    }),
  },
  methods: {
    handleCurrentChange(pageNum){
      this.pageQuery(pageNum);
    },
    openCard(id) {
      if(this.isLogin){
        if(this.permissions === this.role.isTeacher){
          this.$router.push({name:'class',params:{courseId:id}})
        }else{
          this.$router.push({name:'class-stu',params:{courseId:id}})
        }
      }else{
        this.$message.error('请先登录！')
      }
    },
    openDialog(){
      if(this.isLogin){
        this.dialog = true
      }else{
        this.$message.error('请先登录！')
      }
    },
    joinClass(){
      if(this.isLogin){
        this.dialog2 = true
      }else{
        this.$message.error('请先登录！')
      }
    },
    choose(item) {
      let id = item.index;
      for (let i = 0; i <= 2; i++) {
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
      this.isSearch = false
      this.pageQuery(1);
    },
    pageQuery(page){
      this.pageNum = page
      if(this.isSearch){
        this.search(page)
      }else{
        this.query.page = page
        let c1,c2;
        for(let i = 0; i <= 2; i++) {
          if(this.spanArr[i].style.color === "rgb(76, 172, 255)")
            c1 = i;
          if(this.spanArr2[i].style.color === "rgb(76, 172, 255)")
            c2 = i;
        }
        switch (true) {
          case (c1 === 0 && c2 === 0):
            this.$store.dispatch('course/getCourseAll', this.query).then(res=>{});
            break
          case (c1 === 0 && c2 === 1):
            this.$store.dispatch('course/getCourseIngAll',this.query).then(res=> {});
            break
          case (c1 === 0 && c2 === 2):
            this.$store.dispatch('course/getCourseEndAll',this.query).then(res=>{});
            break
          case (c1 === 1 && c2 === 0):
            this.$store.dispatch('course/getCourseManagementAll', this.query).then(res=>{});
            break
          case (c1 === 1 && c2 === 1):
            this.$store.dispatch('course/getCourseManagementIng', this.query).then(res=>{});
            break
          case (c1 === 1 && c2 === 2):
            this.$store.dispatch('course/getCourseManagementEnd', this.query).then(res=>{});
            break
          case (c1 === 2 && c2 === 0):
            this.$store.dispatch('course/getCourseStudyAll', this.query).then(res=>{});
            break
          case (c1 === 2 && c2 === 1):
            this.$store.dispatch('course/getCourseStudyIng', this.query).then(res=>{});
            break
          case (c1 === 2 && c2 === 2):
            this.$store.dispatch('course/getCourseStudyEnd', this.query).then(res=>{});
            break
        }
      }

    },
    add(){
      if(this.addForm.title && this.addForm.end_time){
        this.$store.dispatch('course/postCourseInsert',this.addForm).then(res=>{
          this.dialog = false
          location.reload()
        });
      }else{
        this.$message.error('请输入有效字符')
      }
    },
    join(){
      this.$store.dispatch('course/postCourseJoin',this.joinForm).then(res=>{
        this.dialog2 = false
        location.reload()
      })
    },
    search(page){
      this.$store.dispatch('course/getIndexSearch',{title:this.input,page:page}).then(res=>{
        this.pageNum = page
        this.isSearch = true
        this.input2 = this.input
        for (let i = 0; i <= 2; i++) {
          if(i===0){
            this.spanArr[i].style.color = "#4cacff";
            this.spanArr2[i].style.color = "#4cacff";
          }else{
            this.spanArr[i].style.color = "#303133";
            this.spanArr2[i].style.color = "#303133";
          }
        }
      })
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
  margin-right: 55px;
  font-size: 15px;
  cursor: pointer;
}
.page{
  margin-top: 25px;
  text-align: center;
}
.home {
  width: 1100px;
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
  margin-top: 12px;
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

.tmp{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.tmp2{
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space:nowrap;
  width:100%;
  height:100%;
  display:block;
}
</style>
