<template>
  <div>
    <el-card>
      <div class="el-card-div">
        <el-page-header @back="goBack" :content="className">
        </el-page-header>
      </div>
      <div class="el-card-div2">
        <div>
          <span>共{{total}}个学生</span>
        </div>
        <div>
          <el-input style="width: 200px" placeholder="请输入姓名进行搜索" suffix-icon="el-icon-search" v-model="userinfo"></el-input>
          <el-button style="margin-left: 5px" type="primary" @click="search">搜索</el-button>
        </div>
      </div>

    </el-card>
    <div style="margin: 10px 0">
      <span>已选{{chooseNum}}个</span>
      <el-dropdown @command="handleCommand" style="float: right">
                  <span class="el-dropdown-link" style="font-size: 15px;cursor: pointer">
                    移动到<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
        <el-dropdown-menu slot="dropdown" style="width: 170px">
          <div v-for="item in classAll">
            <el-dropdown-item :command="item.class_id" style="padding: 5px 10px;font-size: 13px">{{ item.class_name }}</el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>

    </div>

    <el-table :data="classStu" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange" style="font-size: 13px">
      <el-table-column prop="user_id" label="ID" type="selection" width="80" align="center"></el-table-column>
      <el-table-column prop="user_id" label="学号" width="250" align="center"></el-table-column>
      <el-table-column prop="user_name" label="姓名" width="200" align="center"></el-table-column>
      <el-table-column prop="contact" label="手机号" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-popconfirm title="这是一段内容确定删除吗？" style="margin-left: 10px" @confirm="deleteStu(scope.row.user_id)">
            <el-button type="text" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
import { mapGetters } from "vuex";

export default {
  name: "Class-detail",
  data(){
    return{
      className:localStorage.getItem('className'),
      pageNum: 1,
      pageSize: 8,
      headerBg: 'headerBg',
      userinfo: '',
      userinfo2: '',
      chooseNum: 0,
      query:{},
      users:[]
    }
  },
  computed:{
    ...mapGetters({
      classStu: 'classStore/classStu',
      total: 'classStore/stuTotal',
      classAll:'classStore/classAll'
    })
  },
  created() {
    this.load(1)
  },
  methods: {
    load(page){
      this.query.id = this.$route.params.courseId;
      this.query.page = page;
      this.query.classId = this.$route.params.classId;
      this.query.name = this.userinfo2
      this.$store.dispatch('classStore/getClassSearchInfo',this.query).then(res=>{
        if(res.code===200){
          this.$store.dispatch('classStore/getClassAll',{id:parseInt(this.$route.params.courseId)}).then(res=>{})
        }
      })
    },
    goBack() {
      this.$router.push({name:'class'})
    },
    search(){
      this.pageNum = 1
      this.userinfo2 = this.userinfo
      this.load(1)
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load(pageNum)
    },
    handleCommand(command) {
      if(this.chooseNum){
        if(this.$route.params.classId !== command){
          let datas = {}
          datas.before_class_id = this.$route.params.classId
          datas.after_class_id = command
          datas.user_id = this.users
          this.$store.dispatch('classStore/postClassMove', datas).then(res=>{
            if(res.code === 200){
              this.$message.success('移动成功！')
              this.load(1)
              this.pageNum = 1
            }else if(res.code === -1){
              this.$message.warning(res.msg)
            }else if(res.code === -4){
              this.$message.error(res.msg)
            }
          })
        }else{
          this.$message.warning('您要移动的学生已在班级中！')
        }
      }else{
        this.$message.warning('请选择您要移动的学生！')
      }
    },
    deleteStu(id){
      this.$store.dispatch('classStore/postClassDeleteStu',{class_id:parseInt(this.$route.params.classId),user_id:id}).then(res=>{
        if(res.code===200){
          this.$message.success('删除学生成功！')
          this.pageNum = 1
          this.userinfo = ''
          this.userinfo2 = ''
          this.load(1)
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    handleSelectionChange(val){
      this.chooseNum = val.length
      val.forEach((item,i)=>{
        this.users[i] = item.user_id
      })
      //console.log(this.users)
    }
  }
}
</script>

<style scoped>
.el-card-div{
  display: flex;
  justify-content:space-between;
}
.el-card-div2{
  display: flex;
  justify-content:space-between;
  margin-top: 30px
}
.el-dropdown-menu {
  overflow: scroll;
  max-height: 250px;
  overflow-x: auto;
  overflow-y: auto;
}

</style>
