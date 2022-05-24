<template>
<div>
  <el-card style="margin-bottom: 15px">
    <div class="el-card-div">
      <span style="margin-top:5px">共{{ total }}个分班</span>
      <div>
        <el-input style="width: 200px" placeholder="请输入分班名称进行搜索" suffix-icon="el-icon-search" v-model="className"></el-input>
        <el-button style="margin-left: 5px" type="primary" @click="search">搜索</el-button>
      </div>
    </div>

  </el-card>
  <el-table :data="list" border stripe :header-cell-class-name="headerBg">
    <el-table-column label="序号" width="80" align="center">
      <template slot-scope="scope">
        <span>{{scope.$index}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="class_name" label="分班名称" width="200" align="center"></el-table-column>
    <el-table-column prop="class_num" label="学生成员" width="100" align="center"></el-table-column>
    <el-table-column prop="user_name" label="管理教师" align="center"></el-table-column>
    <el-table-column label="你所在的分班" align="center">
      <template slot-scope="scope">
        <i v-if="scope.row.class_id === inClass" class="el-icon-check"></i>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="300" align="center">
      <template slot-scope="scope">
        <el-button type="text" @click="detail(scope.row.class_id)">查看</el-button>
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
import {mapGetters} from "vuex";

export default {
  name: "Class-student",
  data(){
    return{
      className:'',
      className2:'',
      pageNum: 1,
      pageSize: 8,
      headerBg: 'headerBg',
      query:{},
      isSearch:false,
    }
  },
  computed:{
    ...mapGetters({
      list:'classStore/classList',
      total:'classStore/classTotal',
      inClass:'classStore/inClass'
    })
  },
  created() {
    this.load(1,'')
  },
  methods:{
    load(page,name){
      this.query.id = this.$route.params.courseId;
      this.query.page = page;
      this.query.name = name;
      this.$store.dispatch('classStore/getClassSearch', this.query).then(res=>{
        if(res.code === 200){
          this.$store.dispatch('classStore/getInClass',{id:this.$route.params.courseId})
        }
      });
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      if(this.isSearch){
        this.load(pageNum,this.className2)
      }else{
        this.load(pageNum,'')
      }
    },
    search(){
      this.load(1,this.className)
      this.pageNum = 1
      this.isSearch = true
      this.className2 = this.className
    },
    detail(id){
      this.$router.push({name:'class-stu-info',params:{classId:id}})
    }
  }
}
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-card-div{
  display: flex;
  justify-content: space-between;
}
i{
  color: #0CB618;
  font-size:25px
}
</style>
