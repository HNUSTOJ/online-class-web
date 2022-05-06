<template>
  <div>
    <el-card>
      <div>
        <el-page-header @back="goBack" content="计算机二班"></el-page-header>
      </div>
      <div style="display: flex;margin-top: 30px">
        <div>
          <span>共{{total}}个学生</span>
        </div>
        <div style="margin-left: 905px">
          <el-input style="width: 200px" placeholder="请输入姓名进行搜索" suffix-icon="el-icon-search" v-model="Name"></el-input>
          <el-button style="margin-left: 5px" type="primary" @click="search">搜索</el-button>
        </div>
      </div>
    </el-card>

    <el-table :data="classStu" border stripe :header-cell-class-name="headerBg">
      <el-table-column label="ID" width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="user_name" label="姓名" width="240" align="center"></el-table-column>
      <el-table-column prop="user_id" label="学号" width="300" align="center"></el-table-column>
      <el-table-column prop="contact" label="手机号" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
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
import {mapGetters} from "vuex";

export default {
  name: "Class-stu-info",
  data(){
    return{
      pageNum: 1,
      pageSize: 8,
      Name: '',
      Name2: '',
      headerBg: 'headerBg',
      query:{},
      isSearch:false
    }
  },
  computed:{
    ...mapGetters({
      classStu: 'classStore/classStu',
      total: 'classStore/stuTotal',
    })
  },
  created() {
    this.load(1,'')
  },
  methods: {
    goBack() {
      this.$router.push({name:'class-stu'})
    },
    load(page,name){
      this.query.id = this.$route.params.courseId
      this.query.classId = this.$route.params.classId
      this.query.page = page
      this.query.name = name
      this.$store.dispatch('classStore/getClassSearchInfo',this.query).then(res=>{
        console.log(res)
      })
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      if(this.isSearch){
        this.load(pageNum,this.Name2)
      }else{
        this.load(pageNum,'')
      }
    },
    search(){
      this.load(1,this.Name)
      this.pageNum = 1
      this.isSearch = true
      this.className2 = this.Name
    }
  }
}
</script>

<style scoped>

</style>
