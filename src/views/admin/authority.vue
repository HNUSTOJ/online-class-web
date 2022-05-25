<template>
  <el-container>
    <el-header>
      <NavMenu/>
    </el-header>
    <el-main>
      <el-card class="home">
        <div style="margin: 15px 0">
          <el-input style="width: 200px" placeholder="请输入用户名进行搜索" suffix-icon="el-icon-search" v-model="id"></el-input>
          <el-button style="margin-left: 5px" type="primary" @click="search">搜索</el-button>
        </div>
        <el-table :data="list" border stripe style="font-size: 13px">
          <el-table-column prop="user_id" label="学号" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column label="用户权限" align="center">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.permissions" @change="radioChange(scope.row.permissions,scope.row.user_id)">
                <el-radio label="0">学生</el-radio>
                <el-radio label="1">老师</el-radio>
                <el-radio label="2">管理员</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </el-card>
    </el-main>
    <About/>
  </el-container>
</template>

<script>
import NavMenu from "@/components/NavMenu";
import About from "@/components/About";
import {mapGetters} from "vuex";

export default {
  name: "authority",
  components: {
    NavMenu,
    About,
  },
  computed:{
    ...mapGetters({
      list:'adminStore/userList',
      total:'adminStore/total'
    })
  },
  data(){
    return{
      id:'',
      id2:'',
      pageNum:1,
      pageSize:10,
      query:{}
    }
  },
  created() {
    this.load(1,'')
  },
  methods:{
    load(page,id){
      this.query.page = page
      this.query.user_id = id
      this.$store.dispatch('adminStore/getAdminList',this.query).then(res=>{
        console.log(res)
      })
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load(pageNum,this.id2)
    },
    radioChange(permissions,id){
      let user = [{permissions:permissions,user_id:id}]
      this.$store.dispatch('adminStore/postAdminEdit',user).then(res=>{
        if(res.code===200){
          this.$message.success('修改成功！')
          this.load(this.pageNum,'')
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    search(){
      this.id2 = this.id
      this.pageNum = 1
      this.load(1,this.id2)
    }
  }
}
</script>

<style scoped>
.el-pagination{
  margin-top: 20px;
}
.home {
  min-height: 80vh;
  width: 1255px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -10px;
  height: auto;
}
</style>
